"use client";

import { useState } from "react";
import { Droplets, Zap, Hammer, ArrowUpRight, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";

type Service = {
  num: string;
  icon: LucideIcon;
  title: string;
  blurb: string;
  details: string[];
  more: string;
};

const SERVICES: Service[] = [
  {
    num: "01",
    icon: Droplets,
    title: "Plumbing",
    blurb: "From burst pipes to full bathroom fit-outs — sorted properly, first time.",
    details: ["Emergency repairs", "Boiler installs & servicing", "Bathroom fitting"],
    more:
      "Gas Safe registered engineers on call for leaks, blockages and no-heat emergencies. We supply and install boilers from all major brands and fit complete bathrooms — tiling, plumbing and waste included.",
  },
  {
    num: "02",
    icon: Zap,
    title: "Electrical",
    blurb: "Safe, certified electrical work — from a single socket to a full rewire.",
    details: ["Consumer units", "Full & partial rewires", "EV charger installs"],
    more:
      "NICEIC-approved electricians handling fuse board upgrades, fault finding and rewires to current 18th Edition standards. OZEV-approved EV charge point installation with grant guidance where eligible.",
  },
  {
    num: "03",
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
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white p-7 shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      {/* Top accent rule reveals on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-lime transition-transform duration-300 group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-lime">
          <Icon className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
        </span>
        <span className="font-display text-sm font-semibold tabular-nums text-ink/25">
          {service.num}
        </span>
      </div>

      <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink">
        {service.title}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
        {service.blurb}
      </p>

      <ul className="mt-5 space-y-2.5">
        {service.details.map((d) => (
          <li key={d} className="flex items-center gap-2.5 text-sm text-slate-700">
            <Check className="h-4 w-4 shrink-0 text-lime-dark" strokeWidth={2.5} aria-hidden="true" />
            {d}
          </li>
        ))}
      </ul>

      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="border-t border-ink/10 pt-4 text-sm leading-relaxed text-slate-600">
            {service.more}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-bold text-ink transition-colors hover:text-lime-dark"
      >
        {open ? "Show less" : "Learn more"}
        <ArrowUpRight
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-90" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          }`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          eyebrow="What we do"
          title="One team for every job around the home"
          intro="Three core trades under one roof — so you only need one number saved."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
