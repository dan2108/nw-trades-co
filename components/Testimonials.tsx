import { Star, Quote } from "lucide-react";

type Review = {
  quote: string;
  name: string;
  town: string;
  job: string;
  stars: number;
};

const REVIEWS: Review[] = [
  {
    quote:
      "Sorted our boiler out same day, turned up on time and price was exactly as quoted. Can't ask for more.",
    name: "Mike T",
    town: "Wigan",
    job: "Boiler repair",
    stars: 5,
  },
  {
    quote:
      "Full rewire on a 1930s semi. Tidy work, explained everything as they went and left the place spotless. Proper professionals.",
    name: "Sarah Whitfield",
    town: "Bolton",
    job: "Full house rewire",
    stars: 5,
  },
  {
    quote:
      "Had our EV charger fitted in a couple of hours. Sorted the grant paperwork too. Genuinely the easiest tradesperson I've dealt with.",
    name: "Daniel O'Connor",
    town: "Manchester",
    job: "EV charger install",
    stars: 5,
  },
  {
    quote:
      "They built our single-storey extension start to finish. Stuck to the timeline, no nasty surprises on cost. Couldn't recommend them more.",
    name: "Priya Sharma",
    town: "Preston",
    job: "Kitchen extension",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < count ? "fill-lime text-lime" : "text-slate-300"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wide text-lime-dark">
            See our work
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Trusted by homeowners across the North West
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Real jobs, real results. Here&apos;s what our customers say.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <Quote
                className="absolute right-5 top-5 h-8 w-8 text-slate-100"
                aria-hidden="true"
              />
              <Stars count={r.stars} />
              <blockquote className="mt-4 grow text-[15px] leading-relaxed text-slate-700">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-display text-sm font-bold text-lime">
                  {r.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </span>
                <span className="text-sm">
                  <span className="block font-bold text-navy">
                    {r.name}, {r.town}
                  </span>
                  <span className="text-slate-500">{r.job}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
