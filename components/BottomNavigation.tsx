"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, UserRound, Users } from "lucide-react";
import { cn } from "@/lib/format";

const items = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/searches", label: "Zoeken", icon: Search },
  { href: "/matches", label: "Matches", icon: Users },
  { href: "/profile", label: "Profiel", icon: UserRound },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="safe-bottom absolute inset-x-0 bottom-0 z-20 border-t border-line/80 bg-paper/95 px-2 pt-2 backdrop-blur-md">
      <ul className="grid grid-cols-4">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-medium transition",
                  active ? "text-accent" : "text-muted hover:text-ink",
                )}
              >
                <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
