type TransformPayload = {
  sourceContent: string;
  profile: {
    readingComplexity?: string;
    chunkLength?: string;
    fontScale?: number;
  };
};

export async function transformContentWithProfile({ sourceContent, profile }: TransformPayload) {
  const complexity = profile.readingComplexity ?? "original";
  const chunk = profile.chunkLength ?? "long";

  let transformed = sourceContent;
  if (complexity !== "original") {
    transformed = sourceContent
      .replace(/consists of/gi, "can be understood as")
      .replace(/transformation/gi, "change");
  }
  if (chunk === "short") {
    transformed = transformed.replace(/, /g, ". ");
  } else if (chunk === "bullets") {
    transformed = transformed
      .split(".")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => `- ${s}.`)
      .join("\n");
  }

  return {
    transformedContent: transformed,
    tokenCount: Math.max(200, Math.floor(transformed.length / 3)),
    model: "mock-profile-transform-v1",
  };
}

export async function* transformContentStream(sourceContent: string, profile: TransformPayload["profile"]) {
  yield { stage: "reading_profile", status: "active" as const };
  await new Promise((r) => setTimeout(r, 150));
  yield { stage: "reading_profile", status: "complete" as const };

  yield { stage: "generating", status: "active" as const, tokensGenerated: 0 };
  const transformed = await transformContentWithProfile({ sourceContent, profile });
  for (let i = 20; i <= transformed.tokenCount; i += 40) {
    await new Promise((r) => setTimeout(r, 40));
    yield { stage: "generating", status: "active" as const, tokensGenerated: Math.min(i, transformed.tokenCount) };
  }
  yield { stage: "generating", status: "complete" as const };
  yield { stage: "uploading", status: "active" as const };
  await new Promise((r) => setTimeout(r, 120));
  yield { stage: "uploading", status: "complete" as const, irysId: `mock-irys-${Date.now()}` };
  yield {
    stage: "done",
    adaptedUri: `https://arweave.net/mock-${Date.now()}`,
    adaptedHash: `hash-${Date.now()}`,
    transformedContent: transformed.transformedContent,
  };
}
