export type PublishModuleArgs = {
  contentUri: string;
  contentHash: number[];
  titleHash: number[];
  subject: number;
  difficulty: number;
  license: number;
  creatorRoyaltyBps: number;
  allowAiAdaptation: boolean;
};

export function buildPublishModulePayload(args: PublishModuleArgs) {
  return {
    instruction: "publish_module",
    args,
  };
}

export function buildRecordAdaptationPayload(adaptedUri: string, adaptedHash: number[], profileArchetype: number) {
  return {
    instruction: "record_adaptation",
    args: { adaptedUri, adaptedHash, profileArchetype },
  };
}

export function buildAppreciatePayload(amount: number) {
  return {
    instruction: "appreciate",
    args: { amount },
  };
}
