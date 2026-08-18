import { cn } from "@/lib/format";

export function ProgressIndicator({
  step,
  total,
  label,
}: {
  step: number;
  total: number;
  label?: string;
}) {
  const progress = Math.min(step / total, 1);

  return (
    <div className="px-1">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          Stap {step} van {total}
        </span>
        {label ? <span>{label}</span> : null}
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="mt-3 flex gap-1.5">
        {Array.from({ length: total }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              index < step ? "bg-accent" : "bg-line",
            )}
          />
        ))}
      </div>
    </div>
  );
}
