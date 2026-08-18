"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppShell } from "@/components/AppShell";
import { Avatar } from "@/components/Avatar";
import { conversations } from "@/lib/mock-data";
import { getMatchById, useApp } from "@/lib/store";

export default function ConversationPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { messages, sendMessage, matchStatuses } = useApp();
  const [text, setText] = useState("");

  const conversation =
    conversations.find((item) => item.id === params.id) ??
    conversations.find((item) => item.matchId === params.id);

  const match = getMatchById(conversation?.matchId ?? params.id);
  const thread = useMemo(
    () =>
      messages.filter(
        (message) =>
          message.conversationId === conversation?.id ||
          message.conversationId === params.id,
      ),
    [messages, conversation?.id, params.id],
  );

  if (!match || matchStatuses[match.id] !== "mutual") {
    return (
      <AppShell>
        <AppHeader backHref="/matches" title="Gesprek" />
        <p className="px-5 text-muted">
          Dit gesprek is alleen zichtbaar na een wederzijdse match.
        </p>
      </AppShell>
    );
  }

  const conversationId = conversation?.id ?? match.id;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;
    sendMessage(conversationId, value);
    setText("");
  }

  return (
    <AppShell withNav={false}>
      <AppHeader
        backHref="/matches"
        title={match.revealedIdentity.firstName}
        right={
          <button
            type="button"
            onClick={() => router.push(`/found/${match.id}`)}
            className="translate-x-1"
            aria-label="Profiel"
          >
            <Avatar
              seed={match.revealedIdentity.avatarSeed}
              name={match.revealedIdentity.firstName}
              size="sm"
            />
          </button>
        }
      />
      <div className="flex min-h-[calc(100dvh-4rem)] flex-col lg:min-h-[780px]">
        <div className="flex-1 space-y-3 px-5 py-4">
          <p className="mx-auto mb-4 max-w-[30ch] text-center text-xs leading-relaxed text-muted">
            Privégesprek. Alleen zichtbaar voor jullie twee.
          </p>
          {thread.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.fromCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${
                  message.fromCurrentUser
                    ? "rounded-br-md bg-accent text-white"
                    : "rounded-bl-md bg-paper text-ink"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={submit}
          className="safe-bottom flex items-end gap-2 border-t border-line bg-cream px-4 pt-3"
        >
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Bericht"
            className="min-h-11 flex-1 rounded-xl border border-line bg-paper px-4 py-2.5 outline-none"
          />
          <button
            type="submit"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white disabled:opacity-40"
            disabled={!text.trim()}
            aria-label="Verstuur"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </AppShell>
  );
}
