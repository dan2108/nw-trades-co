import { Phone, MapPin, Mail, ArrowRight } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="grain relative overflow-hidden bg-navy text-slate-300">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Editorial CTA band */}
        <div className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-16">
          <h2 className="max-w-xl font-display text-3xl font-bold leading-tight tracking-tightest text-white sm:text-4xl">
            Got a job that needs doing?
          </h2>
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 self-start rounded-full bg-lime px-7 py-3.5 text-[15px] font-bold text-navy transition-colors hover:bg-lime-glow"
          >
            Get a Free Quote
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="rule-fade-light" />

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="text-white">
              <Logo />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Plumbing, electrical and general building work across the North
              West. We pick up, we show up, we fix it.
            </p>
          </div>

          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="tel:+447700900123"
                  className="inline-flex items-center gap-2 transition-colors hover:text-lime"
                >
                  <Phone className="h-4 w-4 text-lime" aria-hidden="true" />
                  07700 900123
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@nwtradesco.example"
                  className="inline-flex items-center gap-2 transition-colors hover:text-lime"
                >
                  <Mail className="h-4 w-4 text-lime" aria-hidden="true" />
                  hello@nwtradesco.example
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
                <span>
                  Unit 7, Wallgate Business Park
                  <br />
                  Wigan, WN3 4AB
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {["Plumbing", "Electrical", "General Building", "Emergency call-outs"].map(
                (s) => (
                  <li key={s}>
                    <a href="#services" className="transition-colors hover:text-lime">
                      {s}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="rule-fade-light" />

        <div className="flex flex-col items-start justify-between gap-3 py-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© {year} NW Trades Co. All rights reserved.</p>
          <p>Gas Safe &amp; NICEIC registered · Fully insured</p>
        </div>
      </div>
    </footer>
  );
}
