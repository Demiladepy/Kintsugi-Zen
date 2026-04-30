"use client";

import { useState } from "react";
import Link from "next/link";
import { AppreciateButton } from "@/components/reader/appreciate-button";
import { ContentRenderer } from "@/components/reader/content-renderer";
import { ReadingToolbar } from "@/components/reader/reading-toolbar";
import { TxLink } from "@/components/shared/tx-link";

const adaptedParagraphs = [
  "A digital system should help people understand, not only execute, information. Accessibility settings shape whether a learner can process material at all.",
  "When a platform applies your sensory profile automatically, you spend less effort decoding the interface and more effort learning the concept itself.",
  "Adaptive formatting can simplify language, increase spacing, and reduce distractions so comprehension happens faster and with less fatigue.",
];

type AdaptedPageProps = {
  params: { id: string };
};

export default function AdaptedPage({ params }: AdaptedPageProps) {
  const [scale, setScale] = useState(120);
  const [contrast, setContrast] = useState<"default" | "high">("default");
  const [motionReduced, setMotionReduced] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  return (
    <div data-contrast={contrast === "high" ? "high" : undefined} className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <section className="rounded-2xl border border-border bg-card p-6">
        <header className="mb-6 space-y-2">
          <p className="text-sm text-muted-foreground">
            <Link href={`/modules/${params.id}`} className="underline-offset-2 hover:underline">
              Default View
            </Link>{" "}
            / <span className="text-foreground">My Sensory View</span>
          </p>
          <h1 className="text-h1">Adapted learning view</h1>
          <p className="text-sm text-muted-foreground">
            Adapted at 11:08 AM · <TxLink signature="9aa4cf1de553ab7690f19ca4df8b22e8d112" />
          </p>
        </header>
        <ContentRenderer paragraphs={adaptedParagraphs} scale={scale} focusMode={focusMode} />
        <AppreciateButton />
      </section>
      <ReadingToolbar
        scale={scale}
        setScale={setScale}
        contrast={contrast}
        setContrast={setContrast}
        motionReduced={motionReduced}
        setMotionReduced={setMotionReduced}
        focusMode={focusMode}
        setFocusMode={setFocusMode}
      />
    </div>
  );
}
