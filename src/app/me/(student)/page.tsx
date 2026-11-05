import Link from "next/link";
import { IconClock, IconCircleCheck, IconCalendar, IconClipboardList, IconVideo, IconPencil, IconRosetteDiscountCheckFilled, IconArrowRight, IconFileTypePdf, IconBulb, IconHelpCircle } from "@tabler/icons-react";
import { Avatar, Pill, Progress, Stars } from "@/components/ui";

const courses = [
  ["Dr. Elena Rostova", "Ph.D. Applied Math", "AP Calculus BC", "Rate: ฿1,200/hr · 1-on-1 Mentorship", 80, "8 of 10 Lessons (80%)", "Today, 16:00", "2 sessions left", "ACTIVE", ["Review Notes", "Book More"]],
  ["Marcus Vance", "M.Sc. Physics (Oxford)", "Physics HL (IB Diploma)", "Rate: ฿850/hr · Mechanics & Waves", 62, "5 of 8 Lessons (62%)", "Friday, 17:30", "3 sessions left", "WEEKLY", ["Session Logs", "Book More"]],
  ["Sarah Lin", "MA English Literature", "Academic Essay Writing & SAT", "Rate: ฿950/hr · College Admissions Prep", 50, "3 of 6 Lessons (50%)", "Sunday, 10:00", "3 sessions left", "BI-WEEKLY", ["Draft Essays", "Book More"]],
] as const;

const hw = [
  ["Calculus Problem Set 4.2", "AP Calculus BC · 12 questions", "Deadline: 23:59 ICT", "DUE TOMORROW", "red"],
  ["Physics Past Paper 2023 Section B", "Physics HL · Waves & Thermodynamics", "Deadline: Friday, 12:00 ICT", "IN 3 DAYS", "gray"],
] as const;

const stats = [
  [IconClock, "42.5 hrs", "Total Study Hours", true],
  [IconCircleCheck, "18", "Completed Lessons", false],
  [IconCalendar, "3", "Upcoming Sessions", true],
  [IconClipboardList, "2 Tasks", "Homework Due", false],
] as const;

const feedback = [
  ["Dr. Elena Rostova", "AP Calculus BC · 2 days ago", 5, "Exceptional grasp of chain rule substitutions today. Review problem set 4.2 before our next calculus drill to lock down trigonometric antiderivatives.", "Key Strength: Rapid algebraic factorization", "Notes PDF (1.4 MB)"],
  ["Marcus Vance", "Physics HL · 4 days ago", 4, "Strong conceptual reasoning through electromagnetic induction. Pay slightly closer attention to SI unit conversions in multi-step free body diagrams.", "Focus Area: Flux density equations", "Whiteboard Snaps (PDF)"],
] as const;

