
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  AuthorityType,
  ExtensionType,
  TOKEN_2022_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createInitializeNonTransferableMintInstruction,
  createMintToInstruction,
  createSetAuthorityInstruction,
  getAssociatedTokenAddressSync,
  getMintLen,
} from "@solana/spl-token";
import bs58 from "bs58";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MintSBTResult {
  mint: string;
  tx: string;
}

interface SBTRecord extends MintSBTResult {
  mintedAt: Date;
}

// ---------------------------------------------------------------------------
// Registry (MVP: in-memory — swap .get/.set/.has for DB calls when ready)
// ---------------------------------------------------------------------------

const registry = new Map<string, SBTRecord>();

export function getSBT(wallet: string): SBTRecord | null {
  return registry.get(wallet) ?? null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getConnection(): Connection {
  const url = process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com";
  return new Connection(url, "confirmed");
}

function getMintAuthority(): Keypair {
  const raw = process.env.MINT_AUTHORITY_SECRET_KEY ?? "";
  if (!raw) throw new Error("MINT_AUTHORITY_SECRET_KEY is not configured");

  const bytes = raw.startsWith("[")
    ? Uint8Array.from(JSON.parse(raw) as number[])
    : bs58.decode(raw);

  return Keypair.fromSecretKey(bytes);
}

// ---------------------------------------------------------------------------
// Core: mintSBT
// ---------------------------------------------------------------------------

export async function mintSBT(
  recipientAddress: string,
  accessibilityType: string
): Promise<MintSBTResult> {
  // Duplicate guard
  if (registry.has(recipientAddress)) {
    throw new SBTAlreadyExistsError(recipientAddress);
  }

  const connection = getConnection();
  const authority = getMintAuthority();
  const recipient = new PublicKey(recipientAddress);
  const mintKeypair = Keypair.generate();

  // Space for a NonTransferable Token-2022 mint account
  const mintLen = getMintLen([ExtensionType.NonTransferable]);
  const mintLamports = await connection.getMinimumBalanceForRentExemption(mintLen);

  // Derive recipient's associated token account
  const ata = getAssociatedTokenAddressSync(
    mintKeypair.publicKey,
    recipient,
    false,
    TOKEN_2022_PROGRAM_ID
  );

  const tx = new Transaction().add(
    // 1. Allocate mint account owned by Token-2022
    SystemProgram.createAccount({
      fromPubkey: authority.publicKey,
      newAccountPubkey: mintKeypair.publicKey,
      space: mintLen,
      lamports: mintLamports,
      programId: TOKEN_2022_PROGRAM_ID,
    }),
    // 2. Initialize NonTransferable extension (must precede initializeMint)
    createInitializeNonTransferableMintInstruction(
      mintKeypair.publicKey,
      TOKEN_2022_PROGRAM_ID
    ),
    // 3. Initialize mint: decimals=0, no freeze authority
    createInitializeMintInstruction(
      mintKeypair.publicKey,
      0,
      authority.publicKey,
      null,
      TOKEN_2022_PROGRAM_ID
    ),
    // 4. Create recipient's ATA
    createAssociatedTokenAccountInstruction(
      authority.publicKey,
      ata,
      recipient,
      mintKeypair.publicKey,
      TOKEN_2022_PROGRAM_ID
    ),
    // 5. Mint exactly 1 token
    createMintToInstruction(
      mintKeypair.publicKey,
      ata,
      authority.publicKey,
      1,
      [],
      TOKEN_2022_PROGRAM_ID
    ),
    // 6. Revoke mint authority → supply permanently fixed at 1
    createSetAuthorityInstruction(
      mintKeypair.publicKey,
      authority.publicKey,
      AuthorityType.MintTokens,
      null,
      [],
      TOKEN_2022_PROGRAM_ID
    )
  );

  const signature = await sendAndConfirmTransaction(
    connection,
    tx,
    [authority, mintKeypair],
    { commitment: "confirmed" }
  );

  const record: SBTRecord = {
    mint: mintKeypair.publicKey.toBase58(),
    tx: signature,
    mintedAt: new Date(),
  };

  registry.set(recipientAddress, record);

  return { mint: record.mint, tx: record.tx };
}

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

export class SBTAlreadyExistsError extends Error {
  constructor(wallet: string) {
    super(`Wallet ${wallet} already holds a Sensory Passport SBT`);
    this.name = "SBTAlreadyExistsError";
  }
}
