"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BottomNavigation } from "./BottomNavigation";
import { useApp } from "@/lib/store";

export function AppShell({
  children,
  withNav = true,
}: {
  children: React.ReactNode;
  withNav?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { hydrated, isLoggedIn, hasOnboarded } = useApp();

  useEffect(() => {
    if (!hydrated) return;
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }
    if (!hasOnboarded) {
      router.replace("/onboarding");
    }
  }, [hydrated, isLoggedIn, hasOnboarded, router, pathname]);

  if (!hydrated || !isLoggedIn || !hasOnboarded) {
    return (
      <div className="flex min-h-dvh items-center justify-center lg:min-h-[860px]">
        <p className="font-serif text-2xl text-muted">IWFY</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh bg-cream lg:min-h-[860px]">
      <div className={withNav ? "pb-24" : undefined}>{children}</div>
      {withNav ? <BottomNavigation /> : null}
    </div>
  );
}
