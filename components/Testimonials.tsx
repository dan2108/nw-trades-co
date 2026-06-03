import { Star } from "lucide-react";
import SectionHeading from "./SectionHeading";

type Review = {
  quote: string;
  name: string;
  town: string;
  job: string;
};

const FEATURED: Review = {
  quote:
    "Sorted our boiler out same day, turned up on time and the price was exactly as quoted. Can't ask for more.",
  name: "Mike T",
  town: "Wigan",
  job: "Boiler repair",
};

const REVIEWS: Review[] = [
  {
    quote:
      "Full rewire on a 1930s semi. Tidy work, explained everything as they went and left the place spotless.",
    name: "Sarah Whitfield",
    town: "Bolton",
    job: "Full house rewire",
  },
  {
    quote:
      "Had our EV charger fitted in a couple of hours and they sorted the grant paperwork too. Easiest tradesperson I've dealt with.",
    name: "Daniel O'Connor",
    town: "Manchester",
    job: "EV charger install",
  },
  {
    quote:
      "Built our single-storey extension start to finish. Stuck to the timeline, no nasty surprises on cost.",
    name: "Priya Sharma",
    town: "Preston",
    job: "Kitchen extension",
  },
];

function Initials({ name }: { name: string }) {
  const letters = name
    .split(" ")
    .map((p) => p[0])
    .join("");
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-bold text-lime ring-1 ring-inset ring-lime/20">
      {letters}
    </span>
  );
}

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-lime text-lime" aria-hidden="true" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="02"
            eyebrow="See our work"
            title="Trusted by homeowners across the North West"
          />
          <div className="flex items-center gap-3 rounded-xl border border-ink/10 bg-white px-4 py-3 shadow-card">
            <span className="font-display text-3xl font-bold tracking-tight text-ink">
              4.9
            </span>
            <div>
              <Stars />
              <p className="mt-1 text-xs font-medium text-slate-500">
                from 120+ reviews
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Featured pull-quote */}
          <figure className="relative flex flex-col justify-between rounded-2xl border border-ink/10 bg-navy p-8 text-white shadow-card lg:col-span-1 lg:row-span-1">
            <div>
              <Stars />
              <blockquote className="mt-5 font-display text-xl font-semibold leading-snug tracking-tight">
                &ldquo;{FEATURED.quote}&rdquo;
              </blockquote>
            </div>
            <figcaption className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
              <Initials name={FEATURED.name} />
              <span className="text-sm">
                <span className="block font-bold text-white">
                  {FEATURED.name}, {FEATURED.town}
                </span>
                <span className="text-slate-400">{FEATURED.job}</span>
              </span>
            </figcaption>
          </figure>

          {/* Remaining reviews */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            {REVIEWS.map((r) => (
              <figure
                key={r.name}
                className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
              >
                <div>
                  <Stars />
                  <blockquote className="mt-4 text-[15px] leading-relaxed text-slate-700">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-4">
                  <Initials name={r.name} />
                  <span className="text-sm">
                    <span className="block font-bold text-ink">
                      {r.name}, {r.town}
                    </span>
                    <span className="text-slate-500">{r.job}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
