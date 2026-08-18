export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDutchDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`);
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function greetingForHour(hour: number): string {
  if (hour < 12) return "Goedemorgen";
  if (hour < 18) return "Goedemiddag";
  return "Goedenavond";
}

export const encounterTypeLabels: Record<string, string> = {
  festival: "Festival / evenement",
  horeca: "Horeca",
  vakantie: "Vakantie",
  sport: "Sport",
  werk: "Werk / studie",
  openbaar: "Openbare plek",
  anders: "Anders",
};

export const genderLabels: Record<string, string> = {
  vrouw: "Vrouw",
  man: "Man",
  "non-binair": "Non-binair",
  "weet-niet": "Weet ik niet",
};

export const ageRangeLabels: Record<string, string> = {
  "18-24": "18 – 24",
  "25-34": "25 – 34",
  "35-44": "35 – 44",
  "45+": "45+",
  "weet-niet": "Weet ik niet",
};

export function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
