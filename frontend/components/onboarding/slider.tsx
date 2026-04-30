"use client";

type SliderProps = {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onValue: (value: number) => void;
};

export function Slider({ label, min, max, step = 1, value, onValue }: SliderProps) {
  return (
    <label className="block space-y-2">
      <span className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{label}</span>
        <span>{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onValue(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
      />
    </label>
  );
}
