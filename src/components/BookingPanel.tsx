"use client";
import { useState } from "react";
import { IconShieldCheck } from "@tabler/icons-react";
import { toast } from "sonner";
import { cn, baht } from "@/lib/cn";

const types = [
  { id: "trial", name: "30-min Trial Lesson", sub: "Introductory consultation & assessment", price: 600 },
  { id: "std", name: "60-min Standard Session", sub: "Full deep dive & exercise review", price: 1200 },
  { id: "bundle", name: "5-Session Bundle", sub: "Save 10% (฿1,080 / hr)", price: 5400 },
];
export function BookingPanel({ rate }: { rate: number }) {
  const [mode, setMode] = useState("online");
  const [type, setType] = useState("std");
  return (
    <aside id="book" className="card space-y-4 p-5">
      <div className="flex items-baseline justify-between">
        <div><span className="text-2xl font-bold">{baht(rate)}</span><span className="text-xs text-muted"> / hr</span></div>
        <span className="pill bg-primary-soft text-primary border border-primary/20">Trial: ฿600</span>
      </div>
      <div><p className="eyebrow mb-2">Teaching Modes</p>
        {[["online", "Online (Interactive Zoom + Whiteboard)", "High-speed screen recording included"], ["onsite", "In-Person / Onsite", "Bangkok: Sukhumvit, Ari, Pathum Wan"]].map(([id, n, s]) => (
          <button key={id} onClick={() => setMode(id)} className={cn("mb-2 flex w-full items-start gap-2 rounded-lg border p-2.5 text-left", mode === id ? "border-primary bg-primary-soft/50" : "border-border")}>
            <span className={cn("mt-1 size-3 rounded-full border-2", mode === id ? "border-primary bg-primary" : "border-border")} />
            <span><span className="block text-xs font-medium">{n}</span><span className="text-[11px] text-muted">{s}</span></span>
          </button>))}
      </div>
      <div><p className="eyebrow mb-2">Choose Lesson Type</p>
        {types.map((t) => (
          <button key={t.id} onClick={() => setType(t.id)} className={cn("mb-2 flex w-full items-center justify-between rounded-lg border p-2.5 text-left", type === t.id ? "border-primary bg-primary-soft/50" : "border-border")}>
            <span><span className="block text-xs font-medium">{t.name}</span><span className="text-[11px] text-muted">{t.sub}</span></span>
            <b className={type === t.id ? "text-primary" : ""}>{baht(t.price)}</b>
          </button>))}
      </div>
      <button className="btn-primary w-full py-3" onClick={() => toast.success("Booking request sent — tutor has 48 hours to confirm.")}>Book Session Now</button>
      <p className="flex items-center justify-center gap-1 text-xs text-success"><IconShieldCheck size={14} />100% Satisfaction Guarantee or Free Trial Match</p>
    </aside>
  );
}
