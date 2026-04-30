import Link from "next/link";

export default function OnboardingSuccessPage() {
  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center">
      <p className="mb-2 text-success">✓ Mint confirmed</p>
      <h1 className="mb-3 text-h1">Welcome. Your Passport is live.</h1>
      <p className="mb-8 text-muted-foreground">Your non-transferable profile is now ready to personalize educational modules.</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <Link href="/library" className="min-h-11 rounded-lg border border-border px-4 py-3 text-sm">
          Browse the Library
        </Link>
        <Link href="/profile" className="min-h-11 rounded-lg border border-border px-4 py-3 text-sm">
          View your Passport
        </Link>
        <Link href="/modules/demo" className="min-h-11 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">
          Try an adaptation
        </Link>
      </div>
    </section>
  );
}
