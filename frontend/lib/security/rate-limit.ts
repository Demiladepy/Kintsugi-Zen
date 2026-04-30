type Entry = { count: number; resetAt: number };

const memoryStore = new Map<string, Entry>();

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = memoryStore.get(key);
  if (!current || current.resetAt < now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }
  if (current.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }
  current.count += 1;
  memoryStore.set(key, current);
  return { allowed: true, remaining: limit - current.count };
}

export function enforcePayloadLimit(payloadBytes: number, maxBytes: number) {
  return payloadBytes <= maxBytes;
}

const blockedKeywords = ["malware", "exploit", "hate speech"];

export function passesModeration(text: string) {
  const lower = text.toLowerCase();
  return !blockedKeywords.some((token) => lower.includes(token));
}
