import { NextResponse } from "next/server";
import { createChallenge } from "@/lib/auth/challenge";
import { buildError } from "@/lib/contracts/errors";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get("wallet");
  if (!wallet) {
    return NextResponse.json(buildError("UNAUTHORIZED", "Wallet is required"), { status: 400 });
  }
  const challenge = createChallenge(wallet);
  return NextResponse.json({ challenge });
}
