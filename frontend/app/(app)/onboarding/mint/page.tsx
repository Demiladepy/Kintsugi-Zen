"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { TxLink } from "@/components/shared/tx-link";
import { mintProfileSbt } from "@/lib/solana/profile-sbt";
import { usePreferencesStore } from "@/stores/preferences";
import { toDisplayError } from "@/utils/format";

type MintState = "pre" | "signing" | "pending" | "error";

export default function OnboardingMintPage() {
  const router = useRouter();
  const { connection } = useConnection();
  const wallet = useWallet();
  const currentPreferences = usePreferencesStore((s) => s.currentPreferences);
  const [state, setState] = useState<MintState>("pre");
  const [progress, setProgress] = useState(0);
  const [irysId, setIrysId] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [mintAddress, setMintAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const steps = useMemo(
    () => [
      "Profile uploaded to Arweave",
      "Minting Token-2022 SBT",
      "Confirming on Solana",
    ],
    [],
  );

  const runMint = async () => {
    try {
      setError(null);
      setState("signing");
      if (!wallet.connected) throw new Error("Connect your wallet before minting.");

      setState("pending");
      setProgress(1);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "profile", payload: currentPreferences }),
      });
      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadJson?.error ?? "Profile upload failed.");
      setIrysId(uploadJson.id);

      setProgress(2);
      const mintResult = await mintProfileSbt({
        wallet,
        connection,
        metadataUri: uploadJson.uri,
      });
      setMintAddress(mintResult.mintAddress);
      setSignature(mintResult.signature);

      setProgress(3);
      await new Promise((r) => setTimeout(r, 1200));
      router.push("/onboarding/success");
    } catch (e) {
      setState("error");
      setError(toDisplayError(e));
    }
  };

  const copyError = async () => {
    if (!error) return;
    await navigator.clipboard.writeText(error);
  };

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6">
      {state === "pre" && (
        <div className="space-y-5">
          <h1 className="text-h1">Ready to mint</h1>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Network: Solana Devnet</li>
            <li>Token Standard: Token-2022 (NonTransferable extension)</li>
            <li>Storage: Profile JSON pinned to Arweave via Irys</li>
            <li>Cost: ~0.002 SOL</li>
          </ul>
          <button type="button" onClick={runMint} className="min-h-11 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground">
            Approve in Wallet
          </button>
        </div>
      )}
      {state === "signing" && <p className="text-sm text-muted-foreground">Waiting for wallet signature...</p>}
      {state === "pending" && (
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={step} className="flex items-center gap-3">
              <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${progress > index ? "border-success text-success" : "border-border text-muted-foreground"}`}>
                {progress > index ? "✓" : "○"}
              </span>
              <div>
                <span>{step}</span>
                {index === 0 && irysId && <p className="text-xs text-muted-foreground">Irys: {irysId}</p>}
                {index === 1 && mintAddress && <p className="text-xs text-muted-foreground">Mint: {mintAddress}</p>}
                {index === 2 && signature && (
                  <div className="text-xs">
                    <TxLink signature={signature} />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
      {state === "error" && (
        <div className="space-y-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <p className="text-sm">Mint failed: {error}</p>
          <div className="flex gap-2">
            <button type="button" onClick={runMint} className="min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              Try Again
            </button>
            <button type="button" onClick={copyError} className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm">
              Copy Error
            </button>
          </div>
        </div>
      )}
      <div className="mt-6">
        <Link href="/onboarding" className="text-sm text-muted-foreground">
          Back to onboarding
        </Link>
      </div>
    </section>
  );
}
