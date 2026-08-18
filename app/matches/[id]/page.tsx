"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Flag } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { ScoreMark } from "@/components/MatchCard";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { getMatchById, useApp } from "@/lib/store";

export default function MatchDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { matchStatuses, setMatchStatus, blockUser } = useApp();
  const match = getMatchById(params.id);
  const status = matchStatuses[params.id] ?? "none";

  useEffect(() => {
    if (!match) return;
    if (status === "mutual") router.replace(`/found/${match.id}`);
    if (status === "sent") router.replace(`/matches/${match.id}/sent`);
  }, [match, status, router]);

  if (!match) {
    return (
      <AppShell>
        <AppHeader backHref="/matches" title="Match" />
        <p className="px-5 text-muted">Deze overeenkomst is niet beschikbaar.</p>
      </AppShell>
    );
  }

  if (status === "mutual" || status === "sent") {
    return (
      <AppShell>
        <div className="flex min-h-[50dvh] items-center justify-center">
          <p className="font-serif text-2xl text-muted">IWFY</p>
        </div>
      </AppShell>
    );
  }

  function accept() {
    if (status === "incoming") {
      setMatchStatus(match!.id, "mutual");
      router.push(`/found/${match!.id}`);
      return;
    }
    setMatchStatus(match!.id, "sent");
    router.push(`/matches/${match!.id}/sent`);
  }

  function reject() {
    setMatchStatus(match!.id, "rejected");
    router.push(`/searches/${match!.searchId}/matches`);
  }

  return (
    <AppShell withNav={false}>
      <AppHeader backHref={`/searches/${match.searchId}/matches`} title="Overeenkomst" />
      <div className="px-5 pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Anonieme overlap
        </p>
        <div className="mt-3 flex items-start justify-between gap-4">
          <h1 className="font-serif text-[30px] leading-tight">
            Dit lijkt een sterke match
          </h1>
          <ScoreMark score={match.score} size="lg" />
        </div>

        {status === "incoming" ? (
          <p className="mt-4 rounded-2xl bg-sage-soft px-4 py-3 text-sm text-sage">
            Deze persoon denkt ook dat jullie elkaar hebben ontmoet.
          </p>
        ) : null}

        <div className="mt-6 grid gap-3">
          <EncounterBlock title="Jouw ontmoeting" encounter={match.yourEncounter} />
          <EncounterBlock title="Hun ontmoeting" encounter={match.theirEncounter} />
        </div>

        <p className="mt-6 text-[15px] leading-relaxed">{match.memoryOverlapNote}</p>

        <PrivacyNotice className="mt-6">
          Jullie identiteit blijft verborgen totdat jullie allebei aangeven dat
          jullie contact willen.
        </PrivacyNotice>

        <div className="mt-8 space-y-3">
          <PrimaryButton onClick={accept}>Misschien is dit diegene</PrimaryButton>
          <SecondaryButton onClick={reject}>Niet mijn match</SecondaryButton>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 pt-1 text-sm text-muted"
            onClick={() => {
              blockUser("Anonieme overlap");
              reject();
            }}
          >
            <Flag size={14} />
            Rapporteren en afwijzen
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function EncounterBlock({
  title,
  encounter,
}: {
  title: string;
  encounter: {
    eventName: string;
    dateLabel: string;
    time: string;
    area: string;
  };
}) {
  return (
    <section className="rounded-2xl border border-line bg-paper p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {title}
      </p>
      <p className="mt-2 font-serif text-2xl leading-none">{encounter.eventName}</p>
      <p className="mt-2 text-sm text-muted">
        {encounter.dateLabel}
        <span className="mx-1.5">·</span>
        {encounter.time}
      </p>
      <p className="mt-1 text-sm">{encounter.area}</p>
    </section>
  );
}
