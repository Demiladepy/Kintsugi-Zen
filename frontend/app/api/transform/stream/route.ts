import { NextResponse } from "next/server";
import { z } from "zod";
import { transformContentStream } from "@/lib/ai/transform";
import { checkRateLimit, enforcePayloadLimit } from "@/lib/security/rate-limit";

const streamSchema = z.object({
  walletAddress: z.string().min(32),
  sourceContent: z.string().min(20),
  profile: z.object({
    readingComplexity: z.string().optional(),
    chunkLength: z.string().optional(),
    fontScale: z.number().optional(),
  }),
});

export async function POST(request: Request) {
  const raw = await request.text();
  if (!enforcePayloadLimit(Buffer.byteLength(raw), 1_000_000)) {
    return NextResponse.json({ error: { code: "AI_ERROR", message: "Payload too large" } }, { status: 400 });
  }
  const parsed = streamSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    return NextResponse.json({ error: { code: "AI_ERROR", message: "Invalid stream payload", details: parsed.error.flatten() } }, { status: 400 });
  }

  const rate = checkRateLimit(`transform:${parsed.data.walletAddress}:${new Date().toISOString().slice(0, 13)}`, 10, 60 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json({ error: { code: "RATE_LIMITED", message: "Transformation rate limit reached" } }, { status: 429 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const evt of transformContentStream(parsed.data.sourceContent, parsed.data.profile)) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(evt)}\n\n`));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    },
  });
}
