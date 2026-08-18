import type {
  BlockedUser,
  Conversation,
  Message,
  PossibleMatch,
  PrivacySettings,
  Search,
  UserProfile,
} from "./types";

export const currentUser: UserProfile = {
  firstName: "Melissa",
  birthYear: 1996,
  avatarSeed: "melissa",
};

export const defaultPrivacy: PrivacySettings = {
  hideExactPlace: true,
  notifyOnPossibleMatch: true,
  notifyOnIncomingRequest: true,
  notifyOnMutualMatch: true,
  notifyOnMessage: true,
};

export const searches: Search[] = [
  {
    id: "search-defqon",
    type: "festival",
    eventName: "Defqon.1",
    place: "Biddinghuizen",
    date: "2026-06-28",
    approximateTime: "23:30",
    area: "Linker bar naast de mainstage",
    genderEstimate: "vrouw",
    ageRange: "25-34",
    memory:
      "We hebben ongeveer twintig minuten gepraat bij de bar. Ze had rood haar, een zwart jasje en vertelde dat ze uit Utrecht kwam. Er was een nummer dat we allebei kenden; daarna raakten we elkaar kwijt in de menigte.",
    possibleMatchIds: ["match-sanne", "match-jules", "match-noor"],
  },
  {
    id: "search-mallorca",
    type: "vakantie",
    eventName: "Stranddag",
    place: "Alcúdia, Mallorca",
    date: "2026-07-13",
    approximateTime: "16:00",
    area: "Bij de strandtent, rechts van de pier",
    genderEstimate: "weet-niet",
    ageRange: "weet-niet",
    memory:
      "We deelden een tafel in de schaduw omdat het zo druk was. Korte, makkelijke conversatie over hoe lang we er nog waren. Daarna ging iedereen zijn eigen weg.",
    possibleMatchIds: [],
  },
];

export const possibleMatches: PossibleMatch[] = [
  {
    id: "match-sanne",
    searchId: "search-defqon",
    score: 91,
    strengthLabel: "Zeer sterke overeenkomst",
    signals: [
      "Zelfde evenement",
      "Zelfde dag",
      "Bijna hetzelfde tijdstip",
      "Zelfde gedeelte van het terrein",
      "Vergelijkbare herinnering",
    ],
    yourEncounter: {
      eventName: "Defqon.1",
      dateLabel: "28 juni",
      time: "ongeveer 23:30",
      area: "Mainstage — linker bar",
    },
    theirEncounter: {
      eventName: "Defqon.1",
      dateLabel: "28 juni",
      time: "tussen 23:15 en 00:00",
      area: "Mainstage area",
    },
    memoryOverlapNote:
      "Ook jullie herinneringen bevatten meerdere overeenkomsten.",
    revealedIdentity: {
      firstName: "Sanne",
      birthYear: 1997,
      avatarSeed: "sanne",
    },
  },
  {
    id: "match-jules",
    searchId: "search-defqon",
    score: 78,
    strengthLabel: "Sterke overeenkomst",
    signals: [
      "Zelfde evenement",
      "Zelfde dag",
      "Vergelijkbaar tijdstip",
      "Zelfde festivalgebied",
    ],
    yourEncounter: {
      eventName: "Defqon.1",
      dateLabel: "28 juni",
      time: "ongeveer 23:30",
      area: "Mainstage — linker bar",
    },
    theirEncounter: {
      eventName: "Defqon.1",
      dateLabel: "28 juni",
      time: "rond 23:00",
      area: "Mainstage, ergens bij de bars",
    },
    memoryOverlapNote:
      "Een deel van de herinnering overlap, maar minder specifiek dan bij een zeer sterke match.",
    revealedIdentity: {
      firstName: "Jules",
      birthYear: 1994,
      avatarSeed: "jules",
    },
  },
  {
    id: "match-noor",
    searchId: "search-defqon",
    score: 64,
    strengthLabel: "Mogelijke overeenkomst",
    signals: ["Zelfde evenement", "Zelfde dag", "Zelfde festivalterrein"],
    yourEncounter: {
      eventName: "Defqon.1",
      dateLabel: "28 juni",
      time: "ongeveer 23:30",
      area: "Mainstage — linker bar",
    },
    theirEncounter: {
      eventName: "Defqon.1",
      dateLabel: "28 juni",
      time: "laat in de avond",
      area: "Ergens bij de mainstage",
    },
    memoryOverlapNote:
      "Er zijn raakvlakken, maar de herinneringen zijn nog te globaal om zeker te zijn.",
    revealedIdentity: {
      firstName: "Noor",
      birthYear: 1998,
      avatarSeed: "noor",
    },
  },
];

export const conversations: Conversation[] = [
  {
    id: "chat-sanne",
    matchId: "match-sanne",
  },
];

export const seedMessages: Message[] = [
  {
    id: "msg-1",
    conversationId: "chat-sanne",
    fromCurrentUser: false,
    text: "Dit is gek. Ik heb de hele tijd gedacht dat ik je nooit meer zou vinden.",
    sentAt: "2026-08-16T19:12:00",
  },
  {
    id: "msg-2",
    conversationId: "chat-sanne",
    fromCurrentUser: true,
    text: "Ik ook. Defqon, bij die bar toch?",
    sentAt: "2026-08-16T19:14:00",
  },
  {
    id: "msg-3",
    conversationId: "chat-sanne",
    fromCurrentUser: false,
    text: "Ja. Linker bar, mainstage. Ik had een zwart jasje aan.",
    sentAt: "2026-08-16T19:15:00",
  },
];

export const seedBlockedUsers: BlockedUser[] = [];

export const incomingMatchId = "match-sanne";
