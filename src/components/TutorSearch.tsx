"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { IconSearch, IconMap, IconList, IconX, IconAdjustmentsHorizontal, IconMoodSearch, IconArrowRight } from "@tabler/icons-react";
import { searchTutors, searchSubjects, type Tutor, type Subject } from "@/lib/tutors";
import { TutorCard } from "./TutorCard";
import { Chip } from "./form";
import { cn, baht } from "@/lib/cn";

const MAX_RATE = 1400; // slider max means "no limit"

export function TutorSearch() {
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState<Subject | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tries, setTries] = useState(0);
  const [mode, setMode] = useState<"all" | "online" | "onsite">("all");
  const [maxRate, setMaxRate] = useState(MAX_RATE);
  const [minRating, setMinRating] = useState(0);
  const [view, setView] = useState<"list" | "map">("list");
  const [sort, setSort] = useState("rec");
  const [open, setOpen] = useState(false);

  // Links like /tutors?q=Physics prefill the search. Read it on the client so the page stays static.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("q");
    if (p) setQ(p);
  }, []);

  useEffect(() => {
    searchSubjects().then((r) => setSubjects(r.data)).catch(() => setSubjects([]));
  }, []);

  // Subject, keyword, format, price and price sorting run on the server; rating filter/sort run here.
  useEffect(() => {
    let stale = false;
    const t = setTimeout(() => {
      setLoading(true);
      searchTutors({
        keyword: q.trim() || undefined,
        subjectId: subject?.subjectId,
        teachingLocationType: mode === "all" ? undefined : mode,
        maxHourlyRate: maxRate < MAX_RATE ? maxRate : undefined,
        ...(sort === "low" ? { sortKey: "hourlyRate", sortAsc: true } : sort === "high" ? { sortKey: "hourlyRate", sortAsc: false } : {}),
      })
        .then((r) => { if (!stale) { setTutors(r.data); setError(""); } })
        .catch((e) => { if (!stale) setError(e instanceof Error ? e.message : "Could not load tutors."); })
        .finally(() => { if (!stale) setLoading(false); });
    }, 250);
    return () => { stale = true; clearTimeout(t); };
  }, [q, subject, mode, maxRate, sort, tries]);

  const list = useMemo(() => {
    const r = tutors.filter((t) => t.averageRating >= minRating);
    return sort === "rating" ? [...r].sort((a, b) => b.averageRating - a.averageRating) : r;
  }, [tutors, minRating, sort]);

  const dirty = !!q || !!subject || mode !== "all" || maxRate !== MAX_RATE || minRating !== 0;
  const reset = () => { setQ(""); setSubject(null); setMode("all"); setMaxRate(MAX_RATE); setMinRating(0); };

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary-soft to-white">
        <div className="bg-notebook pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <div className="container-page relative py-10 sm:py-14">
          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-5xl sm:leading-[1.1]">Find a tutor who <span className="highlight">fits you</span></h1>
          <p className="mt-3 max-w-xl text-muted-foreground">Verified tutors for every subject and level. Message them, then try a 30-minute trial lesson.</p>
          <label className="relative mt-6 block max-w-2xl">
            <span className="sr-only">Search by subject, exam or tutor name</span>
            <IconSearch size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a subject, exam or tutor, e.g. IELTS" className="input min-h-14 rounded-2xl pl-12 pr-12 text-base shadow-[var(--shadow-card)]" />
            {q && <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-xl text-muted-foreground hover:bg-surface-2"><IconX size={18} /></button>}
          </label>
          <div className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Subjects">
            <Chip active={!subject} onClick={() => setSubject(null)} className="shrink-0">All subjects</Chip>
            {subjects.map((s) => <Chip key={s.subjectId} active={subject?.subjectId === s.subjectId} onClick={() => setSubject(s)} className="shrink-0">{s.name}</Chip>)}
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-20 border-b border-border bg-white/90 backdrop-blur">
        <div className="container-page flex flex-wrap items-center gap-3 py-3">
          <p className="mr-auto text-sm" aria-live="polite"><b className="text-primary">{loading ? "…" : list.length}</b> {list.length === 1 ? "tutor" : "tutors"} found</p>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className={cn("btn-outline", open && "border-primary bg-primary-soft text-primary-dark")}><IconAdjustmentsHorizontal size={16} />Filters{dirty && <span className="size-2 rounded-full bg-primary" />}</button>
          <label className="sr-only" htmlFor="sort">Sort by</label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="input w-auto min-w-40 py-1.5 text-sm font-medium">
            <option value="rec">Recommended</option><option value="rating">Top rated</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
          </select>
          <div className="hidden rounded-xl border border-border p-0.5 sm:flex" role="group" aria-label="View">
            {(["list", "map"] as const).map((v) => (
              <button key={v} type="button" onClick={() => setView(v)} aria-pressed={view === v} className={cn("flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-sm font-semibold", view === v ? "bg-primary text-white" : "text-muted-foreground hover:text-ink")}>
                {v === "list" ? <IconList size={15} /> : <IconMap size={15} />}{v === "list" ? "List" : "Map"}
              </button>
            ))}
          </div>
        </div>
        {open && (
          <div className="animate-step border-t border-border bg-surface-1">
            <div className="container-page grid gap-6 py-5 md:grid-cols-3">
              <fieldset><legend className="label">Lesson format</legend>
                <div className="flex flex-wrap gap-2">{(["all", "online", "onsite"] as const).map((m) => <Chip key={m} active={mode === m} onClick={() => setMode(m)}>{m === "all" ? "Any" : m === "online" ? "Online" : "In person"}</Chip>)}</div></fieldset>
              <fieldset><legend className="label">Minimum rating</legend>
                <div className="flex flex-wrap gap-2">{[[0, "Any"], [4.5, "4.5+"], [4.8, "4.8+"], [5, "5.0"]].map(([v, l]) => <Chip key={l} active={minRating === v} onClick={() => setMinRating(v as number)}>{l}</Chip>)}</div></fieldset>
              <div><label className="label flex justify-between" htmlFor="rate"><span>Max price per hour</span><b className="text-primary">{baht(maxRate)}</b></label>
                <input id="rate" type="range" min={400} max={MAX_RATE} step={50} value={maxRate} onChange={(e) => setMaxRate(+e.target.value)} className="h-10 w-full accent-primary" /></div>
            </div>
          </div>
        )}
      </div>

      <div className="container-page py-8">
        {view === "map" ? (
          <div className="grid h-[420px] place-items-center rounded-2xl border border-dashed border-border bg-surface-2 text-muted-foreground">Map view will be connected to a map provider in a later sprint.</div>
        ) : error ? (
          <div className="mx-auto max-w-md py-16 text-center" role="alert"><h2 className="text-xl font-bold">Couldn&apos;t load tutors</h2><p className="mt-1 text-muted-foreground">{error}</p><button onClick={() => setTries((n) => n + 1)} className="btn-outline mt-4">Try again</button></div>
        ) : loading && !tutors.length ? (
          <div className="py-16 text-center text-muted-foreground">Loading tutors…</div>
        ) : list.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{list.map((t) => <TutorCard key={t.tutorProfileId} t={t} />)}</div>
        ) : (
          <div className="mx-auto max-w-md py-16 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary"><IconMoodSearch size={32} /></span>
            <h2 className="mt-4 text-xl font-bold">No tutors match yet</h2>
            <p className="mt-1 text-muted-foreground">Try removing a filter, or tell us what you need and we&apos;ll find a tutor for you.</p>
            <div className="mt-5 flex justify-center gap-3"><button onClick={reset} className="btn-outline">Clear filters</button><Link href="/request" className="btn-primary">Request a tutor</Link></div>
          </div>
        )}

        <div className="relative mt-12 overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground sm:p-10">
          <div className="bg-notebook pointer-events-none absolute inset-0 opacity-20 invert" />
          <div className="relative flex flex-wrap items-center justify-between gap-5">
            <div className="max-w-xl"><h2 className="text-2xl font-extrabold tracking-tight">Not sure who to pick?</h2>
              <p className="mt-1 opacity-90">Tell us your goal and we&apos;ll bring verified tutors to you. It&apos;s free and takes a minute.</p></div>
            <Link href="/request" className="btn min-h-12 bg-white px-6 text-base text-primary-dark hover:bg-primary-soft">Get matched<IconArrowRight size={18} /></Link>
          </div>
        </div>
      </div>
    </>
  );
}
