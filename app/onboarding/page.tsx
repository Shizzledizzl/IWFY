"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeOff, HandHeart, MapPinned } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { useApp } from "@/lib/store";

const intro = [
  {
    title: "Je zoekt een ontmoeting, geen profiel.",
    body: "IWFY koppelt mensen via een gedeelde herinnering: een plek, een moment, iets kleins dat jullie allebei nog weten.",
  },
  {
    title: "Privé, tot jullie allebei ja zeggen.",
    body: "Geen foto’s, geen achternaam, geen openbare lijst. Contact bestaat pas als beide kanten hetzelfde gevoel herkennen.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding, user } = useApp();
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState(user.firstName);
  const [birthYear, setBirthYear] = useState(String(user.birthYear));

  function finish() {
    completeOnboarding({
      firstName: firstName.trim() || "Melissa",
      birthYear: Number(birthYear) || 1996,
    });
    router.push("/home");
  }

  return (
    <main className="min-h-dvh bg-cream lg:min-h-[860px]">
      <AppHeader backHref={step === 1 ? "/" : undefined} onBack={step > 1 ? () => setStep(step - 1) : undefined} />
      <div className="px-6 pb-10">
        <ProgressIndicator step={step} total={3} />

        {step < 3 ? (
          <section className="mt-10">
            <p className="font-serif text-3xl leading-tight">{intro[step - 1].title}</p>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              {intro[step - 1].body}
            </p>

            <ul className="mt-8 space-y-3">
              {(step === 1
                ? [
                    { icon: MapPinned, text: "Je beschrijft waar jullie elkaar tegenkwamen." },
                    { icon: HandHeart, text: "Wij kijken of iemand dezelfde ontmoeting zoekt." },
                  ]
                : [
                    { icon: EyeOff, text: "Identiteit blijft verborgen tot wederzijdse toestemming." },
                    { icon: HandHeart, text: "Je kunt altijd afwijzen, blokkeren of rapporteren." },
                  ]
              ).map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-3 rounded-2xl bg-paper px-4 py-3.5"
                >
                  <item.icon size={18} className="mt-0.5 text-accent" />
                  <span className="text-sm leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <PrimaryButton onClick={() => setStep(step + 1)}>Verder</PrimaryButton>
            </div>
          </section>
        ) : (
          <section className="mt-10">
            <p className="font-serif text-3xl leading-tight">Hoe mogen we je noemen?</p>
            <p className="mt-3 text-muted">
              Alleen je voornaam wordt zichtbaar, en pas ná een wederzijdse match.
            </p>

            <div className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Voornaam</span>
                <input
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3.5 outline-none ring-accent/20 focus:ring-4"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Geboortejaar</span>
                <input
                  inputMode="numeric"
                  value={birthYear}
                  onChange={(event) => setBirthYear(event.target.value)}
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3.5 outline-none ring-accent/20 focus:ring-4"
                />
              </label>
            </div>

            <div className="mt-10 space-y-3">
              <PrimaryButton onClick={finish}>Naar IWFY</PrimaryButton>
              <SecondaryButton onClick={() => setStep(2)}>Terug</SecondaryButton>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
