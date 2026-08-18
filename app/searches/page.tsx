"use client";

import { Search } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SearchCard } from "@/components/SearchCard";
import { useApp } from "@/lib/store";

export default function SearchesPage() {
  const { searches } = useApp();

  return (
    <AppShell>
      <AppHeader title="Zoekopdrachten" />
      <div className="px-5 pb-8">
        <p className="mb-5 text-sm leading-relaxed text-muted">
          Elke zoekopdracht beschrijft een ontmoeting. Anderen zien nooit je
          profiel, alleen of hun herinnering overlap heeft.
        </p>
        {searches.length === 0 ? (
          <EmptyState
            icon={Search}
            title="Nog geen zoekopdrachten"
            body="Begin met een plek, een moment en wat je nog weet. Meer is niet nodig."
            action={
              <PrimaryButton href="/searches/new" fullWidth={false} className="px-6">
                Iemand zoeken
              </PrimaryButton>
            }
          />
        ) : (
          <div className="space-y-4">
            {searches.map((search) => (
              <SearchCard
                key={search.id}
                search={search}
                href={`/searches/${search.id}`}
                showActions={false}
              />
            ))}
          </div>
        )}
        {searches.length > 0 ? (
          <div className="mt-6">
            <PrimaryButton href="/searches/new">Nieuwe zoekopdracht</PrimaryButton>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
