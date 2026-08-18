import Link from "next/link";
import { cn } from "@/lib/format";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
};

const primaryClass =
  "inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(184,92,56,0.8)] transition hover:bg-accent-dark active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40";

const secondaryClass =
  "inline-flex items-center justify-center rounded-xl border border-line bg-paper px-5 py-3.5 text-[15px] font-semibold text-ink transition hover:bg-white active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40";

function ButtonBase({
  children,
  href,
  onClick,
  type = "button",
  disabled,
  fullWidth = true,
  className,
  variant,
}: ButtonProps & { variant: "primary" | "secondary" }) {
  const classes = cn(
    variant === "primary" ? primaryClass : secondaryClass,
    fullWidth && "w-full",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

export function PrimaryButton(props: ButtonProps) {
  return <ButtonBase {...props} variant="primary" />;
}

export function SecondaryButton(props: ButtonProps) {
  return <ButtonBase {...props} variant="secondary" />;
}
