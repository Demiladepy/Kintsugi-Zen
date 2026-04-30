import Link from "next/link";
import { mockModules } from "@/lib/modules";

type ModulePageProps = {
  params: { id: string };
};

const original =
  "The design of a digital computing system must account not only for algorithmic correctness, but also for human interpretability, cognitive overhead, and interface affordances that determine whether knowledge can be effectively transferred to a learner in context.";

export default function ModulePage({ params }: ModulePageProps) {
  const moduleData = mockModules.find((item) => item.id === params.id) ?? mockModules[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <section className="space-y-5 rounded-2xl border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">Library / {moduleData.subject} / {moduleData.title}</p>
        <div className="aspect-[16/7] rounded-xl bg-gradient-to-br from-primary/15 via-accent-violet/10 to-muted" />
        <header>
          <h1 className="text-h1">{moduleData.title}</h1>
          <p className="text-sm text-muted-foreground">By {moduleData.author}</p>
        </header>
        <div className="rounded-xl border border-primary/50 bg-primary/10 p-4">
          <p className="mb-3 text-sm">This module can be adapted to your Sensory Passport.</p>
          <Link href={`/modules/${params.id}/transform`} className="inline-flex min-h-11 items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Adapt for Me
          </Link>
        </div>
        <article className="prose prose-invert max-w-none">
          <p>{original}</p>
          <p>
            In historical teaching systems, this adaptation burden is delegated to learners themselves; however, with profile-aware systems the
            platform can proactively alter pacing, complexity, and sensory presentation before comprehension fails.
          </p>
        </article>
      </section>

      <aside className="sticky top-24 h-fit rounded-2xl border border-border bg-card p-4">
        <h2 className="mb-2 font-semibold">About this module</h2>
        <p className="text-sm text-muted-foreground">👁 {moduleData.reads} · ✨ {moduleData.adaptations} · 💛 {moduleData.appreciations}</p>
        <p className="mt-4 text-sm text-muted-foreground">Top adapted variants are available after transformation.</p>
      </aside>
    </div>
  );
}
