"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { MessageCircle, X, Send, Wrench } from "lucide-react";

const GREETING =
  "Hi! I'm the NW Trades Co assistant — what job can I help you with today?";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "447700900123";

/** Build a wa.me deep link with a pre-filled message. */
function whatsappLink(jobSummary?: string, name?: string) {
  const intro = name ? `Hi NW Trades Co, it's ${name}. ` : "Hi NW Trades Co, ";
  const body = jobSummary
    ? `${intro}I'd like a free quote.\n\nJob: ${jobSummary}`
    : `${intro}I'd like a free quote please.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
}

/** WhatsApp glyph (Simple Icons path) — kept inline to avoid an extra dep. */
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

type ChatMsg = ReturnType<typeof useChat>["messages"][number];

/** Pull the most recent handoffToWhatsApp tool call out of the message list. */
function findHandoff(messages: ChatMsg[]) {
  for (let i = messages.length - 1; i >= 0; i--) {
    const invocations = messages[i].toolInvocations;
    if (!invocations) continue;
    for (const inv of invocations) {
      if (inv.toolName === "handoffToWhatsApp") {
        const args = (inv.args ?? {}) as {
          jobSummary?: string;
          customerName?: string;
        };
        return { jobSummary: args.jobSummary, name: args.customerName };
      }
    }
  }
  return null;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  } = useChat({
    api: "/api/chat",
    initialMessages: [{ id: "greeting", role: "assistant", content: GREETING }],
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, open]);

  const visibleMessages = messages.filter(
    (m) => m.content && m.content.trim().length > 0
  );
  const handoff = findHandoff(messages);
  // Show a WhatsApp CTA when the bot hands off, OR as a fallback if chat errors.
  const showWhatsApp = Boolean(handoff) || Boolean(error);

  return (
    <>
      {/* Launcher button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-lime text-navy shadow-xl shadow-navy/20 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-lime/40 sm:bottom-6 sm:right-6"
      >
        {!open && (
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-lime motion-safe:animate-pulse-ring"
          />
        )}
        {open ? (
          <X className="h-6 w-6" strokeWidth={2.5} />
        ) : (
          <MessageCircle className="h-6 w-6" strokeWidth={2.5} />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="NW Trades Co enquiry assistant"
          className="fixed inset-x-3 bottom-24 z-50 flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl motion-safe:animate-chat-pop sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[24rem]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-navy px-4 py-3 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-lime text-navy">
              <Wrench className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-bold">NW Trades Co</p>
              <p className="flex items-center gap-1.5 text-xs text-slate-300">
                <span className="h-2 w-2 rounded-full bg-lime" aria-hidden="true" />
                Enquiry assistant · online
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="ml-auto rounded-md p-1 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="chat-scroll flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4"
          >
            {visibleMessages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-navy text-white"
                      : "rounded-bl-sm border border-slate-200 bg-white text-slate-800"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isLoading &&
              visibleMessages[visibleMessages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-3">
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: `${d}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}

            {error && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
                The assistant is having a moment — no problem, message us
                directly on WhatsApp below and we&apos;ll sort your quote.
              </p>
            )}
          </div>

          {/* WhatsApp handoff CTA */}
          {showWhatsApp && (
            <div className="border-t border-slate-200 bg-white px-3 pt-3">
              <a
                href={whatsappLink(handoff?.jobSummary, handoff?.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#1ebe5b]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Get Your Free Quote on WhatsApp
              </a>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-slate-200 bg-white p-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Type your message
            </label>
            <input
              id="chat-input"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message…"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-full border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-lime/40"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime text-navy transition-colors hover:bg-lime-glow disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-5 w-5" strokeWidth={2.25} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
