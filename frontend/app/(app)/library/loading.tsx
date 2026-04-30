export default function LibraryLoading() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <article key={idx} className="rounded-2xl border border-border bg-card p-4">
          <div className="mb-3 aspect-video animate-pulse rounded bg-muted" />
          <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        </article>
      ))}
    </section>
  );
}
