"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/utils/cn";

type Preset = "default" | "dyslexia" | "low-vision" | "adhd-focus" | "simplified";

const denseText =
  "The central process by which a digital computer executes a stored program consists of fetching an instruction from memory, decoding its operation and operands, and then carrying out the specified transformation upon data represented in finite binary form.";

const simplifiedText =
  "A computer runs a program in repeated steps. It reads one instruction, understands what to do, and then changes data. All data and instructions are stored as binary values.";

const presets: Record<
  Preset,
  {
    label: string;
    caption: string;
    text: string;
    className: string;
  }
> = {
  default: {
    label: "Default",
    caption: "Original academic formatting with dense vocabulary and tighter rhythm.",
    text: denseText,
    className: "font-reading text-reading leading-8 tracking-normal",
  },
  dyslexia: {
    label: "Dyslexia",
    caption: "OpenDyslexic + extra spacing improve letter discrimination and scan comfort.",
    text: denseText,
    className: "font-dyslexic text-reading leading-9 tracking-[0.03em]",
  },
  "low-vision": {
    label: "Low Vision",
    caption: "Higher contrast and larger type increase readability under visual strain.",
    text: denseText,
    className: "font-reading text-[1.35rem] leading-10 tracking-[0.01em] text-white",
  },
  "adhd-focus": {
    label: "ADHD Focus",
    caption: "Chunked lines and calmer spacing reduce cognitive load and context switching.",
    text: denseText
      .replace("consists of fetching an instruction from memory, decoding its operation and operands,", "consists of:")
      .replace("and then carrying out the specified transformation upon data represented in finite binary form.", "1) fetch instruction from memory; 2) decode operation + operands; 3) execute transformation on binary data."),
    className: "font-reading text-reading leading-9 tracking-[0.015em]",
  },
  simplified: {
    label: "Simplified",
    caption: "Vocabulary and sentence structure are rewritten for faster comprehension.",
    text: simplifiedText,
    className: "font-reading text-reading leading-8 tracking-[0.01em]",
  },
};

export function LivePreview() {
  const [preset, setPreset] = useState<Preset>("default");
  const reducedMotion = useReducedMotion();
  const current = useMemo(() => presets[preset], [preset]);

  return (
    <section className="space-y-4 rounded-2xl border border-border bg-card/80 p-4 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(presets) as Preset[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setPreset(key)}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm transition",
              key === preset ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={key === preset}
          >
            {presets[key].label}
          </button>
        ))}
      </div>

      <motion.article
        layout={!reducedMotion}
        transition={{ duration: reducedMotion ? 0 : 0.35 }}
        className={cn(
          "rounded-xl border border-border bg-background/70 p-5",
          preset === "low-vision" && "border-primary/60 bg-black",
        )}
      >
        <motion.p
          key={preset}
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.28 }}
          className={cn("max-w-[58ch]", current.className)}
        >
          {current.text}
        </motion.p>
      </motion.article>

      <p className="text-sm text-muted-foreground">{current.caption}</p>
      <p className="text-sm font-medium text-primary">&#8592; This is what an on-chain Sensory Passport does</p>
    </section>
  );
}
