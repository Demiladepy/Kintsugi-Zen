const cards = [
  {
    title: "Your Passport. Your Wallet. Your Rules.",
    description: "Preference traits are portable and user-owned, represented as a non-transferable identity credential.",
    className: "md:col-span-2",
  },
  {
    title: "Built on Token-2022",
    description: "NonTransferable extension enforces soulbound ownership.",
    className: "",
  },
  {
    title: "Stored on Arweave via Irys",
    description: "Adapted outputs remain verifiable and permanent.",
    className: "",
  },
];

export function BentoGrid() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className={`rounded-2xl border border-border bg-card p-6 ${card.className}`}>
            <h3 className="mb-2 text-xl font-semibold tracking-tight">{card.title}</h3>
            <p className="text-sm leading-7 text-muted-foreground">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
