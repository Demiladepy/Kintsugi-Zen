export function buildRegisterPassportPayload(sbtMint: string, metadataUri: string, metadataHash: number[]) {
  return {
    instruction: "register_passport",
    args: { sbtMint, metadataUri, metadataHash },
  };
}

export function buildUpdatePassportPayload(newMetadataUri: string, newMetadataHash: number[]) {
  return {
    instruction: "update_passport_metadata",
    args: { newMetadataUri, newMetadataHash },
  };
}
