"use client";

import { useParams } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { MatchCard } from "@/components/MatchCard";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { Search } from "lucide-react";
import { possibleMatches } from "@/lib/mock-data";
import { getSearchById, useApp } from "@/lib/store";

export default function PossibleMatchesPage() {
  const params = useParams<{ id: string }>();
  const { searches, matchStatuses } = useApp();
  const search = getSearchById(searches, params.id);
  const matches = possibleMatches.filter(
    (match) =>
      match.searchId === params.id && matchStatuses[match.id] !== "rejected",
  );

  return (
    <AppShell>
      <AppHeader backHref={`/searches/${params.id}`} title="Mogelijke matches" />
      <div className="px-5 pb-8">
        <h1 className="font-serif text-[30px] leading-tight">
          {search ? `Overlap bij ${search.eventName}` : "Mogelijke matches"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Geen foto’s, geen namen. Alleen signalen uit de ontmoeting.
        </p>

        {matches.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              icon={Search}
              title="Nog geen overlap"
              body="Zodra iemand een vergelijkbare herinnering deelt, verschijnt die hier."
            />
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                href={`/matches/${match.id}`}
              />
            ))}
          </div>
        )}

        <PrivacyNotice className="mt-6">
          Identiteiten blijven verborgen totdat jullie allebei aangeven dat
          jullie contact willen.
        </PrivacyNotice>
      </div>
    </AppShell>
  );
}
