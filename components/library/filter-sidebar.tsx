"use client";

type Filters = {
  search: string;
  subjects: string[];
  difficulty: "All" | "Beginner" | "Intermediate" | "Advanced";
  length: number;
  onlyReady: boolean;
  format: "All" | "Text" | "Video" | "Interactive";
};

type FilterSidebarProps = {
  filters: Filters;
  onChange: (next: Filters) => void;
};

const subjects = ["Computer Science", "Mathematics", "Biology", "History", "Languages"];

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  return (
    <aside className="rounded-2xl border border-border bg-card p-4 lg:sticky lg:top-24 lg:h-fit">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">Filters</h2>
        <button type="button" className="text-xs text-muted-foreground" onClick={() => onChange({ search: "", subjects: [], difficulty: "All", length: 60, onlyReady: false, format: "All" })}>
          Clear
        </button>
      </div>
      <div className="space-y-5">
        <label className="block space-y-2">
          <span className="text-sm text-muted-foreground">Search</span>
          <input
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="min-h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
            placeholder="Search modules"
          />
        </label>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Subject</p>
          {subjects.map((subject) => {
            const checked = filters.subjects.includes(subject);
            return (
              <label key={subject} className="flex min-h-11 items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onChange({
                      ...filters,
                      subjects: checked ? filters.subjects.filter((s) => s !== subject) : [...filters.subjects, subject],
                    })
                  }
                />
                {subject}
              </label>
            );
          })}
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Difficulty</p>
          <div className="flex flex-wrap gap-2">
            {["All", "Beginner", "Intermediate", "Advanced"].map((value) => (
              <button
                key={value}
                type="button"
                className={`min-h-11 rounded-lg border px-3 text-sm ${filters.difficulty === value ? "border-primary bg-primary/10" : "border-border"}`}
                onClick={() => onChange({ ...filters, difficulty: value as Filters["difficulty"] })}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <label className="block space-y-2">
          <span className="text-sm text-muted-foreground">Length (max minutes): {filters.length}</span>
          <input type="range" min={10} max={60} value={filters.length} onChange={(e) => onChange({ ...filters, length: Number(e.target.value) })} className="h-2 w-full accent-primary" />
        </label>

        <label className="flex min-h-11 items-center gap-2 text-sm">
          <input type="checkbox" checked={filters.onlyReady} onChange={(e) => onChange({ ...filters, onlyReady: e.target.checked })} />
          Show only modules adapted for my profile
        </label>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Format</p>
          <div className="flex flex-wrap gap-2">
            {["All", "Text", "Video", "Interactive"].map((value) => (
              <button
                key={value}
                type="button"
                className={`min-h-11 rounded-lg border px-3 text-sm ${filters.format === value ? "border-primary bg-primary/10" : "border-border"}`}
                onClick={() => onChange({ ...filters, format: value as Filters["format"] })}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
