import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMint2Instruction,
  createInitializeNonTransferableMintInstruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  MINT_SIZE,
} from "@solana/spl-token";
import { Connection, PublicKey, SystemProgram, Transaction, Keypair } from "@solana/web3.js";
import type { WalletContextState } from "@solana/wallet-adapter-react";

type MintProfileSbtParams = {
  wallet: WalletContextState;
  connection: Connection;
  metadataUri: string;
};

export type MintProfileSbtResult = {
  mintAddress: string;
  signature: string;
};

export async function mintProfileSbt({ wallet, connection, metadataUri }: MintProfileSbtParams): Promise<MintProfileSbtResult> {
  if (!wallet.publicKey || !wallet.sendTransaction) {
    throw new Error("Wallet not connected.");
  }

  const mint = Keypair.generate();
  const owner = wallet.publicKey;
  const tokenAccount = getAssociatedTokenAddressSync(mint.publicKey, owner, false, TOKEN_2022_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);
  const lamports = await connection.getMinimumBalanceForRentExemption(MINT_SIZE);

  const tx = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: owner,
      newAccountPubkey: mint.publicKey,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_2022_PROGRAM_ID,
    }),
    createInitializeNonTransferableMintInstruction(mint.publicKey, TOKEN_2022_PROGRAM_ID),
    createInitializeMint2Instruction(mint.publicKey, 0, owner, null, TOKEN_2022_PROGRAM_ID),
    createAssociatedTokenAccountInstruction(owner, tokenAccount, owner, mint.publicKey, TOKEN_2022_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID),
    createMintToInstruction(mint.publicKey, tokenAccount, owner, 1, [], TOKEN_2022_PROGRAM_ID),
  );

  tx.feePayer = owner;
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  tx.partialSign(mint);

  const sig = await wallet.sendTransaction(tx, connection, { signers: [mint] });
  await connection.confirmTransaction(sig, "confirmed");

  if (typeof window !== "undefined") {
    localStorage.setItem(`sensory-passport:${owner.toBase58()}`, JSON.stringify({ mint: mint.publicKey.toBase58(), metadataUri }));
  }

  return {
    mintAddress: mint.publicKey.toBase58(),
    signature: sig,
  };
}

export async function hasPassportForWallet(connection: { getParsedTokenAccountsByOwner: Function }, owner: PublicKey) {
  const accounts = await connection.getParsedTokenAccountsByOwner(owner, { programId: TOKEN_2022_PROGRAM_ID });
  return accounts.value.some((a: any) => Number(a.account.data.parsed.info.tokenAmount.amount) > 0);
}
