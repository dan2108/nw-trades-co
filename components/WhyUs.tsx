import { Award, ShieldCheck, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const POINTS: { icon: LucideIcon; title: string; sub: string }[] = [
  {
    icon: Award,
    title: "10+ Years Experience",
    sub: "A decade of trusted work across the North West.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured & Certified",
    sub: "Gas Safe, NICEIC registered and fully insured.",
  },
  {
    icon: Clock,
    title: "Free Same-Day Quotes",
    sub: "Call before noon and we'll quote the same day.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-navy py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {POINTS.map(({ icon: Icon, title, sub }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-lime/15 text-lime ring-1 ring-lime/25">
                <Icon className="h-7 w-7" strokeWidth={2.25} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
              <p className="mt-1 text-sm text-slate-300">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
