"use client";

import { useMemo } from "react";
import type { ProfileForm } from "@/stores/preferences";
import { cn } from "@/utils/cn";

type LiveMockProps = {
  preferences: ProfileForm;
};

const baseText =
  "A compiler converts a source program into machine-level instructions while preserving semantic intent across optimization passes.";

export function LiveMock({ preferences }: LiveMockProps) {
  const formattedText = useMemo(() => {
    if (preferences.readingComplexity === "simplified") {
      return "A compiler turns source code into machine instructions while keeping the same meaning.";
    }
    if (preferences.readingComplexity === "plain-language") {
      return "A compiler reads your program and rewrites it into instructions the computer can run directly.";
    }
    if (preferences.readingComplexity === "visual-first") {
      return "Source code -> Compiler pipeline -> Optimizer -> Executable machine instructions.";
    }
    return baseText;
  }, [preferences.readingComplexity]);

  return (
    <aside className="sticky top-24 rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-2 text-lg font-semibold">This is how the platform will look for you</h3>
      <p className="mb-4 text-sm text-muted-foreground">Updates instantly as you adjust preferences.</p>
      <article
        className={cn(
          "rounded-xl border border-border p-4 transition",
          preferences.contrast !== "standard" && "border-primary/40",
          preferences.colorTheme === "pure-black" && "bg-black",
          preferences.colorTheme === "warm-sepia" && "bg-[#241d16]",
        )}
        style={{
          fontSize: `${preferences.fontScale}%`,
          letterSpacing: `${preferences.letterSpacing}em`,
          lineHeight: preferences.lineHeight,
        }}
      >
        <p className={cn("text-reading", preferences.cognitiveProfiles.includes("dyslexia") && "font-dyslexic")}>{formattedText}</p>
      </article>
    </aside>
  );
}
