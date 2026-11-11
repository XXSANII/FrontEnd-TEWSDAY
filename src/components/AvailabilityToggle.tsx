"use client";
import { useState } from "react";
import { cn } from "@/lib/cn";

export function AvailabilityToggle() {
  const [on, setOn] = useState(true);
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => setOn((v) => !v)}
      className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-border bg-white px-4 py-2 text-left transition-colors hover:bg-surface-2">
      <span className="text-xs leading-4"><b className="block">Instant requests</b><span className={on ? "text-success" : "text-muted-foreground"}>{on ? "Accepting bookings" : "Paused"}</span></span>
      <span className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", on ? "bg-primary" : "bg-faint")}>
        <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow transition-all", on ? "left-[22px]" : "left-0.5")} />
      </span>
    </button>
  );
}
