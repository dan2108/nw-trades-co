"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send, Loader2 } from "lucide-react";

const JOB_TYPES = [
  "Plumbing",
  "Electrical",
  "General Building",
  "Emergency call-out",
  "Not sure / other",
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // Dummy handler — no real email sending for this demo.
    setTimeout(() => setStatus("sent"), 700);
  }

  return (
    <section id="contact" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left: pitch */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-lime-dark">
              Get in touch
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Get your free, no-obligation quote
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Tell us about the job and we&apos;ll be in touch within the hour
              during working hours. No call centres — you&apos;ll speak to the
              team doing the work.
            </p>
            <ul className="mt-8 space-y-3 text-slate-700">
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
          </div>

          {/* Right: form / confirmation */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
            {status === "sent" ? (
              <div
                className="flex flex-col items-center justify-center py-10 text-center"
                role="status"
                aria-live="polite"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-lime/20 text-lime-dark">
                  <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-navy">
                  Thanks, we&apos;ll be in touch within the hour
                </h3>
                <p className="mt-2 text-slate-600">
                  One of the team will give you a call to arrange your free quote.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-bold text-navy underline-offset-4 hover:underline"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-navy"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-navy shadow-sm outline-none transition focus:border-navy focus:ring-2 focus:ring-lime/40"
                    placeholder="Jane Smith"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-navy"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-navy shadow-sm outline-none transition focus:border-navy focus:ring-2 focus:ring-lime/40"
                    placeholder="07700 900123"
                  />
                </div>

                <div>
                  <label
                    htmlFor="jobType"
                    className="block text-sm font-semibold text-navy"
                  >
                    Job Type
                  </label>
                  <select
                    id="jobType"
                    name="jobType"
                    required
                    defaultValue=""
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-navy shadow-sm outline-none transition focus:border-navy focus:ring-2 focus:ring-lime/40"
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
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-navy"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1.5 w-full resize-y rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-navy shadow-sm outline-none transition focus:border-navy focus:ring-2 focus:ring-lime/40"
                    placeholder="Tell us a bit about the job…"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-lime px-5 py-3 text-base font-bold text-navy transition-colors hover:bg-lime-glow disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" aria-hidden="true" />
                      Submit Enquiry
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
