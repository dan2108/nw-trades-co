import { Phone, MapPin, Mail } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Contact
            </h4>
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
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Services
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {["Plumbing", "Electrical", "General Building", "Emergency call-outs"].map(
                (s) => (
                  <li key={s}>
                    <a
                      href="#services"
                      className="transition-colors hover:text-lime"
                    >
                      {s}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© {year} NW Trades Co. All rights reserved.</p>
          <p>Gas Safe &amp; NICEIC registered · Fully insured</p>
        </div>
      </div>
    </footer>
  );
}
