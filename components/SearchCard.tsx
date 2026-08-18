import Link from "next/link";
import type { Search } from "@/lib/types";
import { formatDutchDate } from "@/lib/format";
import { PrimaryButton, SecondaryButton } from "./PrimaryButton";

type SearchCardProps = {
  search: Search;
  href?: string;
  showActions?: boolean;
};

export function SearchCard({ search, href, showActions = true }: SearchCardProps) {
  const matchCount = search.possibleMatchIds.length;
  const content = (
    <article className="rounded-2xl border border-line bg-paper p-5 shadow-[0_12px_30px_-24px_rgba(36,28,22,0.5)]">
      <h3 className="font-serif text-[26px] leading-none tracking-tight">
        {search.eventName}
      </h3>
      <p className="mt-2 text-sm text-muted">{formatDutchDate(search.date)}</p>
      <p className="mt-0.5 text-sm text-muted">{search.place}</p>

      <p className="mt-5 text-sm font-medium">
        {matchCount > 0 ? (
          <>
            <span className="text-accent">{matchCount}</span> mogelijke{" "}
            {matchCount === 1 ? "match" : "matches"}
          </>
        ) : (
          <span className="text-muted">Nog geen matches</span>
        )}
      </p>

      {showActions ? (
        <div className="mt-4">
          {matchCount > 0 ? (
            <PrimaryButton href={`/searches/${search.id}/matches`} fullWidth>
              Bekijk matches
            </PrimaryButton>
          ) : (
            <SecondaryButton href={`/searches/${search.id}`} fullWidth>
              Bekijk zoekopdracht
            </SecondaryButton>
          )}
        </div>
      ) : null}
    </article>
  );

  if (href && !showActions) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
