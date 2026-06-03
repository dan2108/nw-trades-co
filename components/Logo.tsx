import { Wrench } from "lucide-react";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-md bg-lime text-navy ring-1 ring-inset ring-black/10">
        <Wrench className="h-[18px] w-[18px]" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className="font-display text-[17px] font-bold leading-none tracking-tight">
        NW Trades<span className="text-lime">&nbsp;Co.</span>
      </span>
    </span>
  );
}
