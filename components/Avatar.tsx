import { cn } from "@/lib/format";

const palettes = [
  ["#c27856", "#f3e4db"],
  ["#3f6a57", "#e4eee8"],
  ["#6d5a7b", "#ece4f0"],
  ["#8a5a3c", "#f1e6dc"],
];

function paletteFor(seed: string) {
  const total = seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return palettes[total % palettes.length];
}

export function Avatar({
  seed,
  name,
  size = "md",
  revealed = true,
}: {
  seed: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  revealed?: boolean;
}) {
  const [fg, bg] = paletteFor(seed);
  const initial = name?.charAt(0).toUpperCase() ?? "?";

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-serif text-white",
        size === "sm" && "h-10 w-10 text-lg",
        size === "md" && "h-14 w-14 text-2xl",
        size === "lg" && "h-24 w-24 text-4xl",
      )}
      style={{ background: revealed ? fg : bg, color: revealed ? "#fff" : fg }}
      aria-hidden
    >
      {revealed ? initial : ""}
      {!revealed ? (
        <span className="h-2 w-2 rounded-full bg-current opacity-50" />
      ) : null}
    </div>
  );
}
