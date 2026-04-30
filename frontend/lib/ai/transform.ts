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
