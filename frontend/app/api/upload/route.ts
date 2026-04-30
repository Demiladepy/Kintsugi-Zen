import { NextResponse } from "next/server";
import { z } from "zod";
import { uploadJsonToIrys } from "@/lib/irys/client";

const uploadSchema = z.object({
  kind: z.enum(["profile", "module", "adaptation"]),
  payload: z.unknown(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = uploadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid upload payload", details: parsed.error.flatten() }, { status: 400 });
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
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 500 });
  }
}
