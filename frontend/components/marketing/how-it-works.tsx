import { BadgeCheck, Bot, Coins } from "lucide-react";

const items = [
  {
    icon: BadgeCheck,
    title: "Mint",
    description: "One profile, minted as a non-transferable Token-2022 credential in your wallet.",
  },
  {
    icon: Bot,
    title: "Adapt",
    description: "AI reformats dense educational modules to your sensory and cognitive preferences.",
  },
  {
    icon: Coins,
    title: "Earn",
    description: "Attribution and micropayments align creator incentives with accessibility outcomes.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-h2">How it works</h2>
        <p className="text-sm text-muted-foreground">Built for inclusive education at protocol scale.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map(({ icon: Icon, title, description }) => (
          <article key={title} className="rounded-2xl border border-border bg-card p-6">
            <Icon className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-2 text-h3">{title}</h3>
            <p className="text-sm leading-7 text-muted-foreground">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
