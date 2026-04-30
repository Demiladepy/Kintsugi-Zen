import bs58 from "bs58";
import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";

export function verifyWalletSignature(walletAddress: string, challenge: string, signature: string) {
  try {
    const publicKey = new PublicKey(walletAddress);
    const message = new TextEncoder().encode(challenge);
    const sigBytes = bs58.decode(signature);
    return nacl.sign.detached.verify(message, sigBytes, publicKey.toBytes());
  } catch {
    return false;
  }
}
