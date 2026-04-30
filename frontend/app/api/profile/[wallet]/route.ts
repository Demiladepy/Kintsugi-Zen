import { NextResponse } from "next/server";
import { buildError } from "@/lib/contracts/errors";
import { profileHydratedResponseSchema } from "@/lib/contracts/profile";
import { determineArchetype } from "@/lib/profile/archetype";
import { getPassportRecord } from "@/lib/profile/store";

const fallbackPrefs = {
  version: 1,
  type: "sensory_passport" as const,
  createdAt: new Date().toISOString(),
  owner: "",
  preferences: {
    cognitive: [],
    sensory: {
      fontSize: 120,
      contrast: "high" as const,
      letterSpacing: 0.02,
      lineHeight: 1.7,
      motion: "reduced" as const,
      theme: "default-dark" as const,
    },
    language: {
      complexity: "simplified" as const,
      chunkLength: "short" as const,
      audioSupport: true,
      visualAids: true,
    },
  },
  name: "Sensory Passport",
  description: "Hydrated profile",
};

export async function GET(_: Request, { params }: { params: { wallet: string } }) {
  try {
    const record = getPassportRecord(params.wallet);
    if (!record) {
      return NextResponse.json(profileHydratedResponseSchema.parse({ hasPassport: false }));
    }
    const profile = { ...fallbackPrefs, owner: params.wallet };
    const archetype = determineArchetype(profile.preferences);
    const response = profileHydratedResponseSchema.parse({
      hasPassport: true,
      sbtMint: record.sbtMint,
      metadataUri: record.metadataUri,
      preferences: profile,
      mintedAt: record.mintedAt,
      updatedAt: record.updatedAt,
      version: record.version,
      archetype,
      stats: {
        modulesAdapted: 8,
        appreciationsReceived: 21,
        totalEarned: 1280000,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(buildError("INTERNAL", error instanceof Error ? error.message : "Profile fetch failed"), { status: 500 });
  }
}
