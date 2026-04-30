export type PassportRecord = {
  sbtMint: string;
  metadataUri: string;
  metadataHash: string;
  version: number;
  mintedAt: string;
  updatedAt: string;
};

const passportStore = new Map<string, PassportRecord>();

export function getPassportRecord(wallet: string) {
  return passportStore.get(wallet) ?? null;
}

export function setPassportRecord(wallet: string, record: PassportRecord) {
  passportStore.set(wallet, record);
}
