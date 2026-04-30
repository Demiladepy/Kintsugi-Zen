import { z } from "zod";

export const moduleFilterSchema = z.object({
  subject: z.string().optional(),
  difficulty: z.coerce.number().min(0).max(2).optional(),
  sort: z.enum(["newest", "popular", "earnings"]).default("newest"),
  cursor: z.string().optional(),
  limit: z.coerce.number().min(1).max(50).default(20),
});

export const moduleResponseItemSchema = z.object({
  id: z.string(),
  creator: z.string(),
  contentUri: z.string(),
  subject: z.number(),
  difficulty: z.number(),
  adaptationCount: z.number(),
  appreciationCount: z.number(),
  totalEarnedLamports: z.number(),
  createdAt: z.string(),
});

export const modulesListResponseSchema = z.object({
  items: z.array(moduleResponseItemSchema),
  nextCursor: z.string().nullable(),
});
