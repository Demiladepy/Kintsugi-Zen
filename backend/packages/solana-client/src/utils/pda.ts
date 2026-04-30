import { PublicKey } from "@solana/web3.js";

const REGISTRY_PROGRAM_ID = new PublicKey(process.env.REGISTRY_PROGRAM_ID ?? "11111111111111111111111111111111");
const PASSPORT_DIRECTORY_PROGRAM_ID = new PublicKey(process.env.PASSPORT_DIRECTORY_PROGRAM_ID ?? "11111111111111111111111111111111");

export function findModulePda(creator: PublicKey, contentHash: Uint8Array) {
  return PublicKey.findProgramAddressSync([Buffer.from("module"), creator.toBuffer(), Buffer.from(contentHash)], REGISTRY_PROGRAM_ID);
}

export function findPassportPda(owner: PublicKey) {
  return PublicKey.findProgramAddressSync([Buffer.from("passport"), owner.toBuffer()], PASSPORT_DIRECTORY_PROGRAM_ID);
}
