import { Wrench } from "lucide-react";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-lime text-navy">
        <Wrench className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight">
        NW Trades<span className="text-lime"> Co</span>
      </span>
    </span>
  );
}
