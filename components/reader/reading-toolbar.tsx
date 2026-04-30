"use client";

type ReadingToolbarProps = {
  scale: number;
  setScale: (value: number) => void;
  contrast: "default" | "high";
  setContrast: (value: "default" | "high") => void;
  motionReduced: boolean;
  setMotionReduced: (value: boolean) => void;
  focusMode: boolean;
  setFocusMode: (value: boolean) => void;
};

export function ReadingToolbar({ scale, setScale, contrast, setContrast, motionReduced, setMotionReduced, focusMode, setFocusMode }: ReadingToolbarProps) {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance("Reading mode is active. Your adapted content is ready.");
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <aside className="sticky top-24 h-fit w-full max-w-xs rounded-2xl border border-border bg-card p-4">
      <h3 className="mb-4 font-semibold">Reading tools</h3>
      <div className="space-y-4 text-sm">
        <div className="space-y-2">
          <p className="text-muted-foreground">Font size</p>
          <div className="flex items-center gap-2">
            <button type="button" className="min-h-11 rounded border border-border px-3" onClick={() => setScale(Math.max(100, scale - 10))}>A-</button>
            <span className="w-14 text-center">{scale}%</span>
            <button type="button" className="min-h-11 rounded border border-border px-3" onClick={() => setScale(Math.min(180, scale + 10))}>A+</button>
          </div>
        </div>
        <button type="button" className="min-h-11 w-full rounded border border-border px-3 text-left" onClick={() => setContrast(contrast === "default" ? "high" : "default")}>
          Contrast: {contrast}
        </button>
        <label className="flex min-h-11 items-center gap-2">
          <input type="checkbox" checked={motionReduced} onChange={(e) => setMotionReduced(e.target.checked)} />
          Reduce motion
        </label>
        <button type="button" className="min-h-11 w-full rounded border border-border px-3 text-left" onClick={speak}>
          Read aloud
        </button>
        <label className="flex min-h-11 items-center gap-2">
          <input type="checkbox" checked={focusMode} onChange={(e) => setFocusMode(e.target.checked)} />
          Focus mode
        </label>
        <button type="button" className="min-h-11 w-full rounded bg-primary px-3 font-semibold text-primary-foreground">
          Save to my Passport
        </button>
      </div>
    </aside>
  );
}
