"use client";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorPageProps) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-8">
      <section className="rounded-2xl border border-destructive/40 bg-destructive/10 p-6">
        <h1 className="mb-2 text-h1">Something went wrong</h1>
        <p className="mb-4 text-sm text-muted-foreground">{error.message}</p>
        <button type="button" onClick={reset} className="min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          Retry
        </button>
      </section>
    </main>
  );
}
