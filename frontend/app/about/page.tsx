import { ShieldCheck, Workflow, Wallet } from "lucide-react";

const principles = [
  {
    icon: Wallet,
    title: "Why Solana",
    body: "Low fees enable micro-incentives for each helpful adaptation, making accessibility economically sustainable.",
  },
  {
    icon: ShieldCheck,
    title: "Why Token-2022",
    body: "NonTransferable credentials keep sensory profiles tied to identity and prevent profile resale.",
  },
  {
    icon: Workflow,
    title: "Architecture",
    body: "Wallet passport -> transform API -> Arweave storage -> attribution on chain.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-12 sm:px-8">
      <section className="rounded-2xl border border-border bg-card p-6">
        <h1 className="mb-2 text-h1">About Sensory Passport</h1>
        <p className="max-w-3xl text-body text-muted-foreground">
          Sensory Passport is an accessibility protocol for education. It keeps learning preferences portable and verifiable so every module can be rendered in a form that a learner can actually use.
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {principles.map(({ icon: Icon, title, body }) => (
          <article key={title} className="rounded-2xl border border-border bg-card p-5">
            <Icon className="mb-3 h-5 w-5 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">{title}</h2>
            <p className="text-sm leading-7 text-muted-foreground">{body}</p>
          </article>
        ))}
      </section>
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-3 text-h2">Privacy model</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>On-chain: references, attribution, and ownership proof.</li>
          <li>Off-chain: profile metadata and transformed documents pinned with content-addressed IDs.</li>
          <li>User controls updates via signed wallet transactions.</li>
        </ul>
      </section>
    </main>
  );
}
