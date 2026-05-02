import { PublicKey } from "@solana/web3.js";

export function isValidPublicKey(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

export const ALLOWED_ACCESSIBILITY_TYPES = [
  "visual_impairment",
  "hearing_impairment",
  "motor_impairment",
  "cognitive_impairment",
  "general",
] as const;

export type AccessibilityType = (typeof ALLOWED_ACCESSIBILITY_TYPES)[number];

export function isValidAccessibilityType(value: string): value is AccessibilityType {
  return (ALLOWED_ACCESSIBILITY_TYPES as readonly string[]).includes(value);
}
