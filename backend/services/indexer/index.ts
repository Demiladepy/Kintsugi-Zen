type IndexerEvent =
  | { type: "ModulePublished"; signature: string; payload: Record<string, unknown> }
  | { type: "AdaptationCreated"; signature: string; payload: Record<string, unknown> }
  | { type: "AppreciationPaid"; signature: string; payload: Record<string, unknown> };

let lastIndexedSlot: number | null = null;
let lastSignature: string | null = null;

async function processEvent(event: IndexerEvent) {
  lastSignature = event.signature;
  lastIndexedSlot = Date.now();
  console.log("[indexer] processed", event.type, event.signature);
}

async function pollMockEvents() {
  const event: IndexerEvent = {
    type: "ModulePublished",
    signature: `mock-${Date.now()}`,
    payload: { subject: 0 },
  };
  await processEvent(event);
}

async function main() {
  console.log("[indexer] starting");
  setInterval(() => {
    pollMockEvents().catch((error) => console.error("[indexer] error", error));
  }, 5000);
}

void main();

export function getIndexerHealth() {
  return {
    status: "ok",
    lastIndexedSlot,
    lastSignature,
    updatedAt: new Date().toISOString(),
  };
}
