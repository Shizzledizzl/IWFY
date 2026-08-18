"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { ScoreMark } from "@/components/MatchCard";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { getMatchById, useApp } from "@/lib/store";

export default function IncomingRequestPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { matchStatuses, setMatchStatus } = useApp();
  const match = getMatchById(params.id);
  const status = matchStatuses[params.id];

  useEffect(() => {
    if (match && status === "mutual") {
      router.replace(`/found/${match.id}`);
    }
  }, [match, status, router]);

  if (!match) {
    return (
      <AppShell>
        <AppHeader backHref="/matches" title="Verzoek" />
        <p className="px-5 text-muted">Dit verzoek is niet meer beschikbaar.</p>
      </AppShell>
    );
  }

  if (status === "mutual") {
    return (
      <AppShell>
        <div className="flex min-h-[50dvh] items-center justify-center">
          <p className="font-serif text-2xl text-muted">IWFY</p>
        </div>
      </AppShell>
    );
  }

  function accept() {
    setMatchStatus(match!.id, "mutual");
    router.push(`/found/${match!.id}`);
  }

  function reject() {
    setMatchStatus(match!.id, "rejected");
    router.push("/matches");
  }

  return (
    <AppShell withNav={false}>
      <AppHeader backHref="/matches" title="Binnenkomend verzoek" />
      <div className="px-5 pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Iemand herkent het moment
        </p>
        <h1 className="mt-3 font-serif text-[32px] leading-tight">
          Iemand denkt dat jullie elkaar hebben ontmoet
        </h1>
        <p className="mt-3 text-muted">
          {match.yourEncounter.eventName} · 28 juni 2026
        </p>

        <div className="mt-6 flex items-center justify-between rounded-2xl border border-line bg-paper p-4">
          <div>
            <p className="text-sm text-muted">Overeenkomst in signalen</p>
            <p className="mt-1 font-serif text-2xl">{match.strengthLabel}</p>
          </div>
          <ScoreMark score={match.score} />
        </div>

        <ul className="mt-5 space-y-2">
          {match.signals.map((signal) => (
            <li
              key={signal}
              className="rounded-xl bg-paper px-4 py-3 text-sm leading-relaxed"
            >
              {signal}
            </li>
          ))}
        </ul>

        <PrivacyNotice className="mt-6">
          Je ziet nog geen naam of foto. Alleen als jij ook ja zegt, wordt
          contact mogelijk.
        </PrivacyNotice>

        <div className="mt-8 space-y-3">
          <PrimaryButton onClick={accept}>Dit zou kunnen kloppen</PrimaryButton>
          <SecondaryButton onClick={reject}>Nee, dit is niet diegene</SecondaryButton>
        </div>
      </div>
    </AppShell>
  );
}
