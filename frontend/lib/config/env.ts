import { z } from "zod";

const envSchema = z.object({
  SOLANA_RPC_URL: z.string().url().optional(),
  SOLANA_NETWORK: z.enum(["devnet", "mainnet-beta"]).default("devnet"),
  ANTHROPIC_API_KEY: z.string().optional(),
  ANTHROPIC_MODEL: z.string().default("claude-opus-4-7"),
  IRYS_PRIVATE_KEY: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().optional(),
  INTERNAL_API_KEY: z.string().optional(),
});

export const env = envSchema.parse({
  SOLANA_RPC_URL: process.env.SOLANA_RPC_URL,
  SOLANA_NETWORK: process.env.SOLANA_NETWORK,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  ANTHROPIC_MODEL: process.env.ANTHROPIC_MODEL,
  IRYS_PRIVATE_KEY: process.env.IRYS_PRIVATE_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_URL: process.env.REDIS_URL,
  INTERNAL_API_KEY: process.env.INTERNAL_API_KEY,
});
