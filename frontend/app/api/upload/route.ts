import { NextResponse } from "next/server";
import { z } from "zod";
import { buildError } from "@/lib/contracts/errors";
import { enforcePayloadLimit, passesModeration } from "@/lib/security/rate-limit";
import { uploadJsonToIrys } from "@/lib/irys/client";

const uploadSchema = z.object({
  kind: z.enum(["profile", "module", "adaptation"]),
  payload: z.unknown(),
});

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (!enforcePayloadLimit(Buffer.byteLength(raw), 1_000_000)) {
      return NextResponse.json(buildError("STORAGE_ERROR", "Payload too large"), { status: 400 });
    }
    const body = JSON.parse(raw);
    const parsed = uploadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(buildError("STORAGE_ERROR", "Invalid upload payload", parsed.error.flatten()), { status: 400 });
    }

    if (!passesModeration(JSON.stringify(parsed.data.payload))) {
      return NextResponse.json(buildError("STORAGE_ERROR", "Content failed moderation checks"), { status: 403 });
    }

    const result = await uploadJsonToIrys({ data: parsed.data });
    return NextResponse.json({
      ok: true,
      id: result.id,
      uri: result.uri,
      size: result.size,
      mocked: result.mocked,
    });
  } catch (error) {
    return NextResponse.json(buildError("STORAGE_ERROR", error instanceof Error ? error.message : "Upload failed"), { status: 500 });
  }
}
