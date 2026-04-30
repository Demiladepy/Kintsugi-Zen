import Link from "next/link";
import type { ModuleItem } from "@/lib/modules";

type ModuleCardProps = {
  module: ModuleItem;
};

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Link href={`/modules/${module.id}`} className="group rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary/40">
      <div className="aspect-video rounded-t-2xl bg-gradient-to-br from-primary/15 via-accent-violet/10 to-muted" aria-hidden />
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border px-2 py-1">{module.subject}</span>
          <span className="rounded-full border border-border px-2 py-1">{module.difficulty}</span>
          {module.readyForUser && <span className="rounded-full border border-success/50 bg-success/10 px-2 py-1 text-success">Ready for you</span>}
        </div>
        <h3 className="text-h3 leading-snug">{module.title}</h3>
        <p className="text-sm text-muted-foreground">{module.author}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>👁 {module.reads}</span>
          <span>✨ {module.adaptations}</span>
          <span>💛 {module.appreciations}</span>
        </div>
        <p className="text-sm font-medium text-primary opacity-0 transition group-hover:opacity-100">Open module →</p>
      </div>
    </Link>
  );
}
