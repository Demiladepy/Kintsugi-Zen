"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/utils/cn";

type Preset = "default" | "dyslexia" | "low-vision" | "adhd-focus" | "simplified";

const denseText =
  "A programmable computer executes instructions in a repeating cycle. It fetches an instruction from memory, decodes the operation and its inputs, and then updates binary data to produce the required result.";

const simplifiedText =
  "Computers work in small repeated steps. They pick an instruction, figure out what it means, then change data based on that instruction. Instructions and data are stored as binary values.";

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
    caption: "Original writing style with denser wording and standard spacing.",
    text: denseText,
    className: "font-reading text-reading leading-8 tracking-normal",
  },
  dyslexia: {
    label: "Dyslexia",
    caption: "Dyslexia-friendly font and spacing improve letter separation and scan flow.",
    text: denseText,
    className: "font-dyslexic text-reading leading-9 tracking-[0.03em]",
  },
  "low-vision": {
    label: "Low Vision",
    caption: "Larger text and stronger contrast make reading easier under visual strain.",
    text: denseText,
    className: "font-reading text-[1.35rem] leading-10 tracking-[0.01em] text-black",
  },
  "adhd-focus": {
    label: "ADHD Focus",
    caption: "Chunked structure and calmer spacing reduce cognitive load.",
    text: denseText
      .replace("consists of fetching an instruction from memory, decoding its operation and operands,", "consists of:")
      .replace("and then carrying out the specified transformation upon data represented in finite binary form.", "1) fetch instruction from memory; 2) decode operation + operands; 3) execute transformation on binary data."),
    className: "font-reading text-reading leading-9 tracking-[0.015em]",
  },
  simplified: {
    label: "Simplified",
    caption: "Complex words are replaced with plain language for faster understanding.",
    text: simplifiedText,
    className: "font-reading text-reading leading-8 tracking-[0.01em]",
  },
};

export function LivePreview() {
  const [preset, setPreset] = useState<Preset>("default");
  const reducedMotion = useReducedMotion();
  const current = useMemo(() => presets[preset], [preset]);

  return (
    <section className="space-y-4 rounded-2xl border border-border bg-gradient-to-b from-white to-[hsl(210_20%_98%)] p-4 shadow-[0_20px_60px_-35px_hsl(220_30%_15%/0.2)] sm:p-6">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(presets) as Preset[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setPreset(key)}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm transition",
              key === preset
                ? "border-primary/70 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
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
          "rounded-xl border border-border bg-white p-5 shadow-inner shadow-black/5",
          preset === "low-vision" && "border-primary/60 bg-white",
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
      <p className="text-sm font-medium text-primary">&#8592; This is how your saved reading profile changes content instantly</p>
    </section>
  );
}
