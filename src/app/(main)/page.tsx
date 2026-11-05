import Link from "next/link";
import { IconSchool, IconMapPin, IconSearch, IconArrowRight, IconStarFilled } from "@tabler/icons-react";
import { tutors } from "@/data/mock";
import { Avatar, Pill } from "@/components/ui";


const steps = [
  ["Search & Filter", "Filter by subject, level, hourly budget, and availability for online or in-person lessons."],
  ["Chat & Book Trial", "Message tutors directly before confirming. Test mutual fit with a risk-free 30-minute introductory lesson."],
  ["Excel with Guidance", "Access collaborative notes, lesson recordings, and structured progress tracking inside your student hub."],
];

export default function Landing() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden border-b border-border px-6 pb-24 pt-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[340px] w-[720px] -translate-x-1/2 rounded-full bg-primary-soft opacity-40 blur-[64px]" />
        <div className="relative mx-auto flex max-w-[900px] flex-col items-center gap-4 text-center">
          <span className="flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted shadow-sm">
            <span className="size-1.5 rounded-full bg-success" />Direct 1-on-1 Academic Mentorship
          </span>
          <h1 className="pt-2 text-[40px] font-bold leading-[48px] tracking-[-1px]">Find the right tutor for your goals</h1>
          <p className="max-w-[672px] pb-4 text-base text-muted">Connect with verified expert tutors for 1-on-1 private lessons in-person or online. Guaranteed fit with trial booking.</p>
          <form action="/tutors" className="grid w-full grid-cols-12 gap-3 rounded-xl border border-border bg-white p-3 shadow-sm">
            <label className="col-span-12 flex h-14 items-center gap-2 rounded-lg border border-border px-3 text-left md:col-span-5">
              <IconSchool size={18} className="text-muted" />
              <span className="flex-1"><span className="eyebrow block text-[11px]">Subject or topic</span>
                <input name="q" placeholder="Mathematics, Physics, SAT..." className="w-full text-sm font-medium outline-none placeholder:text-ink" /></span>
            </label>
            <label className="col-span-12 flex h-14 items-center gap-2 rounded-lg border border-border px-3 text-left md:col-span-4">
              <IconMapPin size={18} className="text-muted" />
              <span className="flex-1"><span className="eyebrow block text-[11px]">Lesson mode</span>
                <input name="loc" placeholder="Online or City / Zip" className="w-full text-sm font-medium outline-none placeholder:text-faint" /></span>
            </label>
            <button className="btn-primary col-span-12 min-h-[46px] md:col-span-3"><IconSearch size={15} />Search Tutors</button>
          </form>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="pr-1 text-muted">Popular Subjects:</span>
            {["Mathematics", "Physics", "English", "Chemistry"].map((s) => (
              <Link key={s} href={`/tutors?q=${s}`} className="rounded-full bg-border/40 px-3.5 py-1 text-sm font-medium text-ink-2 hover:bg-border">{s}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface-2/40 px-6 py-8">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 text-center sm:grid-cols-3 sm:divide-x sm:divide-border">
          {[["10,000+", "Sessions successfully completed"], ["4.9/5 ★", "Average verified student rating"], ["100%", "Background-checked and certified mentors"]].map(([n, l]) => (
            <div key={l}><div className="text-[32px] font-bold leading-[38px] tracking-[-0.8px]">{n}</div><div className="text-muted">{l}</div></div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary-dark"><IconSchool size={14} />Curated instruction</div>
              <h2 className="pt-1 text-[32px] font-bold tracking-[-0.8px]">Top-Rated Tutors Ready to Help</h2>
              <p className="max-w-xl text-muted">Meet top university graduates and vetted educators prepared to customize curriculum to your pace.</p>
            </div>
            <Link href="/tutors" className="flex items-center gap-1 font-medium text-primary">Browse all 1,200+ tutors <IconArrowRight size={14} /></Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {tutors.slice(0, 3).map((t) => (
              <article key={t.tutorProfileId} className="card flex flex-col justify-between p-5">
                <div className="space-y-3 pb-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3"><Avatar name={t.name} size={56} />
                      <div><h3 className="font-semibold">{t.name}</h3><p className="text-xs font-medium text-muted">{t.subjects.slice(0, 2).join(" & ")}</p></div></div>
                    <div className="text-primary"><b className="text-base font-semibold">${Math.round(t.rate / 18)}</b><span className="text-xs text-muted">/hr</span></div>
                  </div>
                  <div className="flex gap-1.5"><Pill tone="green">Verified Pro</Pill><Pill tone={t.badge === "TOP 1% TUTOR" ? "orange" : "gray"}>{t.badge === "TOP 1% TUTOR" ? "Top 1%" : "Quick responder"}</Pill></div>
                  <div className="flex items-center gap-2"><IconStarFilled size={15} className="text-amber-400" /><b>{t.rating.toFixed(1)}</b><span className="text-xs text-muted">({t.reviews} reviews)</span></div>
                  <p className="text-muted">{t.bio}</p>
                </div>
                <div className="flex gap-2 border-t border-border pt-4">
                  <Link href={`/tutors/${t.tutorProfileId}`} className="btn-outline flex-1">View Profile</Link>
                  <Link href={`/tutors/${t.tutorProfileId}#book`} className="btn-primary flex-1">Book Trial</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 pb-16 pt-16">
        <div className="mx-auto max-w-[1100px] text-center">
          <h2 className="text-2xl font-semibold tracking-tight">How TewsDay Works</h2>
          <p className="mb-12 text-muted">Simple, transparent, and built for focused academic improvement.</p>
          <div className="grid gap-8 text-left md:grid-cols-3">
            {steps.map(([h, p], i) => (
              <div key={h} className="card p-6">
                <span className="grid size-10 place-items-center rounded-lg bg-primary-soft font-bold text-primary">{i + 1}</span>
                <h3 className="pt-4 text-lg font-semibold tracking-tight">{h}</h3>
                <p className="pt-2 text-muted">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
