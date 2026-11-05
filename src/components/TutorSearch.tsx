"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { IconSearch, IconList, IconMap, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { tutors } from "@/data/mock";
import { TutorCard } from "./TutorCard";
import { cn, baht } from "@/lib/cn";

export function TutorSearch({ initialQ = "" }: { initialQ?: string }) {
  const [q, setQ] = useState(initialQ);
  const [mode, setMode] = useState<"all" | "online" | "onsite">("all");
  const [maxRate, setMaxRate] = useState(1400);
  const [view, setView] = useState<"list" | "map">("list");
  const [sort, setSort] = useState("rec");

  const list = useMemo(() => {
    let r = tutors.filter((t) =>
      (!q || (t.name + t.subjects.join(" ") + t.bio).toLowerCase().includes(q.toLowerCase())) &&
      t.rate <= maxRate &&
      (mode === "all" || (mode === "online" ? t.teachingLocationType !== "onsite" : t.teachingLocationType !== "online")));
    if (sort === "low") r = [...r].sort((a, b) => a.rate - b.rate);
    if (sort === "high") r = [...r].sort((a, b) => b.rate - a.rate);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [q, mode, maxRate, sort]);

  const chip = (active: boolean) => cn("rounded-full border px-3 py-1 text-xs", active ? "border-primary text-primary" : "border-border text-ink-2 hover:bg-surface-2");

  return (
    <>
      <div className="border-b border-border bg-white">
        <div className="container-page space-y-3 py-4">
          <div className="flex flex-wrap gap-3">
            <label className="flex min-w-[260px] flex-1 items-center gap-2 rounded-lg border border-border px-3 py-2.5">
              <IconSearch size={16} className="text-muted" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Calculus, SAT & IGCSE" className="w-full text-sm outline-none" />
            </label>
            <select className="input w-40"><option>Mathematics</option><option>Physics</option><option>English</option></select>
            <select className="input w-36"><option>4.8+ stars</option><option>4.5+ stars</option></select>
            <div className="flex rounded-lg border border-border p-0.5">
              {(["list", "map"] as const).map((v) => (
                <button key={v} onClick={() => setView(v)} className={cn("flex items-center gap-1 rounded-md px-3 text-xs font-medium", view === v ? "bg-primary text-white" : "text-muted")}>
                  {v === "list" ? <IconList size={14} /> : <IconMap size={14} />}{v === "list" ? "List" : "Map"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-3 text-xs">
            <span className="text-muted">Mode:</span>
            {(["all", "online", "onsite"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} className={chip(mode === m)}>{m === "all" ? "All" : m === "online" ? "Online" : "Onsite / In-person"}</button>
            ))}
            <span className="ml-auto text-muted">Rate:</span>
            <input type="range" min={400} max={1400} step={50} value={maxRate} onChange={(e) => setMaxRate(+e.target.value)} className="w-40 accent-primary" />
            <span className="rounded border border-border bg-surface-1 px-2 py-0.5 font-medium">{baht(400)} - {baht(maxRate)} / hr</span>
            <button onClick={() => { setQ(""); setMode("all"); setMaxRate(1400); }} className="text-muted hover:text-primary">Reset</button>
          </div>
        </div>
      </div>
      <div className="border-b border-border bg-white">
        <div className="container-page flex items-center justify-between py-3">
          <p className="flex items-center gap-2 text-sm"><span className="size-2 rounded-full bg-success" />Showing <b className="text-primary">248 vetted tutors</b> matching your criteria</p>
          <label className="flex items-center gap-3 text-xs text-muted">Sort by:
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent font-medium text-ink outline-none">
              <option value="rec">Recommended</option><option value="rating">Top rated</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>
      <div className="container-page py-8">
        {view === "map" ? (
          <div className="grid h-[420px] place-items-center rounded-xl border border-dashed border-border bg-surface-2 text-muted">Map radius view (PostGIS) — connect map provider in a later sprint.</div>
        ) : list.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{list.map((t) => <TutorCard key={t.tutorProfileId} t={t} />)}</div>
        ) : (
          <p className="py-20 text-center text-muted">No tutors match your filters.</p>
        )}
        <div className="mt-10 flex items-center justify-between border-t border-border pt-6 text-xs text-muted">
          <span>Showing 1 – {list.length} of 248 tutors</span>
          <div className="flex items-center gap-1.5 text-sm">
            <button className="grid size-9 place-items-center rounded-lg border border-border bg-white"><IconChevronLeft size={14} /></button>
            {[1, 2, 3].map((p) => <button key={p} className={cn("size-9 rounded-lg border", p === 1 ? "border-primary bg-primary text-white" : "border-border bg-white")}>{p}</button>)}
            <span>…</span><button className="size-9 rounded-lg border border-border bg-white">42</button>
            <button className="grid size-9 place-items-center rounded-lg border border-border bg-white"><IconChevronRight size={14} /></button>
          </div>
          <button className="btn-outline text-xs">Load More Tutors</button>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary-soft p-6">
          <div><h3 className="text-lg font-semibold">Can&apos;t find your ideal tutor or specific subject?</h3>
            <p className="text-muted">Post a tutor request for free and let our academic matching team handpick verified tutors tailored to your syllabus.</p></div>
          <Link href="/request" className="btn-primary px-6">Request Tutor</Link>
        </div>
      </div>
    </>
  );
}
