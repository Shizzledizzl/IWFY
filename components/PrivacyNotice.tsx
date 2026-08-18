import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/format";

export function PrivacyNotice({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-2xl bg-accent-soft/70 px-4 py-3.5 text-sm leading-relaxed text-ink/80",
        className,
      )}
    >
      <ShieldCheck size={18} className="mt-0.5 shrink-0 text-accent" />
      <p>{children}</p>
    </div>
  );
}
