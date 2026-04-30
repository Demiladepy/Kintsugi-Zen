"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TxLink } from "@/components/shared/tx-link";

type TransformLoaderProps = {
  moduleId: string;
};

const wallet = "9xQeWvG816bUx9EPfokM8w2n9v3F2B5iDY5B2Q6";

export function TransformLoader({ moduleId }: TransformLoaderProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [typed, setTyped] = useState("");
  const typeText = "Rewriting dense passages into short, focused, plain-language chunks...";

  const stages = useMemo(
    () => [
      {
        title: "Reading Sensory Passport from chain",
        detail: `${wallet.slice(0, 6)}...${wallet.slice(-4)}`,
      },
      {
        title: "Generating accessible version",
        detail: typed || "Preparing generation stream...",
      },
      {
        title: "Pinning to Arweave via Irys",
        detail: progress >= 3 ? "Irys tx: 8w3c...2m4r" : "Awaiting generated content package...",
      },
      {
        title: "Recording attribution on Solana",
        detail: progress >= 4 ? "Signature: 4cd1...e90f" : "Calling content_registry.record_transformation()...",
      },
    ],
    [progress, typed],
  );

  useEffect(() => {
    if (progress !== 1) return;
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTyped(typeText.slice(0, index));
      if (index >= typeText.length) window.clearInterval(interval);
    }, 35);
    return () => window.clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    let active = true;
    const run = async () => {
      for (let i = 1; i <= 4; i += 1) {
        if (!active) return;
        setProgress(i);
        await new Promise((r) => setTimeout(r, 1900));
      }
      router.push(`/modules/${moduleId}/adapted`);
    };
    run();
    return () => {
      active = false;
    };
  }, [moduleId, router]);

  return (
    <section className="mx-auto w-full max-w-3xl rounded-2xl border border-border bg-card p-6">
      <h1 className="mb-2 text-h1">Transforming for your passport</h1>
      <p className="mb-6 text-sm text-muted-foreground">This usually takes 8-15 seconds.</p>
      <ol className="space-y-5">
        {stages.map((stage, index) => {
          const step = index + 1;
          const done = progress > step;
          const current = progress === step;
          return (
            <li key={stage.title} className="flex gap-3">
              <span className={`mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs ${done ? "border-success text-success animate-pulse-success" : current ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>
                {done ? "✓" : current ? "⟳" : "○"}
              </span>
              <div>
                <p className="font-medium">{stage.title}</p>
                <p className="text-sm text-muted-foreground">{stage.detail}</p>
                {done && step >= 3 && (
                  <div className="mt-1">
                    <TxLink signature={step === 3 ? "8w3c6f9ab01de2m4r7a8h5k2n9q7z1x3p0v" : "4cd1538ea87f22e90f1a9b7722dce89012ab"} />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <div className="mt-6 h-2 rounded-full bg-muted">
        <div className="h-2 rounded-full bg-primary transition-all duration-500" style={{ width: `${(progress / 4) * 100}%` }} />
      </div>
    </section>
  );
}
