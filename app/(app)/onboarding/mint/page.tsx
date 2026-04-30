"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type MintState = "pre" | "signing" | "pending";

export default function OnboardingMintPage() {
  const router = useRouter();
  const [state, setState] = useState<MintState>("pre");
  const [progress, setProgress] = useState(0);

  const steps = useMemo(
    () => [
      "Profile uploaded to Arweave",
      "Minting Token-2022 SBT",
      "Confirming on Solana",
    ],
    [],
  );

  const runMockMint = async () => {
    setState("signing");
    await new Promise((r) => setTimeout(r, 1200));
    setState("pending");
    for (let i = 1; i <= 3; i += 1) {
      setProgress(i);
      await new Promise((r) => setTimeout(r, 1400));
    }
    router.push("/onboarding/success");
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
          <button type="button" onClick={runMockMint} className="min-h-11 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground">
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
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}
      <div className="mt-6">
        <Link href="/onboarding" className="text-sm text-muted-foreground">
          Back to onboarding
        </Link>
      </div>
    </section>
  );
}
