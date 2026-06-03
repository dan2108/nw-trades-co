import { Award, ShieldCheck, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const POINTS: {
  icon: LucideIcon;
  stat: string;
  title: string;
  sub: string;
}[] = [
  {
    icon: Award,
    stat: "10+",
    title: "Years experience",
    sub: "A decade of trusted work across the North West.",
  },
  {
    icon: ShieldCheck,
    stat: "100%",
    title: "Insured & certified",
    sub: "Gas Safe and NICEIC registered, fully insured.",
  },
  {
    icon: Clock,
    stat: "Same-day",
    title: "Free quotes",
    sub: "Call before noon and we'll quote the same day.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="grain relative overflow-hidden bg-navy py-16 text-white sm:py-20">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {POINTS.map(({ icon: Icon, stat, title, sub }) => (
            <div
              key={title}
              className="flex flex-col py-8 first:pt-0 sm:px-8 sm:py-0 sm:first:pl-0"
            >
              <Icon className="h-6 w-6 text-lime" strokeWidth={2} aria-hidden="true" />
              <span className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                {stat}
              </span>
              <span className="mt-2 font-display text-lg font-semibold text-white">
                {title}
              </span>
              <span className="mt-1 text-sm leading-relaxed text-slate-400">
                {sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
