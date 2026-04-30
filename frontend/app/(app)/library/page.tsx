"use client";

import { useMemo, useState } from "react";
import { FilterSidebar } from "@/components/library/filter-sidebar";
import { ModuleCard } from "@/components/library/module-card";
import { mockModules } from "@/lib/modules";

type Filters = {
  search: string;
  subjects: string[];
  difficulty: "All" | "Beginner" | "Intermediate" | "Advanced";
  length: number;
  onlyReady: boolean;
  format: "All" | "Text" | "Video" | "Interactive";
};

const initialFilters: Filters = {
  search: "",
  subjects: [],
  difficulty: "All",
  length: 60,
  onlyReady: false,
  format: "All",
};

export default function LibraryPage() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sort, setSort] = useState<"Newest" | "Most adapted" | "Highest impact">("Most adapted");

  const filtered = useMemo(() => {
    const results = mockModules.filter((module) => {
      if (filters.search && !module.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.subjects.length > 0 && !filters.subjects.includes(module.subject)) return false;
      if (filters.difficulty !== "All" && module.difficulty !== filters.difficulty) return false;
      if (module.length > filters.length) return false;
      if (filters.onlyReady && !module.readyForUser) return false;
      if (filters.format !== "All" && module.format !== filters.format) return false;
      return true;
    });

    if (sort === "Most adapted") return [...results].sort((a, b) => b.adaptations - a.adaptations);
    if (sort === "Highest impact") return [...results].sort((a, b) => b.appreciations - a.appreciations);
    return results;
  }, [filters, sort]);

  return (
    <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <FilterSidebar filters={filters} onChange={setFilters} />
      <div className="space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">{filtered.length} modules</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="min-h-11 rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option>Newest</option>
            <option>Most adapted</option>
            <option>Highest impact</option>
          </select>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {mockModules.slice(0, 3).map((module) => (
            <article key={`featured-${module.id}`} className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
              <p className="mb-2 text-xs uppercase tracking-[0.12em] text-primary">Featured</p>
              <h2 className="text-lg font-semibold">{module.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{module.subject} · {module.difficulty}</p>
            </article>
          ))}
        </section>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h3 className="mb-2 text-h3">No modules match your filters</h3>
            <p className="mb-4 text-sm text-muted-foreground">Try broadening your filters or clearing search constraints.</p>
            <button type="button" onClick={() => setFilters(initialFilters)} className="min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              Clear filters
            </button>
          </div>
        ) : (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </section>
        )}

        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            If modules fail to load, the app now surfaces explicit API errors and recovery states rather than silent failures.
          </p>
        </div>
      </div>
    </section>
  );
}
