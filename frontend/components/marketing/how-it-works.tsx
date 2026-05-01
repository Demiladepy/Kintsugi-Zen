import { BadgeCheck, Bot, Coins } from "lucide-react";

const items = [
  {
    icon: BadgeCheck,
    title: "Set Your Preferences",
    description: "Choose how you read best: clearer fonts, better spacing, stronger contrast, and simpler wording.",
  },
  {
    icon: Bot,
    title: "Apply Instantly",
    description: "Lessons automatically reformat into the style you selected so difficult text becomes easier to follow.",
  },
  {
    icon: Coins,
    title: "Keep It Consistent",
    description: "Use one profile across sessions so every module starts in a format that works for you.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-h2">How it works</h2>
        <p className="text-sm text-muted-foreground">A simple workflow designed for clear and inclusive learning.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map(({ icon: Icon, title, description }) => (
          <article key={title} className="rounded-2xl border border-border bg-card p-6 shadow-[0_10px_26px_hsl(220_30%_15%/0.08)]">
            <Icon className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-2 text-h3">{title}</h3>
            <p className="text-sm leading-7 text-muted-foreground">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
