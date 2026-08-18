import Link from "next/link";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";

export default function LandingPage() {
  return (
    <main className="relative flex min-h-dvh flex-col px-6 pb-8 pt-[max(1.4rem,env(safe-area-inset-top))] lg:min-h-[860px]">
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-4rem] top-40 h-64 w-64 rounded-full bg-[#d9c3a8]/50 blur-3xl" />

      <header className="relative flex items-end justify-between">
        <div>
          <p className="font-serif text-[34px] leading-none tracking-tight">IWFY</p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
            I Will Find You
          </p>
        </div>
        <Link href="/login" className="text-sm font-medium text-muted">
          Inloggen
        </Link>
      </header>

      <section className="relative mt-16 flex flex-1 flex-col">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Een gedeelde herinnering
        </p>
        <h1 className="mt-5 max-w-[18ch] font-serif text-[42px] leading-[1.05] tracking-tight">
          Iemand uit het oog verloren?
        </h1>
        <p className="mt-5 max-w-[34ch] text-[17px] leading-relaxed text-muted">
          Vertel ons waar jullie elkaar ontmoetten. Misschien zoekt diegene jou
          ook.
        </p>

        <div className="mt-10 space-y-3">
          <PrimaryButton href="/onboarding">Begin met zoeken</PrimaryButton>
          <SecondaryButton href="/login">Ik heb al een account</SecondaryButton>
        </div>
      </section>

      <footer className="relative mt-10 space-y-3 pb-2">
        <p className="text-sm leading-relaxed text-muted">
          Geen profielen om te browsen. Geen openbare zoekmachine. Jullie
          identiteit blijft verborgen tot jullie allebei ja zeggen.
        </p>
      </footer>
    </main>
  );
}
