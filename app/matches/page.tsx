"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { Avatar } from "@/components/Avatar";
import { EmptyState } from "@/components/EmptyState";
import { possibleMatches } from "@/lib/mock-data";
import { getConversationId, useApp } from "@/lib/store";

export default function MatchesPage() {
  const { matchStatuses } = useApp();
  const incoming = possibleMatches.filter(
    (match) => matchStatuses[match.id] === "incoming",
  );
  const pending = possibleMatches.filter(
    (match) => matchStatuses[match.id] === "sent",
  );
  const mutual = possibleMatches.filter(
    (match) => matchStatuses[match.id] === "mutual",
  );
  const isEmpty = incoming.length + pending.length + mutual.length === 0;

  return (
    <AppShell>
      <AppHeader title="Matches" />
      <div className="px-5 pb-8">
        <p className="mb-6 text-sm leading-relaxed text-muted">
          Hier zie je alleen overlap in ontmoetingen. Namen verschijnen pas na
          wederzijdse toestemming.
        </p>

        {isEmpty ? (
          <EmptyState
            icon={Users}
            title="Nog geen matches"
            body="Als iemand dezelfde herinnering deelt, of jij een verzoek stuurt, verschijnt dat hier."
          />
        ) : null}

        {incoming.length > 0 ? (
          <section className="mb-8">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Binnenkomend
            </h2>
            <div className="space-y-3">
              {incoming.map((match) => (
                <Link
                  key={match.id}
                  href={`/incoming/${match.id}`}
                  className="block rounded-2xl border border-line bg-paper p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    Nieuw verzoek
                  </p>
                  <p className="mt-2 font-serif text-2xl leading-tight">
                    Iemand denkt dat jullie elkaar hebben ontmoet
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {match.yourEncounter.eventName} · {match.yourEncounter.dateLabel}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {pending.length > 0 ? (
          <section className="mb-8">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Wachtend
            </h2>
            <div className="space-y-3">
              {pending.map((match) => (
                <Link
                  key={match.id}
                  href={`/matches/${match.id}/sent`}
                  className="block rounded-2xl border border-line bg-paper p-4"
                >
                  <p className="font-medium">Matchverzoek verstuurd</p>
                  <p className="mt-1 text-sm text-muted">
                    {match.yourEncounter.eventName} · {match.score}% overlap
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {mutual.length > 0 ? (
          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Gevonden
            </h2>
            <div className="space-y-3">
              {mutual.map((match) => {
                const conversationId =
                  getConversationId(match.id) ?? match.id;
                return (
                  <Link
                    key={match.id}
                    href={`/messages/${conversationId}`}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-paper p-4"
                  >
                    <Avatar
                      seed={match.revealedIdentity.avatarSeed}
                      name={match.revealedIdentity.firstName}
                    />
                    <div>
                      <p className="font-serif text-xl leading-none">
                        {match.revealedIdentity.firstName}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {match.yourEncounter.eventName}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </AppShell>
  );
}
