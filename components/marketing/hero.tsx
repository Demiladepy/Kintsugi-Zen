import Link from "next/link";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { LivePreview } from "@/components/marketing/live-preview";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute right-[-120px] top-[-100px] h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <p className="text-mono uppercase tracking-[0.14em] text-primary">Frontier Onchain · Education Track</p>
          <h1 className="max-w-3xl text-display">Education that adapts to how you learn.</h1>
          <p className="max-w-2xl text-body text-muted-foreground">
            A portable accessibility profile, on Solana. Connect once and every learning platform reformats itself for your brain.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/onboarding" className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">
              Mint Your Passport
            </Link>
            <a href="#how-it-works" className="inline-flex min-h-11 items-center rounded-xl border border-border px-5 py-3 text-sm text-foreground">
              See How It Works <ArrowDownRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Live, profile-aware content transformations without wallet connection required.
          </div>
        </div>
        <LivePreview />
      </div>
    </section>
  );
}