export default function StudentDashboard() {
  return (
    <main className="container-page space-y-8 py-6">
      <section className="card relative overflow-hidden p-6">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-amber-400" />
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex gap-2"><span className="pill border border-primary/20 bg-primary-soft normal-case text-primary">● Starts in 00:28:14</span><Pill>Online Classroom</Pill></div>
            <h1 className="text-2xl font-semibold tracking-tight">AP Calculus BC — Integration by Parts & Polar Coordinates</h1>
            <p className="text-muted">With <b className="text-ink">Dr. Elena Rostova</b> (Ph.D. Applied Mathematics) · Today, 16:00 – 17:00 (GMT+7 Bangkok)</p>
            <p className="flex gap-4 text-xs text-muted"><span>Interactive Whiteboard Room #409</span><span>Pre-class Formula Sheet Ready</span></p>
          </div>
          <div className="w-64 space-y-2">
            <Link href="/me/chat" className="btn-primary w-full py-3"><IconVideo size={18} />Join Classroom</Link>
            <div className="grid grid-cols-2 gap-2"><button className="btn-outline whitespace-nowrap px-2 text-xs"><IconPencil size={14} />Notes & Board</button><button className="btn-outline whitespace-nowrap px-2 text-xs">Reschedule</button></div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([Icon, v, l, hl]) => (
          <div key={l} className="card flex items-center gap-4 p-4">
            <span className={`grid size-12 place-items-center rounded-lg ${hl ? "bg-primary-soft text-primary" : "bg-surface-3 text-ink-2"}`}><Icon size={22} /></span>
            <div><div className="text-xl font-semibold leading-6">{v}</div><div className="text-muted">{l}</div></div>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div><h2 className="text-xl font-semibold">Active Tutoring Courses</h2><p className="text-xs text-muted">Track ongoing syllabi, booked hours, and schedule next drills</p></div>
          <Link href="/me/bookings/BK-1042" className="flex items-center gap-1 text-xs font-medium text-primary">View All Enrolled <IconArrowRight size={14} /></Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {courses.map(([n, sub, c, rate, p, prog, next, left, tag, btns]) => (
            <article key={n} className="card space-y-4 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5"><Avatar name={n} size={40} /><div><b className="flex items-center gap-1">{n}<IconRosetteDiscountCheckFilled size={15} className="text-success" /></b><span className="text-xs text-muted">{sub}</span></div></div>
                <Pill tone={tag === "ACTIVE" ? "orange" : "gray"}>{tag}</Pill>
              </div>
              <div><h3 className="text-base font-semibold">{c}</h3><p className="text-xs text-muted">{rate}</p></div>
              <div className="rounded-lg bg-surface-1 p-3"><div className="mb-1.5 flex justify-between text-xs text-muted"><span>Course Progress</span><b className="text-ink">{prog}</b></div><Progress value={p} /></div>
              <div className="flex justify-between text-xs"><span className="text-muted">Next: {next}</span><span className={tag === "ACTIVE" ? "font-medium text-success" : "text-muted"}>{left}</span></div>
              <div className="flex gap-2 border-t border-border pt-4">{btns.map((b, i) => <button key={b} className={i === 1 && tag === "ACTIVE" ? "btn-primary flex-1" : "btn-soft flex-1"}>{b}</button>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-3"><h2 className="text-lg font-semibold">Recent Tutor Feedback</h2><Link href="#" className="text-xs text-primary">All Reviews</Link></div>
          {feedback.map(([n, s, r, q, k, f]) => (
            <div key={n} className="mb-3 rounded-lg border border-border bg-surface-1 p-4">
              <div className="mb-2 flex justify-between"><div className="flex items-center gap-2"><Avatar name={n} size={36} /><div><b>{n}</b><p className="text-xs text-muted">{s}</p></div></div><Stars value={r} /></div>
              <p>“{q}”</p>
              <div className="mt-3 flex justify-between border-t border-border pt-2 text-xs"><span className="flex items-center gap-1 text-muted"><IconBulb size={14} />{k}</span><span className="flex items-center gap-1 text-primary"><IconFileTypePdf size={14} />{f}</span></div>
            </div>
          ))}
        </div>
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-3"><h2 className="text-lg font-semibold">Assigned Homework</h2><Pill tone="orange">2 Due This Week</Pill></div>
          <div className="space-y-3">
            {hw.map(([t, s, d, tag, tone]) => (
              <div key={t} className="rounded-lg border border-border bg-surface-1 p-4">
                <div className="flex items-start justify-between"><div><b className="text-base font-medium">{t}</b><p className="text-xs text-muted">{s}</p></div><Pill tone={tone}>{tag}</Pill></div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted">{d}<Link href="/me/qa/1" className="btn-outline px-3 py-1 text-xs">Submit Work</Link></div>
              </div>
            ))}
            <div className="rounded-lg border border-border bg-surface-1 p-4">
              <div className="flex justify-between"><div><b className="text-base font-medium">Admissions Essay Outline (Draft 2)</b><p className="text-xs text-muted">SAT & Essay Writing · Sarah Lin</p></div><Pill>Under Review</Pill></div>
              <div className="mt-2 flex justify-between text-xs"><span className="text-success">✓ Submitted Yesterday</span><span className="text-muted">Feedback pending</span></div>
            </div>
          </div>
          <Link href="/me/qa/1" className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-dashed border-border py-3 text-xs text-muted hover:text-primary"><IconHelpCircle size={16} />Have a question between sessions? Ask in Q&A</Link>
        </div>
      </section>
    </main>
  );
}
