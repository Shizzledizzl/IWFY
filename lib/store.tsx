"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  conversations,
  currentUser,
  defaultPrivacy,
  possibleMatches,
  searches as seedSearches,
  seedBlockedUsers,
  seedMessages,
} from "./mock-data";
import type {
  BlockedUser,
  DraftSearch,
  MatchStatus,
  Message,
  PrivacySettings,
  Search,
  UserProfile,
} from "./types";
import { createId } from "./format";

const STORAGE_KEY = "iwfy-prototype-v1";

export const emptyDraft: DraftSearch = {
  type: null,
  eventName: "",
  place: "",
  date: "",
  approximateTime: "",
  area: "",
  genderEstimate: "weet-niet",
  ageRange: "weet-niet",
  memory: "",
};

type PersistedState = {
  isLoggedIn: boolean;
  hasOnboarded: boolean;
  user: UserProfile;
  searches: Search[];
  matchStatuses: Record<string, MatchStatus>;
  messages: Message[];
  privacy: PrivacySettings;
  blockedUsers: BlockedUser[];
};

type AppState = PersistedState & {
  hydrated: boolean;
};

type AppContextValue = AppState & {
  login: () => void;
  completeOnboarding: (profile: Pick<UserProfile, "firstName" | "birthYear">) => void;
  logout: () => void;
  addSearch: (search: Omit<Search, "id" | "possibleMatchIds">) => string;
  setMatchStatus: (matchId: string, status: MatchStatus) => void;
  sendMessage: (conversationId: string, text: string) => void;
  updatePrivacy: (privacy: Partial<PrivacySettings>) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  blockUser: (label: string) => void;
  unblockUser: (id: string) => void;
  resetPrototype: () => void;
};

const initialStatuses: Record<string, MatchStatus> = {
  "match-sanne": "incoming",
  "match-jules": "none",
  "match-noor": "none",
};

const defaultState: PersistedState = {
  isLoggedIn: false,
  hasOnboarded: false,
  user: currentUser,
  searches: seedSearches,
  matchStatuses: initialStatuses,
  messages: seedMessages,
  privacy: defaultPrivacy,
  blockedUsers: seedBlockedUsers,
};

const AppContext = createContext<AppContextValue | null>(null);

let snapshotRaw: string | null | undefined;
let snapshotValue: PersistedState = defaultState;

function parseStored(raw: string | null): PersistedState {
  if (!raw) return defaultState;
  try {
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      ...defaultState,
      ...parsed,
      searches: parsed.searches ?? defaultState.searches,
      matchStatuses: {
        ...initialStatuses,
        ...parsed.matchStatuses,
      },
      messages: parsed.messages ?? defaultState.messages,
      privacy: { ...defaultPrivacy, ...parsed.privacy },
      user: { ...currentUser, ...parsed.user },
    };
  } catch {
    return defaultState;
  }
}

function getStoredSnapshot(): PersistedState {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === snapshotRaw) return snapshotValue;
  snapshotRaw = raw;
  snapshotValue = parseStored(raw);
  return snapshotValue;
}

function subscribeStorage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function persist(next: PersistedState) {
  const raw = JSON.stringify(next);
  window.localStorage.setItem(STORAGE_KEY, raw);
  snapshotRaw = raw;
  snapshotValue = next;
}

function emptySubscribe() {
  return () => {};
}

export function AppProvider({ children }: { children: ReactNode }) {
  const hydrated = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const stored = useSyncExternalStore(
    subscribeStorage,
    getStoredSnapshot,
    () => defaultState,
  );
  const [local, setLocal] = useState<PersistedState | null>(null);
  const data = local ?? (hydrated ? stored : defaultState);

  const update = useCallback(
    (updater: (prev: PersistedState) => PersistedState) => {
      setLocal((prev) => {
        const next = updater(prev ?? data);
        persist(next);
        return next;
      });
    },
    [data],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      ...data,
      hydrated,
      login: () =>
        update((prev) => ({
          ...prev,
          isLoggedIn: true,
          hasOnboarded: true,
        })),
      completeOnboarding: (profile) =>
        update((prev) => ({
          ...prev,
          isLoggedIn: true,
          hasOnboarded: true,
          user: { ...prev.user, ...profile },
        })),
      logout: () =>
        update((prev) => ({
          ...prev,
          isLoggedIn: false,
        })),
      addSearch: (search) => {
        const id = createId("search");
        update((prev) => ({
          ...prev,
          searches: [
            {
              ...search,
              id,
              possibleMatchIds: [],
            },
            ...prev.searches,
          ],
        }));
        return id;
      },
      setMatchStatus: (matchId, status) =>
        update((prev) => ({
          ...prev,
          matchStatuses: { ...prev.matchStatuses, [matchId]: status },
        })),
      sendMessage: (conversationId, text) =>
        update((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: createId("msg"),
              conversationId,
              fromCurrentUser: true,
              text,
              sentAt: new Date().toISOString(),
            },
          ],
        })),
      updatePrivacy: (privacy) =>
        update((prev) => ({
          ...prev,
          privacy: { ...prev.privacy, ...privacy },
        })),
      updateProfile: (profile) =>
        update((prev) => ({
          ...prev,
          user: { ...prev.user, ...profile },
        })),
      blockUser: (label) =>
        update((prev) => ({
          ...prev,
          blockedUsers: [
            ...prev.blockedUsers,
            {
              id: createId("block"),
              displayLabel: label,
              blockedAt: new Date().toISOString(),
            },
          ],
        })),
      unblockUser: (id) =>
        update((prev) => ({
          ...prev,
          blockedUsers: prev.blockedUsers.filter((user) => user.id !== id),
        })),
      resetPrototype: () => {
        window.localStorage.removeItem(STORAGE_KEY);
        snapshotRaw = null;
        snapshotValue = defaultState;
        setLocal(defaultState);
      },
    }),
    [data, hydrated, update],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}

export function getMatchById(id: string) {
  return possibleMatches.find((match) => match.id === id);
}

export function getSearchById(searchesList: Search[], id: string) {
  return searchesList.find((search) => search.id === id);
}

export function getConversationId(matchId: string) {
  return conversations.find((conversation) => conversation.matchId === matchId)
    ?.id;
}
