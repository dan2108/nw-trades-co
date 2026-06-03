"use client";

import { useState } from "react";
import {
  Droplets,
  Zap,
  Hammer,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  blurb: string;
  details: string[];
  more: string;
};

const SERVICES: Service[] = [
  {
    icon: Droplets,
    title: "Plumbing",
    blurb: "From burst pipes to full bathroom fit-outs — sorted properly, first time.",
    details: ["Emergency repairs", "Boiler installs & servicing", "Bathroom fitting"],
    more:
      "Gas Safe registered engineers on call for leaks, blockages and no-heat emergencies. We supply and install boilers from all major brands and fit complete bathrooms — tiling, plumbing and waste included.",
  },
  {
    icon: Zap,
    title: "Electrical",
    blurb: "Safe, certified electrical work — from a single socket to a full rewire.",
    details: ["Consumer units", "Full & partial rewires", "EV charger installs"],
    more:
      "NICEIC-approved electricians handling fuse board upgrades, fault finding and rewires to current 18th Edition standards. OZEV-approved EV charge point installation with grant guidance where eligible.",
  },
  {
    icon: Hammer,
    title: "General Building",
    blurb: "Trusted builders for projects big and small, finished to a high standard.",
    details: ["Extensions", "Renovations", "Tiling"],
    more:
      "Single and double-storey extensions, kitchen and loft conversions, structural alterations and full property renovations. One reliable team managing the whole job, from foundations to the final coat of paint.",
  },
];

function ServiceCard({ service }: { service: Service }) {
  const [open, setOpen] = useState(false);
  const Icon = service.icon;
  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-lime transition-colors group-hover:bg-navy-700">
        <Icon className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-navy">
        {service.title}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
        {service.blurb}
      </p>

      <ul className="mt-4 space-y-2">
        {service.details.map((d) => (
          <li key={d} className="flex items-center gap-2 text-sm text-slate-700">
            <Check className="h-4 w-4 shrink-0 text-lime-dark" aria-hidden="true" />
            {d}
          </li>
        ))}
      </ul>

      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
            {service.more}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-bold text-navy transition-colors hover:text-lime-dark"
      >
        {open ? (
          <>
            <Minus className="h-4 w-4" aria-hidden="true" /> Show Less
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" aria-hidden="true" /> Learn More
          </>
        )}
      </button>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wide text-lime-dark">
            What we do
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            One team for every job around the home
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Three core trades under one roof — so you only need one number saved.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
