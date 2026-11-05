import Link from "next/link";
import { IconCash, IconStarFilled, IconRepeat, IconVideo, IconBooks, IconMessage, IconArrowRight } from "@tabler/icons-react";
import { Avatar, Pill, Progress } from "@/components/ui";
import { jobs } from "@/data/mock";

const upcoming = [
  ["17:30 – 18:30", "Confirmed · Student en route", "Session 8 of 12", "Nonthawat K.", "Year 11 · NIST", "A-Level Pure Math (Trigonometry Identities & Radians)", "Onsite: BTS Thong Lo cafe / Reserved Study Room #2", "Materials prepared: 2023 Past Papers Booklet", "View Location & Notes"],
  ["19:15 – 20:15", "Confirmed", "Session 3 of 6", "Kevin Tan", "Grade 11 · ISB", "Physics HL — Electromagnetic Induction & Faraday's Law", "Online Classroom #204", "Simulation software ready (PhET lab linked)", "Classroom Details"],
] as const;

export default function TutorHub() {
  return (
    <main className="container-page space-y-6 py-6">
      <section className="card flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-white to-primary-soft/40 p-6">
        <div><h1 className="text-[28px] font-semibold tracking-tight">Good afternoon, Dr. Elena! 🎓</h1><p className="text-muted">You have <b className="text-ink">3 lessons</b> scheduled today. Your next session begins in <u className="text-primary">45 minutes</u>.</p></div>
        <div className="flex items-center gap-4 rounded-lg border border-border bg-white px-4 py-2.5"><div className="text-xs"><b>Instant Requests</b><p className="text-success">Available for booking</p></div><span className="relative h-6 w-11 rounded-full bg-primary"><span className="absolute right-0.5 top-0.5 size-5 rounded-full bg-white" /></span></div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-4"><div className="flex justify-between text-xs text-muted">Monthly Earnings<IconCash size={18} className="text-primary" /></div><div className="py-1 text-[28px] font-bold">฿64,800 <span className="text-xs font-medium text-success">↗ +18%</span></div><div className="flex justify-between border-t border-border pt-2 text-xs text-muted">Unpaid commission:<b className="text-ink">฿12,400</b></div></div>
        <div className="card p-4"><div className="text-xs text-muted">Hours Taught</div><div className="py-1 text-[28px] font-bold">54.5 hrs <span className="text-xs font-normal text-muted">/ 60 hrs</span></div><Progress value={90} /><div className="flex justify-between pt-2 text-xs text-muted">All-time Sessions:<b className="text-ink">142 completed</b></div></div>
        <div className="card p-4"><div className="flex justify-between text-xs text-muted">Student Rating<IconStarFilled size={16} className="text-amber-400" /></div><div className="py-1 text-[28px] font-bold">4.98 <span className="text-xs font-normal text-muted">★ / 5.0</span></div><div className="flex items-center justify-between border-t border-border pt-2 text-xs text-muted"><Pill tone="orange">Top 1% Rated</Pill>142 reviews</div></div>
        <div className="card p-4"><div className="flex justify-between text-xs text-muted">Repeat Student Rate<IconRepeat size={16} className="text-primary" /></div><div className="py-1 text-[28px] font-bold">88.4% <span className="text-xs font-medium text-success">High</span></div><div className="flex justify-between border-t border-border pt-2 text-xs text-muted">Avg. Response:<b className="text-ink">14 minutes</b></div></div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Today&apos;s Schedule <span className="ml-2 rounded bg-surface-3 px-2 py-0.5 text-xs font-normal text-muted">Wednesday, 23 October 2024</span></h2><Link href="/me/schedule" className="flex items-center gap-1 text-xs text-primary">View Full Calendar <IconArrowRight size={12} /></Link></div>
          <article className="card relative overflow-hidden border-2 border-primary p-5">
            <span className="absolute right-0 top-0 rounded-bl-lg bg-primary px-3 py-1 text-[11px] font-semibold text-white">● STARTS IN 45 MIN · 16:00 – 17:00</span>
            <div className="flex items-center gap-3"><Avatar name="Ploy Chavalit" size={56} /><div><div className="flex items-center gap-2"><b className="text-lg">Ploy Chavalit</b><Pill>Grade 12 · Bangkok Patana School</Pill></div><p className="text-primary-dark">AP Calculus BC — Integration by Parts & Polar Coordinates</p><p className="text-xs text-muted">Online Interactive Room #409 · Whiteboard & Miro Ready</p></div></div>
            <div className="my-4 rounded-lg border border-primary/20 bg-primary-soft/60 p-3 text-xs"><b className="uppercase text-primary-dark">Session goal & drill notes:</b><p className="text-muted">“Review homework #4 and drill problem set 4.2 focusing on integration by parts with transcendental functions.”</p></div>
            <div className="flex flex-wrap gap-2"><button className="btn-primary"><IconVideo size={16} />Start Class & Check-in</button><button className="btn-outline"><IconBooks size={16} />Lesson Plan & Notes</button><Link href="/me/chat" className="btn-outline"><IconMessage size={16} />Message Student</Link></div>
          </article>
          {upcoming.map(([tm, st, ss, n, g, topic, loc, mat, cta]) => (
            <article key={n} className="card p-4">
              <div className="mb-3 flex items-center justify-between text-xs"><span className="flex items-center gap-2"><b className="rounded bg-surface-3 px-2 py-0.5">{tm}</b><span className="text-success">● {st}</span></span><span className="text-muted">{ss}</span></div>
              <div className="flex items-start gap-3"><Avatar name={n} size={44} /><div><b className="text-base">{n}</b> <span className="text-xs text-muted">{g}</span><p className="font-medium">{topic}</p><p className="text-xs text-muted">{loc}</p></div></div>
              <div className="mt-3 flex justify-between border-t border-border pt-2 text-xs"><span className="text-muted">{mat}</span><span className="font-medium text-primary">{cta} ›</span></div>
            </article>
          ))}
        </div>
        <div className="space-y-4">
          <div className="card p-5"><h3 className="font-semibold">Set Availability & Calendar Sync</h3><p className="py-2 text-muted">Manage weekly open slots and keep live synchronization with your Google Calendar.</p><Link href="/me/schedule" className="btn-soft w-full">Edit Weekly Slots →</Link></div>
          <div className="card border-primary/20 bg-primary-soft/40 p-5"><div className="flex justify-between"><h3 className="font-semibold">Browse Student Requests</h3><Pill tone="orange">14 new matches</Pill></div><p className="py-2 text-muted">Students waiting for offers in <b className="text-ink">Calculus & Physics</b> with budgets up to <b className="text-ink">฿1,500/hr</b>.</p><Link href="/jobs" className="btn-primary w-full py-3">View Requests & Send Proposals →</Link></div>
          <div className="card p-5">
            <div className="mb-3 flex justify-between text-xs"><b className="uppercase tracking-wide text-muted">Matched student inquiries</b><span className="text-primary">Auto-matched</span></div>
            {jobs.slice(0, 2).map((j) => (
              <div key={j.studentJobId} className="mb-3 rounded-lg border border-border bg-surface-1 p-3">
                <div className="flex justify-between gap-2"><b className="min-w-0 truncate">{j.title}</b><b className="whitespace-nowrap text-xs text-success">{j.budget.split(" ")[0]}</b></div>
                <p className="text-xs text-muted">Student: {j.student} · {j.mode} · {j.freq}</p>
                <div className="mt-2 flex justify-between text-xs"><span className="text-muted">Posted {j.posted}</span><Link href="/jobs" className="font-medium text-primary">Quick Apply</Link></div>
              </div>
            ))}
          </div>
          <div className="card p-5"><div className="mb-3 flex justify-between"><h3 className="font-semibold">Homework Submissions</h3><Pill tone="amber">1 Pending</Pill></div><div className="rounded-lg border border-border p-3"><b>Calculus Problem Set 4.2</b><p className="text-xs text-muted">Submitted by Ploy Chavalit · 12 problems attached</p><Link href="/me/qa/1" className="btn-soft mt-3 w-full text-xs">Grade & Give Feedback</Link></div></div>
        </div>
      </div>
    </main>
  );
}
