export default function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  light = false,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3">
        <span
          className={`font-display text-sm font-semibold tabular-nums ${
            light ? "text-lime" : "text-lime-dark"
          }`}
        >
          {index}
        </span>
        <span
          className={`h-px w-8 ${light ? "bg-white/25" : "bg-ink/20"}`}
          aria-hidden="true"
        />
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
            light ? "text-slate-300" : "text-slate-500"
          }`}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className={`mt-5 font-display text-[2rem] font-bold leading-[1.08] tracking-tightest sm:text-4xl lg:text-[2.75rem] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
