"use client";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/cn";

const days = ["MON Oct 20", "TUE Oct 21", "WED Oct 22", "THU Oct 23", "FRI Oct 24", "SAT Oct 25", "SUN Oct 26"];
const slots: Record<number, [string, 0 | 1][]> = {
  0: [["09:00", 1], ["11:00", 1], ["14:00", 0], ["16:30", 1]], 1: [["09:00", 0], ["10:30", 1], ["15:00", 1], ["17:00", 0]],
  2: [["10:00", 1], ["12:30", 0], ["16:00", 1], ["18:00", 1]], 3: [["11:00", 1], ["14:00", 1], ["16:00", 1], ["18:00", 1]],
  4: [["09:30", 1], ["11:00", 1], ["16:00", 0], ["17:30", 1]], 5: [["10:00", 1], ["13:00", 1], ["15:00", 1], ["17:00", 0]],
  6: [["10:00", 0], ["13:30", 1], ["16:00", 0], ["18:00", 0]],
};
export function AvailabilityCalendar() {
  const [sel, setSel] = useState<string | null>("3-16:00");
  const [d, t] = sel ? sel.split("-") : [];
  return (
    <section className="card p-6">
      <h2 className="font-semibold">Weekly Availability Calendar</h2>
      <p className="mb-4 text-xs text-muted">Click an available time slot to start your reservation. (GMT+7 Bangkok)</p>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, i) => (
          <div key={day} className="space-y-2 text-center">
            <div className={cn("rounded-lg border py-2 text-xs", i === 3 ? "border-primary bg-primary-soft text-primary" : "border-border")}><b className="block">{day.split(" ")[0]}</b>{day.slice(4)}</div>
            {slots[i].map(([time, ok]) => {
              const id = `${i}-${time}`;
              return <button key={id} disabled={!ok} onClick={() => setSel(id)}
                className={cn("w-full rounded-md border py-1.5 text-xs", !ok ? "cursor-not-allowed bg-surface-1 text-faint line-through" : sel === id ? "border-primary bg-primary text-white" : "border-primary/30 bg-primary-soft text-primary hover:bg-primary/10")}>{time}</button>;
            })}
          </div>))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs">
        <span className="text-muted">Selected: <b className="text-primary">{sel ? `${days[+d]} · ${t}` : "—"}</b></span>
        <button disabled={!sel} onClick={() => toast.success("Slot reserved. Continue to confirm your booking.")} className="btn-primary px-5 py-1.5">Continue</button>
      </div>
    </section>
  );
}
