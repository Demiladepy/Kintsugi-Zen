export default function MarketingPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-20 sm:px-10">
      <div className="max-w-3xl space-y-8">
        <p className="text-mono uppercase tracking-[0.16em] text-primary">Sensory Passport</p>
        <h1 className="text-display text-foreground">
          Adaptive educational experiences, personalized by your on-chain accessibility passport.
        </h1>
        <p className="max-w-2xl text-body text-muted-foreground">
          The protocol mints non-transferable Token-2022 profiles that describe learning preferences. Modules are then
          transformed in real time to match each learner&apos;s sensory needs.
        </p>
        <div className="h-48 rounded-2xl border border-border bg-card/80 p-6">
          <p className="text-sm text-muted-foreground">Step 1 complete: project scaffold, fonts, and design tokens are configured.</p>
        </div>
      </div>
    </main>
  );
}
