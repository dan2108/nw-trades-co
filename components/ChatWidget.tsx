"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Wrench } from "lucide-react";
import {
  respond,
  INITIAL_STATE,
  GREETING,
  type BotState,
} from "@/lib/demoBot";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "447700900123";

/** Build a wa.me deep link with a pre-filled message. */
function whatsappLink(jobSummary?: string) {
  const body = jobSummary
    ? `Hi NW Trades Co, I'd like a free quote.\n\nJob: ${jobSummary}`
    : `Hi NW Trades Co, I'd like a free quote please.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
}

/** WhatsApp glyph (Simple Icons path). */
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/** Render **bold** markers and preserve line breaks. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-semibold text-ink">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

type Msg = { id: number; role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { id: 0, role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [handoff, setHandoff] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);
  const botState = useRef<BotState>(INITIAL_STATE);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, open, handoff]);

  // Clear any pending timers on unmount.
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  function send(raw: string) {
    const text = raw.trim();
    if (!text || typing) return;

    setMessages((m) => [
      ...m,
      { id: idRef.current++, role: "user", content: text },
    ]);
    setInput("");
    setTyping(true);

    const turn = respond(text, botState.current);
    botState.current = turn.nextState;

    // Simulate a natural typing pause, scaled to reply length.
    const delay = Math.min(1500, Math.max(600, turn.reply.length * 14));
    const t = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { id: idRef.current++, role: "assistant", content: turn.reply },
      ]);
      if (turn.offerWhatsApp) setHandoff(turn.jobSummary ?? "");
    }, delay);
    timers.current.push(t);
  }

  const quickReplies = ["Boiler repair", "Full rewire", "New bathroom", "Do you cover my area?"];

  return (
    <>
      {/* Launcher button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-lime text-navy shadow-lime transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-lime/40 sm:bottom-6 sm:right-6"
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
          className="fixed inset-x-3 bottom-24 z-50 flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-2xl motion-safe:animate-chat-pop sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[24rem]"
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
            className="chat-scroll flex-1 space-y-3 overflow-y-auto bg-paper p-4"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-navy text-white"
                      : "rounded-bl-sm border border-ink/10 bg-white text-slate-700"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <RichText text={m.content} />
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-ink/10 bg-white px-4 py-3">
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

            {/* Quick-reply chips (only before the first user message) */}
            {messages.length === 1 && !typing && (
              <div className="flex flex-wrap gap-2 pt-1">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-lime hover:bg-lime/10"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* WhatsApp handoff CTA */}
          {handoff !== null && (
            <div className="border-t border-ink/10 bg-white px-3 pt-3">
              <a
                href={whatsappLink(handoff || undefined)}
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
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-ink/10 bg-white p-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Type your message
            </label>
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-full border border-ink/15 bg-paper px-4 py-2.5 text-sm text-ink outline-none transition focus:border-navy focus:ring-2 focus:ring-lime/40"
            />
            <button
              type="submit"
              disabled={typing || !input.trim()}
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
