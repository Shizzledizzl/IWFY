"use client";

import { useParams, useRouter } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { encounterTypeLabels, formatDutchDate } from "@/lib/format";
import { getSearchById, useApp } from "@/lib/store";

export default function SearchDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { searches } = useApp();
  const search = getSearchById(searches, params.id);

  if (!search) {
    return (
      <AppShell>
        <AppHeader backHref="/searches" title="Zoekopdracht" />
        <p className="px-5 text-muted">Deze zoekopdracht bestaat niet meer.</p>
      </AppShell>
    );
  }

  const matchCount = search.possibleMatchIds.length;

  return (
    <AppShell>
      <AppHeader backHref="/searches" title="Zoekopdracht" />
      <div className="px-5 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          {encounterTypeLabels[search.type]}
        </p>
        <h1 className="mt-2 font-serif text-[34px] leading-none">{search.eventName}</h1>
        <p className="mt-3 text-muted">
          {formatDutchDate(search.date)}
          <span className="mx-1.5">·</span>
          {search.place}
        </p>

        <dl className="mt-6 space-y-3 rounded-2xl border border-line bg-paper p-5 text-sm">
          <div>
            <dt className="text-muted">Ongeveer hoe laat</dt>
            <dd className="mt-1 font-medium">{search.approximateTime}</dd>
          </div>
          <div>
            <dt className="text-muted">Gedeelte van de plek</dt>
            <dd className="mt-1 font-medium">{search.area}</dd>
          </div>
        </dl>

        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
            Jouw herinnering
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed">{search.memory}</p>
        </section>

        <PrivacyNotice className="mt-6">
          Deze beschrijving is niet openbaar. Anderen zien nooit je hele verhaal,
          alleen of hun ontmoeting overlap heeft.
        </PrivacyNotice>

        <div className="mt-8 space-y-3">
          {matchCount > 0 ? (
            <PrimaryButton href={`/searches/${search.id}/matches`}>
              Bekijk {matchCount} mogelijke matches
            </PrimaryButton>
          ) : (
            <p className="rounded-2xl bg-paper px-4 py-3 text-sm text-muted">
              Nog geen overlap gevonden. We blijven kijken.
            </p>
          )}
          <SecondaryButton onClick={() => router.push("/searches")}>
            Terug naar overzicht
          </SecondaryButton>
        </div>
      </div>
    </AppShell>
  );
}
