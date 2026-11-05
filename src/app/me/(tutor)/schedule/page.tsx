"use client";
import { useState } from "react";
import { toast } from "sonner";
import { IconVideo, IconMapPin, IconTrash, IconPlus } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { Progress } from "@/components/ui";

type Slot = { t: string; kind: "Online Classroom" | "Onsite BTS Thong Lo / Siam" | "Online or Onsite" };
const init: Record<string, Slot[]> = {
  Monday: [{ t: "09:00 - 11:30", kind: "Online Classroom" }, { t: "14:00 - 16:30", kind: "Onsite BTS Thong Lo / Siam" }, { t: "17:00 - 19:00", kind: "Online Classroom" }],
  Tuesday: [{ t: "16:00 - 18:00", kind: "Online Classroom" }, { t: "18:30 - 20:00", kind: "Online or Onsite" }],
  Wednesday: [{ t: "15:30 - 17:30", kind: "Onsite BTS Thong Lo / Siam" }, { t: "18:00 - 20:00", kind: "Online Classroom" }],
  Thursday: [],
  Friday: [{ t: "15:00 - 17:00", kind: "Online Classroom" }, { t: "17:30 - 19:00", kind: "Online Classroom" }],
  Saturday: [{ t: "09:30 - 12:00", kind: "Onsite BTS Thong Lo / Siam" }, { t: "13:00 - 15:30", kind: "Online or Onsite" }, { t: "16:00 - 18:00", kind: "Online Classroom" }],
  Sunday: [{ t: "10:00 - 12:30", kind: "Online Classroom" }, { t: "14:00 - 16:30", kind: "Onsite BTS Thong Lo / Siam" }],
};
const dur = (t: string) => {
  const [a, b] = t.split(" - ").map((x) => { const [h, m] = x.split(":").map(Number); return h + m / 60; });
  return b - a;
};
const sum = (sl: Slot[]) => sl.reduce((n, x) => n + dur(x.t), 0);

export default function Schedule() {
  const [days, setDays] = useState(init);
  const [on, setOn] = useState<Record<string, boolean>>(Object.fromEntries(Object.keys(init).map((d) => [d, d !== "Thursday"])));
  const [dirty, setDirty] = useState(false);
  const hours = Object.entries(days).reduce((n, [d, sl]) => n + (on[d] ? sum(sl) : 0), 0);
  const edit = (fn: () => void) => { fn(); setDirty(true); };
  return (
    <main className="pb-24">
      <div className="container-page py-8">
        <p className="pb-3 text-xs text-muted">Home › Tutor Suite › Availability & Schedule Manager</p>
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4"><div className="min-w-0 flex-1 basis-[420px]"><h1 className="text-[32px] font-bold tracking-tight">Tutor Availability & Schedule Manager</h1><p className="max-w-xl text-muted">Configure recurring weekly teaching hours and specific calendar blackout dates so students can book instant or requested lessons.</p></div><div className="flex shrink-0 gap-2 text-xs"><span className="btn-outline">ICT (GMT+7) • Bangkok</span><span className="btn-outline">G-Calendar Sync: <b className="text-success">Connected</b></span></div></div>
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            {Object.entries(days).map(([d, slots]) => (
              <section key={d} className={cn("card p-5", !on[d] && "bg-surface-2/60", (d === "Saturday" || d === "Sunday") && "border-primary/40")}>
                <div className="flex items-center justify-between"><div className="flex items-center gap-4"><button role="switch" aria-checked={on[d]} aria-label={`Toggle ${d}`} onClick={() => edit(() => setOn({ ...on, [d]: !on[d] }))} className={cn("relative h-6 w-11 rounded-full", on[d] ? "bg-primary" : "bg-border")}><span className={cn("absolute top-0.5 size-5 rounded-full bg-white transition-all", on[d] ? "right-0.5" : "left-0.5")} /></button><div><b className={cn("text-base", !on[d] && "text-muted")}>{d}</b><p className="text-xs text-muted">{on[d] ? `${slots.length} slots configured • ${sum(slots).toFixed(1)} hrs total` : "No recurring booking slots"}</p></div></div>{on[d] ? <span className="pill bg-success-soft text-success">Active day</span> : <span className="text-[11px] font-semibold uppercase text-muted">Unavailable / rest day</span>}</div>
                {on[d] && <div className="mt-4 flex flex-wrap gap-2">{slots.map((s, i) => <span key={i} className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs">{s.kind.startsWith("Onsite") ? <IconMapPin size={13} className="text-primary" /> : <IconVideo size={13} className="text-primary" />}<b>{s.t}</b>({s.kind})<button aria-label="Remove slot" onClick={() => edit(() => setDays({ ...days, [d]: slots.filter((_, j) => j !== i) }))}><IconTrash size={13} className="text-muted" /></button></span>)}
                  <button onClick={() => edit(() => setDays({ ...days, [d]: [...slots, { t: "19:00 - 21:00", kind: "Online Classroom" }] }))} className="flex items-center gap-1 rounded-lg border border-dashed border-primary/50 px-3 py-1.5 text-xs text-primary"><IconPlus size={13} />Add Time Slot</button></div>}
              </section>))}
          </div>
          <aside className="space-y-4">
            <div className="card p-5"><div className="flex justify-between"><b>Capacity & Potential</b><span className="rounded bg-surface-3 px-2 text-xs text-muted">Weekly</span></div><p className="flex justify-between py-3"><span className="text-muted">Weekly Open Capacity</span><b className="text-xl">{hours.toFixed(1)} <span className="text-xs font-normal text-muted">hrs/wk</span></b></p><Progress value={Math.min(100, (hours / 40) * 100)} />
              <div className="mt-4 rounded-lg border border-primary/20 bg-primary-soft/50 p-3"><p className="text-xs text-muted">Estimated Monthly Potential</p><b className="text-lg text-primary">฿78,000 – ฿104,000 <span className="text-xs font-normal text-muted">/ mo</span></b></div></div>
            <div className="card p-5 text-xs"><div className="flex justify-between pb-2"><b className="text-sm">Booking Rules & Buffers</b><span className="text-primary">Edit</span></div>{[["Notice Time", "Minimum advance booking", "4 hours"], ["Session Buffer", "Travel & lesson prep window", "30 mins"], ["Max Daily Lessons", "Burnout protection limit", "4 sessions"]].map(([a, b, c]) => <p key={a} className="flex justify-between py-2"><span><b className="text-sm">{a}</b><br /><span className="text-muted">{b}</span></span><span className="h-fit rounded bg-surface-3 px-2 py-0.5">{c}</span></p>)}</div>
            <div className="card p-5 text-xs"><b className="text-sm">Calendar Integration</b><p className="my-3 rounded-lg bg-surface-2 p-3"><b>Google Calendar</b><br />elena.rostova.tutor@gmail.com</p><p className="text-muted">2-way automatic conflict detection active. Existing personal commitments will block booking slots instantly.</p><button className="btn-outline mt-3 w-full">Sync Now</button></div>
          </aside>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-white"><div className="container-page flex items-center justify-between py-3"><span className="text-xs text-primary">{dirty ? <>● Unsaved changes: Total {hours.toFixed(1)} hrs/wk</> : <span className="text-muted">All changes saved</span>}</span><div className="flex gap-3"><button className="btn-outline" onClick={() => { setDays(init); setDirty(false); }}>Discard</button><button disabled={!dirty} className="btn-primary" onClick={() => { setDirty(false); toast.success("Availability published (me_003_e)."); }}>Save Availability & Publish Slots</button></div></div></div>
    </main>
  );
}
