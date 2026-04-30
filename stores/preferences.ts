"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ContrastMode = "standard" | "high" | "maximum";
export type ReadingComplexity = "original" | "simplified" | "plain-language" | "visual-first";
export type ChunkLength = "long" | "short" | "bullets";

export type ProfileForm = {
  cognitiveProfiles: string[];
  fontScale: number;
  contrast: ContrastMode;
  letterSpacing: number;
  lineHeight: number;
  reduceMotion: boolean;
  colorTheme: "default-dark" | "warm-sepia" | "pure-black";
  readingComplexity: ReadingComplexity;
  chunkLength: ChunkLength;
  audioSupport: boolean;
  visualAids: boolean;
};

type PreferencesState = {
  step: 1 | 2 | 3;
  currentPreferences: ProfileForm;
  chainPreferences: ProfileForm | null;
  isDirty: boolean;
  setStep: (step: 1 | 2 | 3) => void;
  update: (patch: Partial<ProfileForm>) => void;
  syncFromChain: (prefs: ProfileForm) => void;
  reset: () => void;
};

export const defaultPreferences: ProfileForm = {
  cognitiveProfiles: [],
  fontScale: 100,
  contrast: "standard",
  letterSpacing: 0,
  lineHeight: 1.6,
  reduceMotion: false,
  colorTheme: "default-dark",
  readingComplexity: "original",
  chunkLength: "long",
  audioSupport: false,
  visualAids: false,
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set, get) => ({
      step: 1,
      currentPreferences: defaultPreferences,
      chainPreferences: null,
      isDirty: false,
      setStep: (step) => set({ step }),
      update: (patch) =>
        set((state) => {
          const next = { ...state.currentPreferences, ...patch };
          const chain = state.chainPreferences ?? defaultPreferences;
          return {
            currentPreferences: next,
            isDirty: JSON.stringify(next) !== JSON.stringify(chain),
          };
        }),
      syncFromChain: (prefs) =>
        set({
          chainPreferences: prefs,
          currentPreferences: prefs,
          isDirty: false,
        }),
      reset: () =>
        set({
          step: 1,
          currentPreferences: defaultPreferences,
          chainPreferences: null,
          isDirty: false,
        }),
    }),
    {
      name: "sensory-preferences",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        step: state.step,
        currentPreferences: state.currentPreferences,
      }),
    },
  ),
);
