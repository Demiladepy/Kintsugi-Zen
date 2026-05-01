import Link from "next/link";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { LivePreview } from "@/components/marketing/live-preview";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_25%,hsl(var(--primary)/0.16),transparent_40%),radial-gradient(circle_at_82%_10%,hsl(var(--accent-violet)/0.1),transparent_34%),linear-gradient(180deg,hsl(210_20%_99%),hsl(210_16%_97%))]" />
      <div className="pointer-events-none absolute right-[-140px] top-[-120px] h-[420px] w-[420px] rounded-full bg-black/5 blur-3xl" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <p className="text-mono uppercase tracking-[0.14em] text-primary">Personalized Learning Experience</p>
          <h1 className="max-w-3xl text-display">Learning that adjusts to your reading needs in real time.</h1>
          <p className="max-w-2xl text-body text-muted-foreground">
            Save your accessibility preferences once, then use them across lessons and study platforms. Text can be simplified, spacing can be adjusted, and layouts become easier to process.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/onboarding" className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">
              Create Your Profile
            </Link>
            <a href="#how-it-works" className="inline-flex min-h-11 items-center rounded-xl border border-border px-5 py-3 text-sm text-foreground">
              See How It Works <ArrowDownRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground shadow-[0_10px_28px_hsl(220_30%_15%/0.08)] motion-safe:animate-pulse">
            <Sparkles className="h-4 w-4 text-primary" />
            Live preview shows exactly how your profile transforms hard-to-read content.
          </div>
        </div>
        <LivePreview />
      </div>
    </section>
  );
}
