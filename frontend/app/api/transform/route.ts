import { NextResponse } from "next/server";
import { z } from "zod";
import { buildError } from "@/lib/contracts/errors";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { transformContentWithProfile } from "@/lib/ai/transform";

const transformSchema = z.object({
  sourceContent: z.string().min(10),
  profile: z.object({
    readingComplexity: z.string().optional(),
    chunkLength: z.string().optional(),
    fontScale: z.number().optional(),
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = transformSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(buildError("AI_ERROR", "Invalid transform payload", parsed.error.flatten()), { status: 400 });
    }

    const limit = checkRateLimit(`transform:anon:${new Date().toISOString().slice(0, 13)}`, 50, 60 * 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(buildError("RATE_LIMITED", "Transform rate limit exceeded"), { status: 429 });
    }

    const result = await transformContentWithProfile(parsed.data);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(buildError("AI_ERROR", error instanceof Error ? error.message : "Transform failed"), { status: 500 });
  }
}
