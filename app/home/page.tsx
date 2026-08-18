"use client";

import { useSyncExternalStore } from "react";
import { Plus } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SearchCard } from "@/components/SearchCard";
import { greetingForHour } from "@/lib/format";
import { useApp } from "@/lib/store";

function subscribe() {
  return () => {};
}

export default function HomePage() {
  const { user, searches } = useApp();
  const greeting = useSyncExternalStore(
    subscribe,
    () => greetingForHour(new Date().getHours()),
    () => "Hallo",
  );

  return (
    <AppShell>
      <AppHeader />
      <div className="px-5 pb-8">
        <section className="pt-2">
          <p className="text-muted">Welkom terug</p>
          <h1 className="mt-1 font-serif text-[34px] leading-tight">
            {greeting}, {user.firstName}
          </h1>
          <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-muted">
            Je zoekt naar een gedeeld moment. Als iemand hetzelfde herinnert,
            laten we het je voorzichtig weten.
          </p>
        </section>

        <div className="mt-6">
          <PrimaryButton href="/searches/new">
            <span className="flex items-center gap-2">
              <Plus size={18} />
              Iemand zoeken
            </span>
          </PrimaryButton>
        </div>

        <section className="mt-9">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
              Jouw zoekopdrachten
            </h2>
          </div>
          <div className="space-y-4">
            {searches.map((search) => (
              <SearchCard key={search.id} search={search} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
