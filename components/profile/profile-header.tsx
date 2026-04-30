import { Copy } from "lucide-react";

const stats = [
  { label: "Modules read", value: "28" },
  { label: "Adaptations made", value: "14" },
  { label: "SOL earned", value: "0.184" },
  { label: "Profiles helped", value: "63" },
];

export function ProfileHeader() {
  const wallet = "9xQeWvG816bUx9EPfokM8w2n9v3F2B5iDY5B2Q6";
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Connected wallet</p>
          <p className="font-mono text-mono">{wallet}</p>
        </div>
        <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm">
          <Copy className="h-4 w-4" />
          Copy
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <article key={item.label} className="rounded-xl border border-border bg-background/70 p-3">
            <p className="text-2xl font-semibold tracking-tight">{item.value}</p>
            <p className="text-xs text-muted-foreground">{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
