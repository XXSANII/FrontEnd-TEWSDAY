import Link from "next/link";
import { IconArrowLeft, IconVideo, IconCalendarPlus, IconCalendarEvent, IconMessageCircle, IconCheck, IconDownload, IconFileText, IconChevronDown, IconStarFilled, IconFlag, IconReceipt } from "@tabler/icons-react";
import { Avatar, Pill, Progress } from "@/components/ui";

const lessons = [
  { n: 1, title: "Diagnostic & curriculum mapping", when: "Oct 17 · 90 min", state: "done" },
  { n: 2, title: "Integration drills & improper integrals", when: "Thu, Oct 24 · 16:00", state: "next" },
  { n: 3, title: "Series, polar coordinates and 3 full mocks", when: "Weekly until Dec 19", state: "later" },
] as const;

const facts = [
  ["Rate", "฿1,200", "per hour"],
  ["Lessons", "10", "15 hours total"],
  ["Total", "฿18,000", "paid to tutor"],
  ["Paid so far", "฿1,800", "1 lesson"],
] as const;

// Mock data: a real build would load the booking by the route id.
const id = "BK-1042";

export default function BookingPage() {
  return (
    <main className="container-page max-w-5xl space-y-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/me" className="inline-flex min-h-10 items-center gap-1.5 font-semibold text-primary hover:underline"><IconArrowLeft size={16} />Back to dashboard</Link>
        <span className="text-sm text-muted-foreground">Booking #{id}</span>
      </div>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Pill tone="green">● Active course</Pill>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">AP Calculus BC</h1>
          <p className="mt-1 text-muted-foreground">Full exam mastery package · 10 lessons</p>
        </div>
        <Link href="/me/chat" className="flex items-center gap-3 rounded-2xl border border-border bg-white p-3 pr-4 hover:border-primary/40">
          <Avatar name="Elena Rostova" size={48} online />
          <span className="leading-5"><b className="block">Dr. Elena Rostova</b><span className="flex items-center gap-1 text-xs text-muted-foreground"><IconStarFilled size={12} className="text-amber-400" />4.98 · Message</span></span>
          <IconMessageCircle size={20} className="text-primary" />
        </Link>
      </header>

      <section aria-label="Next lesson" className="card border-primary/30 bg-primary-soft p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <span className="pill bg-white normal-case text-primary-dark">Next lesson · Lesson 2 of 10</span>
            <p className="mt-2 text-2xl font-extrabold tracking-tight">Thursday, Oct 24</p>
            <p className="text-muted-foreground">16:00 – 17:30 · Starts in 2 days</p>
          </div>
          <div className="flex w-full flex-wrap gap-2 sm:w-auto">
            <Link href="/me/chat" className="btn-primary min-h-12 flex-1 px-6 sm:flex-none"><IconVideo size={18} />Join classroom</Link>
            <button className="btn-outline min-h-12" type="button"><IconCalendarPlus size={18} />Add to calendar</button>
            <button className="btn-outline min-h-12" type="button"><IconCalendarEvent size={18} />Reschedule</button>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Free rescheduling when you give 48 hours&apos; notice.</p>
      </section>

      <section aria-label="Progress" className="card p-5 sm:p-6">
        <div className="mb-3 flex items-end justify-between"><h2 className="text-lg font-bold">Your progress</h2><span className="text-sm text-muted-foreground"><b className="text-ink">1</b> of 10 lessons done</span></div>
        <Progress value={10} />
        <ol className="mt-5 space-y-2">
          {lessons.map((l) => (
            <li key={l.n} className={`flex items-center gap-3 rounded-xl border p-3 ${l.state === "next" ? "border-primary/40 bg-primary-soft/50" : "border-border"}`}>
              <span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold ${l.state === "done" ? "bg-success-soft text-success" : l.state === "next" ? "bg-primary text-white" : "bg-surface-3 text-muted-foreground"}`}>
                {l.state === "done" ? <IconCheck size={16} /> : l.state === "later" ? "3+" : l.n}
              </span>
              <span className="min-w-0 flex-1"><b className="block truncate text-sm">{l.title}</b><span className="text-xs text-muted-foreground">{l.when}</span></span>
              {l.state === "done" && <Pill tone="green">Done</Pill>}
              {l.state === "next" && <Pill tone="orange">Up next</Pill>}
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="Cost" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {facts.map(([k, v, s]) => (
          <div key={k} className="card p-4"><p className="text-xs text-muted-foreground">{k}</p><b className="text-xl font-extrabold sm:text-2xl">{v}</b><p className="text-xs text-muted-foreground">{s}</p></div>
        ))}
      </section>

      <details className="card group p-5 sm:p-6">
        <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3">
          <span className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary"><IconFileText size={20} /></span><span><b className="block">Tutoring agreement</b><span className="text-xs text-muted-foreground">Signed by both parties · #CON-{id}-BC</span></span></span>
          <IconChevronDown size={20} className="text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div className="pt-4">
          {[["Somchai Chavalit (Guardian for Ploy C.)", "Oct 22 · 15:42"], ["Dr. Elena Rostova (Tutor)", "Oct 22 · 16:05"]].map(([n, d]) => (
            <p key={n} className="flex justify-between gap-3 border-b border-border py-2.5 text-sm"><span className="flex items-center gap-2"><IconCheck size={16} className="text-success" />{n}</span><span className="text-muted-foreground">{d}</span></p>
          ))}
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="btn-primary" type="button"><IconDownload size={16} />Download signed PDF</button>
            <Link href="/me/invoices" className="btn-outline"><IconReceipt size={16} />Billing</Link>
          </div>
        </div>
      </details>

      <p className="text-center text-sm text-muted-foreground">Something wrong with this booking? <button type="button" className="inline-flex min-h-10 items-center gap-1 font-semibold text-destructive hover:underline"><IconFlag size={14} />Report an issue</button></p>
    </main>
  );
}
