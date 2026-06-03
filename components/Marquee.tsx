const TOWNS = [
  "Wigan",
  "Bolton",
  "Manchester",
  "Preston",
  "Liverpool",
  "Warrington",
  "Chester",
  "Bury",
  "Salford",
  "Wirral",
  "St Helens",
  "Leigh",
];

export default function Marquee() {
  // Duplicated once so the -50% translate loops seamlessly.
  const items = [...TOWNS, ...TOWNS];
  return (
    <div
      className="flex overflow-hidden border-y border-white/10 bg-navy-900 py-3"
      aria-hidden="true"
    >
      <div className="flex shrink-0 items-center gap-0 whitespace-nowrap motion-safe:animate-marquee motion-reduce:animate-none">
        {items.map((town, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              {town}
            </span>
            <span className="h-1 w-1 rounded-full bg-lime/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
