"use client";

import type { ProfileForm } from "@/stores/preferences";

type LanguageStepProps = {
  preferences: ProfileForm;
  onChange: (patch: Partial<ProfileForm>) => void;
};

export function LanguageStep({ preferences, onChange }: LanguageStepProps) {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-h2">How should content be delivered?</h2>
      </header>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Reading complexity</p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["original", "Original"],
              ["simplified", "Simplified"],
              ["plain-language", "Plain language"],
              ["visual-first", "Visual-first"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`min-h-11 rounded-lg border px-3 text-sm ${preferences.readingComplexity === value ? "border-primary bg-primary/10" : "border-border"}`}
              onClick={() => onChange({ readingComplexity: value })}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Chunk length</p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["long", "Long paragraphs"],
              ["short", "Short paragraphs"],
              ["bullets", "Bullet points"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`min-h-11 rounded-lg border px-3 text-sm ${preferences.chunkLength === value ? "border-primary bg-primary/10" : "border-border"}`}
              onClick={() => onChange({ chunkLength: value })}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <label className="flex min-h-11 items-center gap-3 text-sm">
        <input type="checkbox" checked={preferences.audioSupport} onChange={(e) => onChange({ audioSupport: e.target.checked })} />
        Auto-generate audio versions
      </label>
      <label className="flex min-h-11 items-center gap-3 text-sm">
        <input type="checkbox" checked={preferences.visualAids} onChange={(e) => onChange({ visualAids: e.target.checked })} />
        Add diagrams where possible
      </label>
    </div>
  );
}
