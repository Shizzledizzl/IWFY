"use client";

import { useParams } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { getMatchById } from "@/lib/store";

export default function MatchRequestSentPage() {
  const params = useParams<{ id: string }>();
  const match = getMatchById(params.id);

  return (
    <AppShell withNav={false}>
      <AppHeader backHref="/matches" />
      <div className="flex min-h-[78dvh] flex-col justify-between px-6 pb-8 pt-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Wachten op de ander
          </p>
          <h1 className="mt-4 font-serif text-[36px] leading-tight">
            Matchverzoek verstuurd
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            De andere persoon kan nu bekijken of jullie ontmoeting overeenkomt.
            Pas wanneer jullie allebei akkoord gaan, wordt contact mogelijk.
          </p>
          {match ? (
            <p className="mt-6 rounded-2xl bg-paper px-4 py-3 text-sm text-muted">
              {match.yourEncounter.eventName} · {match.yourEncounter.dateLabel}
            </p>
          ) : null}
          <PrivacyNotice className="mt-6">
            Er is nog geen chat, geen naam en geen foto. Dat komt pas bij een
            wederzijdse match.
          </PrivacyNotice>
        </div>
        <div className="space-y-3">
          <PrimaryButton href="/matches">Naar matches</PrimaryButton>
          <SecondaryButton href="/home">Terug naar home</SecondaryButton>
        </div>
      </div>
    </AppShell>
  );
}
