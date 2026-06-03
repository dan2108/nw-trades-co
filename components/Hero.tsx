import { ArrowRight, Star } from "lucide-react";
import Marquee from "./Marquee";

const STATS = [
  { value: "11", label: "Years on the tools" },
  { value: "4.9★", label: "Average review score" },
  { value: "<1hr", label: "Typical response" },
];

export default function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden bg-navy text-white">
      {/* Fine grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(120% 90% at 30% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 30% 0%, #000 40%, transparent 100%)",
        }}
      />
      {/* Oversized watermark — editorial depth, not a stock photo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 bottom-[-3rem] select-none font-display text-[28vw] font-bold leading-none tracking-tightest text-white/[0.03] sm:text-[20vw] lg:text-[14rem]"
      >
        NW
      </span>
      {/* Single soft lime glow, top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-8%] h-80 w-80 rounded-full bg-lime/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          {/* Left — headline */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime" />
              Est. 2014
              <span className="h-px w-6 bg-white/20" />
              North West England
            </div>

            <h1 className="mt-7 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tightest sm:text-6xl lg:text-[5rem]">
              NW&apos;s most trusted
              <br className="hidden sm:block" /> trades team.
            </h1>

            <p className="mt-6 max-w-xl font-display text-2xl font-semibold leading-snug tracking-tight text-slate-200 sm:text-3xl">
              We pick up. We show up.{" "}
              <span className="relative whitespace-nowrap text-lime">
                We fix it.
              </span>
            </p>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400">
              Plumbing, electrical &amp; building work across the North West.
              Free quotes, fast response.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-lime px-7 py-3.5 text-[15px] font-bold text-navy shadow-lime transition-colors hover:bg-lime-glow"
              >
                Get a Free Quote
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#testimonials"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:border-lime/40 hover:text-lime"
              >
                See Our Work
              </a>
            </div>
          </div>

          {/* Right — refined rating card (asymmetric) */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <div className="flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-lime text-lime" />
                ))}
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-200">
                &ldquo;Turned up on time, fixed it first visit, charged exactly
                what they quoted.&rdquo;
              </p>
              <p className="mt-3 text-sm font-semibold text-white">
                Rated <span className="text-lime">4.9 / 5</span> by 120+ North
                West homeowners
              </p>
            </div>
          </div>
        </div>

        {/* Stat strip with hairline dividers */}
        <dl className="mt-14 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10">
          {STATS.map((s) => (
            <div key={s.label} className="px-1 py-6 text-center sm:px-6 sm:text-left">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {s.value}
                </span>
                <span className="mt-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Marquee />
    </section>
  );
}
