"use client";

import { useParams, useRouter } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { Avatar } from "@/components/Avatar";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";
import { getConversationId, getMatchById, useApp } from "@/lib/store";

export default function FoundPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { matchStatuses } = useApp();
  const match = getMatchById(params.id);
  const conversationId = match ? getConversationId(match.id) : undefined;

  if (!match || matchStatuses[match.id] !== "mutual") {
    return (
      <AppShell>
        <AppHeader backHref="/matches" />
        <p className="px-5 text-muted">Deze match is nog niet wederzijds.</p>
      </AppShell>
    );
  }

  const chatHref = conversationId
    ? `/messages/${conversationId}`
    : `/messages/${match.id}`;

  return (
    <AppShell withNav={false}>
      <AppHeader onBack={() => router.push("/matches")} />
      <div className="flex min-h-[78dvh] flex-col items-center px-6 pb-8 pt-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Wederzijdse match
        </p>
        <h1 className="mt-4 max-w-[12ch] font-serif text-[38px] leading-tight">
          Jullie hebben elkaar gevonden.
        </h1>
        <div className="mt-10">
          <Avatar
            seed={match.revealedIdentity.avatarSeed}
            name={match.revealedIdentity.firstName}
            size="lg"
          />
        </div>
        <p className="mt-5 font-serif text-3xl">{match.revealedIdentity.firstName}</p>
        <p className="mt-2 text-sm text-muted">
          {match.yourEncounter.eventName} · {match.yourEncounter.dateLabel}
        </p>
        <p className="mt-6 max-w-[32ch] text-sm leading-relaxed text-muted">
          Vanaf nu kun je een privébericht sturen. Je kunt het gesprek altijd
          later voortzetten.
        </p>
        <div className="mt-auto w-full space-y-3 pt-10">
          <PrimaryButton href={chatHref}>Stuur een bericht</PrimaryButton>
          <SecondaryButton href="/home">Later</SecondaryButton>
        </div>
      </div>
    </AppShell>
  );
}
