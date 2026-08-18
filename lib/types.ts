export type EncounterType =
  | "festival"
  | "horeca"
  | "vakantie"
  | "sport"
  | "werk"
  | "openbaar"
  | "anders";

export type GenderEstimate = "vrouw" | "man" | "non-binair" | "weet-niet";

export type AgeRange = "18-24" | "25-34" | "35-44" | "45+" | "weet-niet";

export type MatchStatus =
  | "none"
  | "incoming"
  | "sent"
  | "rejected"
  | "mutual";

export type Search = {
  id: string;
  type: EncounterType;
  eventName: string;
  place: string;
  date: string;
  approximateTime: string;
  area: string;
  genderEstimate: GenderEstimate;
  ageRange: AgeRange;
  memory: string;
  possibleMatchIds: string[];
};

export type PossibleMatch = {
  id: string;
  searchId: string;
  score: number;
  strengthLabel: string;
  signals: string[];
  yourEncounter: {
    eventName: string;
    dateLabel: string;
    time: string;
    area: string;
  };
  theirEncounter: {
    eventName: string;
    dateLabel: string;
    time: string;
    area: string;
  };
  memoryOverlapNote: string;
  revealedIdentity: {
    firstName: string;
    birthYear: number;
    avatarSeed: string;
  };
};

export type Message = {
  id: string;
  conversationId: string;
  fromCurrentUser: boolean;
  text: string;
  sentAt: string;
};

export type Conversation = {
  id: string;
  matchId: string;
};

export type BlockedUser = {
  id: string;
  displayLabel: string;
  blockedAt: string;
};

export type UserProfile = {
  firstName: string;
  birthYear: number;
  avatarSeed: string;
};

export type PrivacySettings = {
  hideExactPlace: boolean;
  notifyOnPossibleMatch: boolean;
  notifyOnIncomingRequest: boolean;
  notifyOnMutualMatch: boolean;
  notifyOnMessage: boolean;
};

export type DraftSearch = {
  type: EncounterType | null;
  eventName: string;
  place: string;
  date: string;
  approximateTime: string;
  area: string;
  genderEstimate: GenderEstimate;
  ageRange: AgeRange;
  memory: string;
};
