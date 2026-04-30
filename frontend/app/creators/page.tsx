"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function CreatorsPage() {
  const [modules, setModules] = useState(5);
  const [adaptations, setAdaptations] = useState(30);
  const projected = useMemo(() => (modules * adaptations * 0.0007).toFixed(3), [modules, adaptations]);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-12 sm:px-8">
      <section className="rounded-2xl border border-border bg-card p-6">
        <h1 className="mb-2 text-h1">Your knowledge. Adapted infinitely. Earning forever.</h1>
        <p className="max-w-3xl text-body text-muted-foreground">
          Publish educational modules once, and earn attribution-backed rewards whenever learners adapt and benefit from your material.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 text-h2">Earnings calculator</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <label className="block space-y-2 text-sm text-muted-foreground">
              Modules published: {modules}
              <input type="range" min={1} max={50} value={modules} onChange={(e) => setModules(Number(e.target.value))} className="h-2 w-full accent-primary" />
            </label>
            <label className="block space-y-2 text-sm text-muted-foreground">
              Adaptations per module: {adaptations}
              <input type="range" min={5} max={200} value={adaptations} onChange={(e) => setAdaptations(Number(e.target.value))} className="h-2 w-full accent-primary" />
            </label>
          </div>
          <div className="rounded-xl border border-primary/40 bg-primary/10 p-5">
            <p className="text-sm text-muted-foreground">Projected monthly creator earnings</p>
            <p className="text-display text-primary">{projected} SOL</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 text-h2">How publishing works</h2>
        <ol className="grid gap-3 sm:grid-cols-2">
          {["Upload content", "Set royalty split", "Publish to protocol", "Earn from adaptations"].map((step, idx) => (
            <li key={step} className="rounded-lg border border-border bg-background/60 p-3 text-sm">
              <span className="mr-2 text-primary">{idx + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </section>
      <Link href="/upload" className="inline-flex min-h-11 items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
        Upload Your First Module
      </Link>
    </main>
  );
}
