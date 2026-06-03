import { PhoneCall, ArrowRight, ShieldCheck, Clock, Star } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-navy text-white"
    >
      {/* Subtle grid + glow backdrop — no stock photos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-lime/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-lime">
            <Star className="h-3.5 w-3.5 fill-lime" aria-hidden="true" />
            Rated 4.9/5 by North West homeowners
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            NW&apos;s Most Trusted Trades Team —{" "}
            <span className="text-lime">We Pick Up, We Show Up, We Fix It.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Plumbing, electrical &amp; building work across the North West. Free
            quotes, fast response.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime px-6 py-3.5 text-base font-bold text-navy shadow-lg shadow-lime/20 transition-colors hover:bg-lime-glow"
            >
              <PhoneCall className="h-5 w-5" aria-hidden="true" />
              Get a Free Quote
            </a>
            <a
              href="#testimonials"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:border-lime/50 hover:text-lime"
            >
              See Our Work
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          {/* Inline trust strip */}
          <dl className="mt-10 grid max-w-lg grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Clock className="h-5 w-5 text-lime" aria-hidden="true" />
              <dt className="sr-only">Response time</dt>
              <dd>Same-day response</dd>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <ShieldCheck className="h-5 w-5 text-lime" aria-hidden="true" />
              <dt className="sr-only">Insurance</dt>
              <dd>Fully insured &amp; certified</dd>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Star className="h-5 w-5 text-lime" aria-hidden="true" />
              <dt className="sr-only">Experience</dt>
              <dd>10+ years on the tools</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
