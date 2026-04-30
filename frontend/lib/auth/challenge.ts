import { randomUUID } from "crypto";

type ChallengeEntry = { challenge: string; expiresAt: number };

const challengeStore = new Map<string, ChallengeEntry>();

export function createChallenge(wallet: string) {
  const nonce = randomUUID();
  const challenge = `Sign this to prove ownership: ${nonce}`;
  challengeStore.set(wallet, { challenge, expiresAt: Date.now() + 5 * 60 * 1000 });
  return challenge;
}

export function consumeChallenge(wallet: string, challenge: string) {
  const existing = challengeStore.get(wallet);
  if (!existing) return false;
  if (existing.expiresAt < Date.now()) {
    challengeStore.delete(wallet);
    return false;
  }
  const valid = existing.challenge === challenge;
  if (valid) challengeStore.delete(wallet);
  return valid;
}
