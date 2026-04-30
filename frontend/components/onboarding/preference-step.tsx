"use client";

import { Slider } from "@/components/onboarding/slider";
import type { ProfileForm } from "@/stores/preferences";

type PreferenceStepProps = {
  preferences: ProfileForm;
  onChange: (patch: Partial<ProfileForm>) => void;
};

export function PreferenceStep({ preferences, onChange }: PreferenceStepProps) {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-h2">How does your brain learn best?</h2>
        <p className="text-sm text-muted-foreground">Pick all that apply. You can change this anytime.</p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["dyslexia", "Dyslexia"],
          ["adhd", "ADHD / Focus differences"],
          ["autism", "Autism spectrum"],
          ["dyscalculia", "Dyscalculia"],
          ["low-vision", "Low vision"],
          ["auditory", "Auditory preference"],
          ["none", "None / Just exploring"],
        ].map(([value, label]) => {
          const selected = preferences.cognitiveProfiles.includes(value);
          return (
            <button
              key={value}
              type="button"
              onClick={() => {
                const next = selected
                  ? preferences.cognitiveProfiles.filter((p) => p !== value)
                  : [...preferences.cognitiveProfiles, value];
                onChange({ cognitiveProfiles: next });
              }}
              className={`min-h-11 rounded-xl border p-4 text-left ${selected ? "border-primary bg-primary/10" : "border-border bg-card"}`}
            >
              <p className="font-medium">{label}</p>
            </button>
          );
        })}
      </div>
      <Slider label="Preview font size baseline" min={100} max={180} value={preferences.fontScale} onValue={(value) => onChange({ fontScale: value })} />
    </div>
  );
}
