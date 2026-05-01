import Link from "next/link";
import { BentoGrid } from "@/components/marketing/bento-grid";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";

export default function MarketingPage() {
  return (
    <main>
      <Hero />
      <section className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-4 border-y border-border px-4 py-5 text-sm text-muted-foreground sm:px-8">
        <span>Designed for accessibility</span>
        <span>·</span>
        <span>Readable typography</span>
        <span>·</span>
        <span>Adaptive content</span>
        <span>·</span>
        <span>Consistent learning experience</span>
      </section>
      <HowItWorks />
      <BentoGrid />
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 text-center sm:px-8">
        <h2 className="mb-3 text-h2">Start with one click.</h2>
        <p className="mb-6 text-muted-foreground">Set your profile in under a minute and start reading in a format that works for you.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/connect" className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">
            Get Started
          </Link>
          <Link href="/about" className="inline-flex min-h-11 items-center rounded-xl border border-border px-5 py-3 text-sm">
            About
          </Link>
          <Link href="/creators" className="inline-flex min-h-11 items-center rounded-xl border border-border px-5 py-3 text-sm">
            For Creators
          </Link>
        </div>
      </section>
    </main>
  );
}
