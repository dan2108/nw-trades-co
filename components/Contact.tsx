"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, ArrowRight, Loader2, Phone } from "lucide-react";

const JOB_TYPES = [
  "Plumbing",
  "Electrical",
  "General Building",
  "Emergency call-out",
  "Not sure / other",
];

const inputClass =
  "mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-base text-ink shadow-sm outline-none transition focus:border-navy focus:ring-4 focus:ring-lime/25";
const labelClass =
  "block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // Dummy handler — no real email sending for this demo.
    setTimeout(() => setStatus("sent"), 700);
  }

  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — pitch */}
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-semibold tabular-nums text-lime-dark">
                04
              </span>
              <span className="h-px w-8 bg-ink/20" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Get in touch
              </span>
            </div>
            <h2 className="mt-5 font-display text-[2rem] font-bold leading-[1.08] tracking-tightest text-ink sm:text-4xl lg:text-[2.75rem]">
              Get your free,
              <br /> no-obligation quote
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-600">
              Tell us about the job and we&apos;ll be in touch within the hour
              during working hours. No call centres — you&apos;ll speak to the
              team doing the work.
            </p>

            <ul className="mt-8 space-y-3.5 text-slate-700">
              {[
                "Free same-day quotes",
                "Fixed prices — no surprises",
                "Fully insured & certified",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <CheckCircle2
                    className="h-5 w-5 shrink-0 text-lime-dark"
                    aria-hidden="true"
                  />
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>

            <a
              href="tel:+447700900123"
              className="mt-10 inline-flex items-center gap-3 rounded-xl border border-ink/10 bg-paper px-5 py-4 transition-colors hover:border-lime/50"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy text-lime">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-medium uppercase tracking-wide text-slate-500">
                  Prefer to call?
                </span>
                <span className="font-display text-lg font-bold text-ink">
                  07700 900123
                </span>
              </span>
            </a>
          </div>

          {/* Right — form / confirmation */}
          <div className="rounded-3xl border border-ink/10 bg-paper p-6 shadow-card sm:p-8">
            {status === "sent" ? (
              <div
                className="flex flex-col items-center justify-center py-12 text-center"
                role="status"
                aria-live="polite"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-lime/20 text-lime-dark">
                  <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">
                  Thanks, we&apos;ll be in touch within the hour
                </h3>
                <p className="mt-2 text-slate-600">
                  One of the team will give you a call to arrange your free quote.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-bold text-ink underline-offset-4 hover:underline"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={inputClass}
                    placeholder="Jane Smith"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className={inputClass}
                    placeholder="07700 900123"
                  />
                </div>

                <div>
                  <label htmlFor="jobType" className={labelClass}>
                    Job Type
                  </label>
                  <select
                    id="jobType"
                    name="jobType"
                    required
                    defaultValue=""
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select a job type…
                    </option>
                    {JOB_TYPES.map((j) => (
                      <option key={j} value={j}>
                        {j}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={`${inputClass} resize-y`}
                    placeholder="Tell us a bit about the job…"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-lime px-5 py-3.5 text-base font-bold text-navy transition-colors hover:bg-lime-glow disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Submit Enquiry
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-500">
                  Demo form — no data is stored or sent.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
