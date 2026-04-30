"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

type ContentRendererProps = {
  paragraphs: string[];
  scale: number;
  focusMode: boolean;
};

export function ContentRenderer({ paragraphs, scale, focusMode }: ContentRendererProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const refs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (!focusMode) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const index = Number(visible[0]?.target.getAttribute("data-index"));
        if (!Number.isNaN(index)) setActiveIndex(index);
      },
      { threshold: [0.2, 0.6, 0.9] },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [focusMode]);

  return (
    <article className="prose prose-invert max-w-none" style={{ ["--reading-scale" as string]: String(scale / 100) }}>
      {paragraphs.map((p, index) => (
        <p
          key={p.slice(0, 24)}
          ref={(el) => {
            refs.current[index] = el;
          }}
          data-index={index}
          className={cn("transition-opacity duration-200", focusMode && index !== activeIndex && "opacity-30")}
        >
          {p}
        </p>
      ))}
    </article>
  );
}
