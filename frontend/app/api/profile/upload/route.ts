import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { consumeChallenge } from "@/lib/auth/challenge";
import { verifyWalletSignature } from "@/lib/auth/verify-signature";
import { buildError } from "@/lib/contracts/errors";
import { profileJsonSchema, profileUploadRequestSchema } from "@/lib/contracts/profile";
import { uploadJsonToIrys } from "@/lib/irys/client";
import { checkRateLimit, enforcePayloadLimit } from "@/lib/security/rate-limit";
import { getPassportRecord, setPassportRecord } from "@/lib/profile/store";

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (!enforcePayloadLimit(Buffer.byteLength(raw), 100 * 1024)) {
      return NextResponse.json(buildError("INVALID_PROFILE", "Profile payload too large"), { status: 400 });
    }
    const body = JSON.parse(raw);
    const parsed = profileUploadRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(buildError("INVALID_PROFILE", "Invalid profile payload", parsed.error.flatten()), { status: 400 });
    }

    const { walletAddress, challenge, signature, preferences } = parsed.data;

    const rate = checkRateLimit(`upload:${walletAddress}:${new Date().toISOString().slice(0, 10)}`, 20, 24 * 60 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(buildError("RATE_LIMITED", "Daily upload limit reached"), { status: 429 });
    }

    if (!consumeChallenge(walletAddress, challenge)) {
      return NextResponse.json(buildError("UNAUTHORIZED", "Invalid or expired challenge"), { status: 401 });
    }
    if (!verifyWalletSignature(walletAddress, challenge, signature)) {
      return NextResponse.json(buildError("UNAUTHORIZED", "Signature verification failed"), { status: 401 });
    }

    const record = getPassportRecord(walletAddress);
    const version = (record?.version ?? 0) + 1;
    const profile = profileJsonSchema.parse({
      version,
      type: "sensory_passport",
      createdAt: new Date().toISOString(),
      owner: walletAddress,
      preferences,
      name: `Sensory Passport v${version}`,
      description: "On-chain accessibility profile",
    });

    const uploaded = await uploadJsonToIrys({ data: profile });
    const hash = createHash("sha256").update(JSON.stringify(profile)).digest("hex");
    const next = {
      sbtMint: record?.sbtMint ?? "pending-mint",
      metadataUri: uploaded.uri,
      metadataHash: hash,
      version,
      mintedAt: record?.mintedAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPassportRecord(walletAddress, next);

    return NextResponse.json({ uri: uploaded.uri, hash, version, mocked: uploaded.mocked });
  } catch (error) {
    return NextResponse.json(buildError("INTERNAL", error instanceof Error ? error.message : "Profile upload failed"), { status: 500 });
  }
}
