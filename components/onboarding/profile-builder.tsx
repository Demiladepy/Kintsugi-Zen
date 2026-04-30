"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LanguageStep } from "@/components/onboarding/language-step";
import { LiveMock } from "@/components/onboarding/live-mock";
import { PreferenceStep } from "@/components/onboarding/preference-step";
import { SensoryStep } from "@/components/onboarding/sensory-step";
import { defaultPreferences, type ProfileForm, usePreferencesStore } from "@/stores/preferences";

const schema = z.object({
  cognitiveProfiles: z.array(z.string()),
  fontScale: z.number().min(100).max(180),
  contrast: z.enum(["standard", "high", "maximum"]),
  letterSpacing: z.number().min(0).max(0.1),
  lineHeight: z.number().min(1.4).max(2),
  reduceMotion: z.boolean(),
  colorTheme: z.enum(["default-dark", "warm-sepia", "pure-black"]),
  readingComplexity: z.enum(["original", "simplified", "plain-language", "visual-first"]),
  chunkLength: z.enum(["long", "short", "bullets"]),
  audioSupport: z.boolean(),
  visualAids: z.boolean(),
});

export function ProfileBuilder() {
  const router = useRouter();
  const { currentPreferences, step, setStep, update } = usePreferencesStore();

  const form = useForm<ProfileForm>({
    resolver: zodResolver(schema),
    defaultValues: currentPreferences ?? defaultPreferences,
  });

  useEffect(() => {
    form.reset(currentPreferences);
  }, [currentPreferences, form]);

  const values = form.watch();

  const patchValues = (patch: Partial<ProfileForm>) => {
    const next = { ...values, ...patch };
    Object.entries(patch).forEach(([key, value]) => {
      form.setValue(key as keyof ProfileForm, value as never, { shouldDirty: true });
    });
    update(next);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-2xl border border-border bg-card p-6">
        <p className="mb-4 text-sm text-muted-foreground">Step {step} of 3</p>
        {step === 1 && <PreferenceStep preferences={values} onChange={patchValues} />}
        {step === 2 && <SensoryStep preferences={values} onChange={patchValues} />}
        {step === 3 && <LanguageStep preferences={values} onChange={patchValues} />}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep(Math.max(1, step - 1) as 1 | 2 | 3)}
            className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm"
          >
            Back
          </button>
          <div className="flex items-center gap-3">
            <Link href="/library" className="text-sm text-muted-foreground">
              Use defaults for now
            </Link>
            {step < 3 ? (
              <button
                type="button"
                className="min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                onClick={() => setStep((step + 1) as 1 | 2 | 3)}
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                className="min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                onClick={() => router.push("/onboarding/mint")}
              >
                Mint My Sensory Passport
              </button>
            )}
          </div>
        </div>
      </section>
      <LiveMock preferences={values} />
    </div>
  );
}
