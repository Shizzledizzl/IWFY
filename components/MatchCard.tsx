import Link from "next/link";
import type { PossibleMatch } from "@/lib/types";
import { cn } from "@/lib/format";

type MatchCardProps = {
  match: PossibleMatch;
  href: string;
};

export function MatchCard({ match, href }: MatchCardProps) {
  const high = match.score >= 85;

  return (
    <Link href={href} className="block">
      <article className="rounded-2xl border border-line bg-paper p-5 shadow-[0_12px_30px_-24px_rgba(36,28,22,0.5)] transition hover:border-accent/25">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              {high ? "Sterke overlap" : "Mogelijke overlap"}
            </p>
            <h3 className="mt-2 font-serif text-[22px] leading-tight">
              {match.strengthLabel}
            </h3>
          </div>
          <ScoreMark score={match.score} />
        </div>

        <ul className="mt-4 space-y-1.5">
          {match.signals.slice(0, 4).map((signal) => (
            <li key={signal} className="flex items-start gap-2 text-sm text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
              {signal}
            </li>
          ))}
        </ul>

        <p className="mt-5 text-sm font-semibold text-accent">Bekijk overeenkomst</p>
      </article>
    </Link>
  );
}

export function ScoreMark({ score, size = "md" }: { score: number; size?: "md" | "lg" }) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col items-center justify-center rounded-full border border-line bg-cream text-ink",
        size === "lg" ? "h-[88px] w-[88px]" : "h-16 w-16",
      )}
    >
      <span className={cn("font-serif leading-none", size === "lg" ? "text-[28px]" : "text-[22px]")}>
        {score}
      </span>
      <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
        overlap
      </span>
    </div>
  );
}
