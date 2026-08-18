"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Dumbbell,
  FerrisWheel,
  MapPin,
  MoreHorizontal,
  TreePalm,
  UtensilsCrossed,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import {
  ageRangeLabels,
  cn,
  encounterTypeLabels,
  formatDutchDate,
  genderLabels,
} from "@/lib/format";
import { emptyDraft, useApp } from "@/lib/store";
import type { AgeRange, EncounterType, GenderEstimate } from "@/lib/types";

const types: Array<{ id: EncounterType; icon: typeof FerrisWheel }> = [
  { id: "festival", icon: FerrisWheel },
  { id: "horeca", icon: UtensilsCrossed },
  { id: "vakantie", icon: TreePalm },
  { id: "sport", icon: Dumbbell },
  { id: "werk", icon: Briefcase },
  { id: "openbaar", icon: MapPin },
  { id: "anders", icon: MoreHorizontal },
];

const genders: GenderEstimate[] = ["weet-niet", "vrouw", "man", "non-binair"];
const ages: AgeRange[] = ["weet-niet", "18-24", "25-34", "35-44", "45+"];

export default function NewSearchPage() {
  const router = useRouter();
  const { addSearch } = useApp();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState(emptyDraft);
  const [posted, setPosted] = useState(false);

  const canContinue = useMemo(() => {
    if (step === 1) return Boolean(draft.type);
    if (step === 2) return Boolean(draft.eventName && draft.place && draft.date);
    if (step === 3) return Boolean(draft.approximateTime && draft.area);
    if (step === 5) return draft.memory.trim().length > 12;
    return true;
  }, [draft, step]);

  function next() {
    if (step < 6) setStep(step + 1);
  }

  function placeSearch() {
    if (!draft.type) return;
    addSearch({
      type: draft.type,
      eventName: draft.eventName,
      place: draft.place,
      date: draft.date,
      approximateTime: draft.approximateTime,
      area: draft.area,
      genderEstimate: draft.genderEstimate,
      ageRange: draft.ageRange,
      memory: draft.memory,
    });
    setPosted(true);
  }

  if (posted) {
    return (
      <AppShell withNav={false}>
        <div className="flex min-h-[80dvh] flex-col justify-between px-6 pb-8 pt-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Zoekopdracht geplaatst
            </p>
            <h1 className="mt-4 font-serif text-[38px] leading-tight">
              We gaan voor je op zoek.
            </h1>
            <p className="mt-4 max-w-[34ch] text-[16px] leading-relaxed text-muted">
              Als iemand een vergelijkbare herinnering deelt, laten we het je
              weten. Identiteiten blijven tot die tijd verborgen.
            </p>
            <PrivacyNotice className="mt-8">
              Exacte locatie en je profiel zijn niet openbaar. Alleen overlap
              in de ontmoeting kan zichtbaar worden.
            </PrivacyNotice>
          </div>
          <PrimaryButton href="/home">Naar overzicht</PrimaryButton>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell withNav={false}>
      <AppHeader
        title="Nieuwe zoekopdracht"
        onBack={() => {
          if (step === 1) router.push("/home");
          else setStep(step - 1);
        }}
      />
      <div className="px-5 pb-10">
        <ProgressIndicator
          step={step}
          total={6}
          label={
            ["Type", "Plek", "Moment", "Persoon", "Herinnering", "Check"][
              step - 1
            ]
          }
        />

        <div className="mt-8">
          {step === 1 ? (
            <>
              <h1 className="font-serif text-[30px] leading-tight">
                Waar hebben jullie elkaar ontmoet?
              </h1>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {types.map((type) => {
                  const Icon = type.icon;
                  const selected = draft.type === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setDraft({ ...draft, type: type.id })}
                      className={cn(
                        "flex flex-col items-start gap-3 rounded-2xl border px-4 py-4 text-left transition",
                        selected
                          ? "border-accent bg-accent-soft"
                          : "border-line bg-paper hover:border-accent/30",
                      )}
                    >
                      <Icon size={20} className="text-accent" />
                      <span className="text-sm font-semibold leading-snug">
                        {encounterTypeLabels[type.id]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <h1 className="font-serif text-[30px] leading-tight">
                Welk evenement of welke plek?
              </h1>
              <p className="mt-3 text-sm text-muted">
                Een naam die jullie allebei zouden herkennen is genoeg.
              </p>
              <div className="mt-6 space-y-4">
                <Field label="Evenement of plek">
                  <input
                    value={draft.eventName}
                    onChange={(event) =>
                      setDraft({ ...draft, eventName: event.target.value })
                    }
                    placeholder="Defqon.1, Lowlands, café De Reiger…"
                    className="field-input"
                  />
                </Field>
                <Field label="Plaats">
                  <input
                    value={draft.place}
                    onChange={(event) =>
                      setDraft({ ...draft, place: event.target.value })
                    }
                    placeholder="Biddinghuizen, Amsterdam, Alcúdia…"
                    className="field-input"
                  />
                </Field>
                <Field label="Datum">
                  <input
                    type="date"
                    value={draft.date}
                    onChange={(event) =>
                      setDraft({ ...draft, date: event.target.value })
                    }
                    className="field-input"
                  />
                </Field>
              </div>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <h1 className="font-serif text-[30px] leading-tight">
                Wanneer ongeveer?
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Een schatting is prima. Hoe specifieker, hoe beter we overlap
                kunnen herkennen — maar je hoeft het niet precies te weten.
              </p>
              <div className="mt-6 space-y-4">
                <Field label="Ongeveer hoe laat">
                  <input
                    type="time"
                    value={draft.approximateTime}
                    onChange={(event) =>
                      setDraft({ ...draft, approximateTime: event.target.value })
                    }
                    className="field-input"
                  />
                </Field>
                <Field
                  label="Welk deel van de plek"
                  hint="Bijvoorbeeld: linker bar naast de mainstage"
                >
                  <input
                    value={draft.area}
                    onChange={(event) =>
                      setDraft({ ...draft, area: event.target.value })
                    }
                    placeholder="Linker bar naast de mainstage"
                    className="field-input"
                  />
                </Field>
              </div>
            </>
          ) : null}

          {step === 4 ? (
            <>
              <h1 className="font-serif text-[30px] leading-tight">
                Wie herinner je je nog?
              </h1>
              <p className="mt-3 text-sm text-muted">
                Optioneel. Dit helpt alleen om toevallige overlap te verminderen.
              </p>
              <div className="mt-6 space-y-5 opacity-90">
                <div>
                  <p className="mb-2 text-sm font-medium">Geschat geslacht</p>
                  <div className="flex flex-wrap gap-2">
                    {genders.map((gender) => (
                      <Chip
                        key={gender}
                        selected={draft.genderEstimate === gender}
                        onClick={() =>
                          setDraft({ ...draft, genderEstimate: gender })
                        }
                      >
                        {genderLabels[gender]}
                      </Chip>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Geschatte leeftijd</p>
                  <div className="flex flex-wrap gap-2">
                    {ages.map((age) => (
                      <Chip
                        key={age}
                        selected={draft.ageRange === age}
                        onClick={() => setDraft({ ...draft, ageRange: age })}
                      >
                        {ageRangeLabels[age]}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {step === 5 ? (
            <>
              <h1 className="font-serif text-[30px] leading-tight">
                Wat weet je nog van jullie ontmoeting?
              </h1>
              <p className="mt-3 text-sm text-muted">
                Je hoeft niet alles te weten. Een paar details zijn vaak al
                genoeg.
              </p>
              <textarea
                value={draft.memory}
                onChange={(event) =>
                  setDraft({ ...draft, memory: event.target.value })
                }
                rows={8}
                placeholder="We hebben ongeveer twintig minuten gepraat. Ze had rood haar en vertelde dat ze uit Utrecht kwam..."
                className="field-input mt-6 resize-none"
              />
            </>
          ) : null}

          {step === 6 ? (
            <>
              <h1 className="font-serif text-[30px] leading-tight">
                Klopt dit moment?
              </h1>
              <article className="mt-6 rounded-2xl border border-line bg-paper p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {draft.type ? encounterTypeLabels[draft.type] : ""}
                </p>
                <h2 className="mt-2 font-serif text-[28px] leading-none">
                  {draft.eventName}
                </h2>
                <p className="mt-3 text-sm text-muted">
                  {draft.date ? formatDutchDate(draft.date) : ""}
                  <span className="mx-1.5">·</span>
                  {draft.place}
                </p>
                <p className="mt-1 text-sm text-muted">
                  rond {draft.approximateTime} · {draft.area}
                </p>
                <p className="mt-5 text-[15px] leading-relaxed">{draft.memory}</p>
                {(draft.genderEstimate !== "weet-niet" ||
                  draft.ageRange !== "weet-niet") && (
                  <p className="mt-4 text-xs text-muted">
                    Optioneel: {genderLabels[draft.genderEstimate]},{" "}
                    {ageRangeLabels[draft.ageRange]}
                  </p>
                )}
              </article>
              <PrivacyNotice className="mt-5">
                Na plaatsen blijft jouw identiteit verborgen. Alleen de
                ontmoeting wordt vergeleken.
              </PrivacyNotice>
            </>
          ) : null}
        </div>

        <div className="mt-8 space-y-3">
          {step < 6 ? (
            <PrimaryButton onClick={next} disabled={!canContinue}>
              Verder
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={placeSearch}>Zoekopdracht plaatsen</PrimaryButton>
          )}
          {step === 4 ? (
            <SecondaryButton onClick={next}>Overslaan</SecondaryButton>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {hint ? <span className="mt-1.5 block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-2 text-sm font-medium transition",
        selected ? "bg-accent text-white" : "bg-paper text-ink ring-1 ring-line",
      )}
    >
      {children}
    </button>
  );
}
