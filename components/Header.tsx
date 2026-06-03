"use client";

import { useEffect, useState } from "react";
import { Phone, Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 w-full border-b transition-colors duration-200 ${
        scrolled
          ? "border-white/10 bg-navy/95 backdrop-blur"
          : "border-transparent bg-navy"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <a href="#top" className="text-white" aria-label="NW Trades Co home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative text-sm font-medium text-slate-200 transition-colors hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-lime transition-all duration-200 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href="tel:+447700900123"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-lime"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            07700 900123
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-lime-glow"
          >
            Get a Free Quote
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-navy md:hidden">
          <ul className="space-y-1 px-4 py-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-slate-200 hover:bg-navy-700 hover:text-lime"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-lime px-3 py-3 text-center text-base font-bold text-navy"
              >
                Get a Free Quote
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
