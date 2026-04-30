"use client";

import { useMemo, useState } from "react";

type UploadState = {
  title: string;
  subject: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  body: string;
  creatorShare: number;
  transformerShare: number;
  license: "CC0" | "CC-BY" | "CC-BY-SA" | "All Rights Reserved";
  allowTransform: boolean;
};

const initial: UploadState = {
  title: "",
  subject: "Computer Science",
  difficulty: "Beginner",
  description: "",
  body: "",
  creatorShare: 70,
  transformerShare: 30,
  license: "CC-BY",
  allowTransform: true,
};

export default function UploadPage() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<UploadState>(initial);
  const [publishing, setPublishing] = useState(false);
  const storageEstimate = useMemo(() => ((state.body.length || 500) / 100000).toFixed(4), [state.body.length]);

  const setPatch = (patch: Partial<UploadState>) => setState((prev) => ({ ...prev, ...patch }));

  const publish = async () => {
    setPublishing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setPublishing(false);
    alert("Module published (mock).");
  };

  return (
    <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
      <header>
        <h1 className="text-h1">Upload Module</h1>
        <p className="text-sm text-muted-foreground">Step {step} of 3</p>
      </header>
      {step === 1 && (
        <div className="grid gap-4">
          <input placeholder="Title" value={state.title} onChange={(e) => setPatch({ title: e.target.value })} className="min-h-11 rounded-lg border border-input bg-background px-3" />
          <select value={state.subject} onChange={(e) => setPatch({ subject: e.target.value })} className="min-h-11 rounded-lg border border-input bg-background px-3">
            {["Computer Science", "Mathematics", "Biology", "History", "Languages"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <select value={state.difficulty} onChange={(e) => setPatch({ difficulty: e.target.value as UploadState["difficulty"] })} className="min-h-11 rounded-lg border border-input bg-background px-3">
            {["Beginner", "Intermediate", "Advanced"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <textarea placeholder="Description" value={state.description} onChange={(e) => setPatch({ description: e.target.value })} className="min-h-24 rounded-lg border border-input bg-background px-3 py-2" />
          <textarea placeholder="Content body (paste from PDF or editor)" value={state.body} onChange={(e) => setPatch({ body: e.target.value })} className="min-h-56 rounded-lg border border-input bg-background px-3 py-2" />
        </div>
      )}
      {step === 2 && (
        <div className="grid gap-4">
          <label className="space-y-2 text-sm text-muted-foreground">
            Creator royalty: {state.creatorShare}%
            <input
              type="range"
              min={10}
              max={90}
              value={state.creatorShare}
              onChange={(e) => {
                const creator = Number(e.target.value);
                setPatch({ creatorShare: creator, transformerShare: 100 - creator });
              }}
              className="h-2 w-full accent-primary"
            />
          </label>
          <p className="text-sm text-muted-foreground">Transformer royalty: {state.transformerShare}%</p>
          <select value={state.license} onChange={(e) => setPatch({ license: e.target.value as UploadState["license"] })} className="min-h-11 rounded-lg border border-input bg-background px-3">
            {["CC0", "CC-BY", "CC-BY-SA", "All Rights Reserved"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <label className="flex min-h-11 items-center gap-2 text-sm">
            <input type="checkbox" checked={state.allowTransform} onChange={(e) => setPatch({ allowTransform: e.target.checked })} />
            Allow AI transformation
          </label>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-4">
          <article className="rounded-xl border border-border bg-background/60 p-4">
            <h2 className="text-lg font-semibold">{state.title || "Untitled module"}</h2>
            <p className="text-sm text-muted-foreground">{state.subject} · {state.difficulty}</p>
            <p className="mt-2 text-sm">{state.description || "No description yet."}</p>
          </article>
          <p className="text-sm text-muted-foreground">Estimated Irys storage cost: ~{storageEstimate} SOL</p>
          <button disabled={publishing} type="button" onClick={publish} className="min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50">
            {publishing ? "Publishing..." : "Publish Module"}
          </button>
        </div>
      )}
      <footer className="flex items-center justify-between pt-2">
        <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm">
          Back
        </button>
        <button type="button" onClick={() => setStep((s) => Math.min(3, s + 1))} className="min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          Continue
        </button>
      </footer>
    </section>
  );
}
