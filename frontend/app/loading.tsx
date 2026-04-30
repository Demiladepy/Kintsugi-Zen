export default function RootLoading() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-8">
      <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <div className="h-6 w-48 animate-pulse rounded bg-muted" />
        <div className="h-4 w-72 animate-pulse rounded bg-muted" />
        <div className="h-32 animate-pulse rounded bg-muted" />
      </div>
    </main>
  );
}
