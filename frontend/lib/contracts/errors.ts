import { z } from "zod";

export const errorCodeSchema = z.enum([
  "UNAUTHORIZED",
  "RATE_LIMITED",
  "INVALID_PROFILE",
  "CHAIN_ERROR",
  "AI_ERROR",
  "STORAGE_ERROR",
  "NOT_FOUND",
  "INTERNAL",
]);

export const apiErrorSchema = z.object({
  error: z.object({
    code: errorCodeSchema,
    message: z.string(),
    details: z.unknown().optional(),
    txHash: z.string().optional(),
  }),
});

export type ErrorCode = z.infer<typeof errorCodeSchema>;

export function buildError(code: ErrorCode, message: string, details?: unknown, txHash?: string) {
  return {
    error: {
      code,
      message,
      details,
      txHash,
    },
  };
}
