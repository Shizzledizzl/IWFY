import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/format";

type AppHeaderProps = {
  title?: string;
  backHref?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  transparent?: boolean;
};

export function AppHeader({
  title,
  backHref,
  onBack,
  right,
  transparent,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex items-center justify-between gap-3 px-5 pb-3 pt-[max(0.9rem,env(safe-area-inset-top))]",
        transparent ? "bg-transparent" : "bg-cream/90 backdrop-blur-md",
      )}
    >
      {backHref || onBack ? (
        backHref ? (
          <Link
            href={backHref}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-ink transition hover:bg-white/70"
            aria-label="Terug"
          >
            <ArrowLeft size={20} />
          </Link>
        ) : (
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-ink transition hover:bg-white/70"
            aria-label="Terug"
          >
            <ArrowLeft size={20} />
          </button>
        )
      ) : (
        <div className="w-10" />
      )}
      <div className="min-w-0 flex-1 text-center">
        {title ? (
          <p className="truncate text-[15px] font-semibold tracking-tight">{title}</p>
        ) : (
          <p className="font-serif text-[22px] leading-none tracking-tight">IWFY</p>
        )}
      </div>
      <div className="flex min-w-10 justify-end">{right}</div>
    </header>
  );
}
