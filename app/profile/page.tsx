"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { Avatar } from "@/components/Avatar";
import { EmptyState } from "@/components/EmptyState";
import { SecondaryButton } from "@/components/PrimaryButton";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { ShieldOff } from "lucide-react";
import { useApp } from "@/lib/store";

export default function ProfilePage() {
  const router = useRouter();
  const {
    user,
    privacy,
    blockedUsers,
    updatePrivacy,
    updateProfile,
    unblockUser,
    logout,
    resetPrototype,
  } = useApp();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [name, setName] = useState(user.firstName);

  return (
    <AppShell>
      <AppHeader title="Profiel" />
      <div className="px-5 pb-10">
        <section className="flex items-center gap-4 rounded-2xl border border-line bg-paper p-4">
          <Avatar seed={user.avatarSeed} name={user.firstName} size="md" />
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted">Voornaam</label>
            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                updateProfile({ firstName: event.target.value || user.firstName });
              }}
              className="mt-1 w-full bg-transparent text-lg font-semibold outline-none"
            />
            <p className="mt-1 text-sm text-muted">Geboren in {user.birthYear}</p>
          </div>
        </section>

        <p className="mt-3 text-center text-[11px] uppercase tracking-[0.18em] text-muted">
          I Will Find You
        </p>

        <PrivacyNotice className="mt-6">
          Je profiel is niet doorzoekbaar. Anderen zien je voornaam en foto pas
          na wederzijdse toestemming.
        </PrivacyNotice>

        <section className="mt-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Privacy
          </h2>
          <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper">
            <ToggleRow
              title="Verberg exacte locatie"
              body="Deel alleen het gebied, nooit een live positie."
              checked={privacy.hideExactPlace}
              onChange={(checked) => updatePrivacy({ hideExactPlace: checked })}
            />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Meldingen
          </h2>
          <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper">
            <ToggleRow
              title="Mogelijke matches"
              body="Als iemand een vergelijkbare herinnering deelt."
              checked={privacy.notifyOnPossibleMatch}
              onChange={(checked) =>
                updatePrivacy({ notifyOnPossibleMatch: checked })
              }
            />
            <ToggleRow
              title="Binnenkomende verzoeken"
              body="Als iemand denkt dat jullie elkaar ontmoetten."
              checked={privacy.notifyOnIncomingRequest}
              onChange={(checked) =>
                updatePrivacy({ notifyOnIncomingRequest: checked })
              }
            />
            <ToggleRow
              title="Wederzijdse match"
              body="Als jullie allebei ja zeggen."
              checked={privacy.notifyOnMutualMatch}
              onChange={(checked) =>
                updatePrivacy({ notifyOnMutualMatch: checked })
              }
            />
            <ToggleRow
              title="Berichten"
              body="Alleen in een bevestigde privéchat."
              checked={privacy.notifyOnMessage}
              onChange={(checked) => updatePrivacy({ notifyOnMessage: checked })}
            />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Geblokkeerde gebruikers
          </h2>
          {blockedUsers.length === 0 ? (
            <EmptyState
              icon={ShieldOff}
              title="Niemand geblokkeerd"
              body="Afgewezen of geblokkeerde mensen kunnen je niet meer bereiken."
            />
          ) : (
            <div className="space-y-2">
              {blockedUsers.map((blocked) => (
                <div
                  key={blocked.id}
                  className="flex items-center justify-between rounded-2xl bg-paper px-4 py-3"
                >
                  <p className="text-sm">{blocked.displayLabel}</p>
                  <button
                    type="button"
                    className="text-sm font-medium text-accent"
                    onClick={() => unblockUser(blocked.id)}
                  >
                    Deblokkeren
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-8 space-y-3">
          <SecondaryButton
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            Uitloggen
          </SecondaryButton>
          <SecondaryButton onClick={resetPrototype}>
            Prototype resetten
          </SecondaryButton>
          {confirmDelete ? (
            <div className="rounded-2xl border border-line bg-paper p-4">
              <p className="text-sm leading-relaxed">
                Account verwijderen wist in dit prototype alle lokale data. In
                de echte app zou dit onomkeerbaar zijn.
              </p>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  className="flex-1 rounded-xl bg-ink py-3 text-sm font-semibold text-white"
                  onClick={() => {
                    resetPrototype();
                    router.push("/");
                  }}
                >
                  Verwijderen
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-xl bg-cream py-3 text-sm font-semibold"
                  onClick={() => setConfirmDelete(false)}
                >
                  Annuleren
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="w-full py-2 text-sm text-muted"
              onClick={() => setConfirmDelete(true)}
            >
              Account verwijderen
            </button>
          )}
        </section>
      </div>
    </AppShell>
  );
}

function ToggleRow({
  title,
  body,
  checked,
  onChange,
}: {
  title: string;
  body: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 px-4 py-3.5">
      <span>
        <span className="block text-sm font-medium">{title}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-muted">
          {body}
        </span>
      </span>
      <span
        className={`relative mt-0.5 h-6 w-10 shrink-0 rounded-full transition ${
          checked ? "bg-accent" : "bg-line"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-[18px]" : "left-0.5"
          }`}
        />
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
      </span>
    </label>
  );
}
