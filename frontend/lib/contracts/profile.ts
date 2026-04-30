import { z } from "zod";

export const preferencesSchema = z.object({
  cognitive: z.array(z.string()).default([]),
  sensory: z.object({
    fontSize: z.number().min(100).max(180),
    contrast: z.enum(["standard", "high", "maximum"]),
    letterSpacing: z.number().min(0).max(0.1),
    lineHeight: z.number().min(1.4).max(2),
    motion: z.enum(["full", "reduced"]),
    theme: z.enum(["default-dark", "warm-sepia", "pure-black"]),
  }),
  language: z.object({
    complexity: z.enum(["original", "simplified", "plain-language", "visual-first"]),
    chunkLength: z.enum(["long", "short", "bullets"]),
    audioSupport: z.boolean(),
    visualAids: z.boolean(),
  }),
});

export const profileUploadRequestSchema = z.object({
  walletAddress: z.string().min(32),
  challenge: z.string().min(12),
  signature: z.string().min(16),
  preferences: preferencesSchema,
});

export const profileJsonSchema = z.object({
  version: z.number().default(1),
  type: z.literal("sensory_passport"),
  createdAt: z.string(),
  owner: z.string(),
  preferences: preferencesSchema,
  image: z.string().optional(),
  name: z.string(),
  description: z.string(),
});

export const profileHydratedResponseSchema = z.object({
  hasPassport: z.boolean(),
  sbtMint: z.string().optional(),
  metadataUri: z.string().optional(),
  preferences: profileJsonSchema.optional(),
  mintedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  version: z.number().optional(),
  archetype: z.number().optional(),
  stats: z
    .object({
      modulesAdapted: z.number(),
      appreciationsReceived: z.number(),
      totalEarned: z.number(),
    })
    .optional(),
});
