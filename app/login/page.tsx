"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { useApp } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { login, hasOnboarded } = useApp();
  const [email, setEmail] = useState("melissa@example.com");
  const [password, setPassword] = useState("••••••••");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    login();
    router.push(hasOnboarded ? "/home" : "/onboarding");
  }

  return (
    <main className="min-h-dvh bg-cream lg:min-h-[860px]">
      <AppHeader backHref="/" />
      <div className="px-6 pb-10 pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Welkom terug
        </p>
        <h1 className="mt-3 font-serif text-[36px] leading-tight">Inloggen</h1>
        <p className="mt-3 max-w-[34ch] text-muted">
          Dit is een prototype. Elk e-mailadres en wachtwoord werkt.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-line bg-paper px-4 py-3.5 outline-none ring-accent/20 focus:ring-4"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Wachtwoord</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-line bg-paper px-4 py-3.5 outline-none ring-accent/20 focus:ring-4"
            />
          </label>
          <PrimaryButton type="submit">Doorgaan</PrimaryButton>
        </form>

        <PrivacyNotice className="mt-8">
          We vragen geen openbaar profiel. Anderen kunnen je niet zoeken op naam.
        </PrivacyNotice>
      </div>
    </main>
  );
}
