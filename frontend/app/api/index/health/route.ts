import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    indexer: "degraded",
    lastIndexedSlot: null,
    lagSlots: null,
    message: "Indexer service not yet connected in this environment.",
    timestamp: new Date().toISOString(),
  });
}
