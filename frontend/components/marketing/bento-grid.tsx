const cards = [
  {
    title: "One Profile Across Every Lesson",
    description: "Your reading and accessibility preferences stay consistent, so you do not need to reconfigure each page.",
    className: "md:col-span-2",
  },
  {
    title: "Built for Clarity",
    description: "Typography, spacing, and contrast are tuned to reduce friction and improve comprehension speed.",
    className: "",
  },
  {
    title: "Readable by Default",
    description: "Dense technical writing can be transformed into plain language that is easier to understand at first glance.",
    className: "",
  },
];

export function BentoGrid() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className={`rounded-2xl border border-border bg-card p-6 shadow-[0_10px_26px_hsl(220_30%_15%/0.08)] ${card.className}`}>
            <h3 className="mb-2 text-xl font-semibold tracking-tight">{card.title}</h3>
            <p className="text-sm leading-7 text-muted-foreground">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
