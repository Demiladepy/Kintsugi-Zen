"use client";

import { Slider } from "@/components/onboarding/slider";
import type { ProfileForm } from "@/stores/preferences";

type SensoryStepProps = {
  preferences: ProfileForm;
  onChange: (patch: Partial<ProfileForm>) => void;
};

export function SensoryStep({ preferences, onChange }: SensoryStepProps) {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-h2">Tune your visual environment</h2>
      </header>
      <Slider label="Font size %" min={100} max={180} value={preferences.fontScale} onValue={(fontScale) => onChange({ fontScale })} />
      <Slider
        label="Letter spacing"
        min={0}
        max={0.1}
        step={0.01}
        value={preferences.letterSpacing}
        onValue={(letterSpacing) => onChange({ letterSpacing })}
      />
      <Slider label="Line height" min={1.4} max={2} step={0.05} value={preferences.lineHeight} onValue={(lineHeight) => onChange({ lineHeight })} />
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Contrast level</p>
        <div className="flex gap-2">
          {(["standard", "high", "maximum"] as const).map((contrast) => (
            <button
              key={contrast}
              type="button"
              className={`min-h-11 rounded-lg border px-3 text-sm ${preferences.contrast === contrast ? "border-primary bg-primary/10" : "border-border"}`}
              onClick={() => onChange({ contrast })}
            >
              {contrast}
            </button>
          ))}
        </div>
      </div>
      <label className="flex min-h-11 items-center gap-3 text-sm">
        <input type="checkbox" checked={preferences.reduceMotion} onChange={(e) => onChange({ reduceMotion: e.target.checked })} />
        Reduce animations
      </label>
    </div>
  );
}
