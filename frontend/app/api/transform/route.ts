import { NextResponse } from "next/server";
import { z } from "zod";
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
      return NextResponse.json({ error: "Invalid transform payload", details: parsed.error.flatten() }, { status: 400 });
    }

    const result = await transformContentWithProfile(parsed.data);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Transform failed" }, { status: 500 });
  }
}
