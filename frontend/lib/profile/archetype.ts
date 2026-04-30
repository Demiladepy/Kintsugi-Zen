import type { z } from "zod";
import type { preferencesSchema } from "@/lib/contracts/profile";

type Preferences = z.infer<typeof preferencesSchema>;

export function determineArchetype(preferences: Preferences) {
  if (preferences.cognitive.includes("dyslexia")) return 1;
  if (preferences.cognitive.includes("adhd")) return 2;
  if (preferences.sensory.contrast === "maximum") return 3;
  if (preferences.language.complexity === "visual-first") return 4;
  if (preferences.language.audioSupport) return 5;
  return 0;
}
