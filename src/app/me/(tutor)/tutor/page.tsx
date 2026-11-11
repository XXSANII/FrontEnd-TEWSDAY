import { Suspense } from "react";
import Link from "next/link";
import { IconVideo, IconBooks, IconMessage, IconArrowRight, IconCalendarEvent, IconClipboardCheck, IconBriefcase, IconStarFilled } from "@tabler/icons-react";
import { Avatar, Pill } from "@/components/ui";
import { AvailabilityToggle } from "@/components/AvailabilityToggle";
import { budgetLabel, freqLabel, jobTitle, modeLabel, searchJobs, timeAgo } from "@/lib/jobs";

const later = [
  { time: "17:30 – 18:30", student: "Nonthawat K.", topic: "A-Level Pure Math · Trigonometry", where: "Onsite · BTS Thong Lo", note: "Session 8 of 12" },
  { time: "19:15 – 20:15", student: "Kevin Tan", topic: "Physics HL · Electromagnetic Induction", where: "Online · Room #204", note: "Session 3 of 6" },
] as const;

const shortcuts = [
  { href: "/me/chat", icon: IconVideo, label: "Start class", hint: "In 45 minutes", primary: true },
  { href: "/me/qa/1", icon: IconClipboardCheck, label: "Grade homework", hint: "1 pending" },
  { href: "/jobs", icon: IconBriefcase, label: "Requests", hint: "Browse open requests" },
  { href: "/me/schedule", icon: IconCalendarEvent, label: "Availability", hint: "Edit weekly slots" },
] as const;

async function NewRequests() {
  const r = await searchJobs({ pageSize: 2 }).catch(() => null);
  return (
    <section>
      <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">New requests</h2><Link href="/jobs" className="inline-flex min-h-10 items-center px-1 text-sm font-medium text-primary hover:underline">{r ? `See all ${r.total}` : "See all"}</Link></div>
      {!r ? <p className="text-sm text-muted-foreground">Couldn&apos;t load requests right now.</p> : !r.data.length ? <p className="text-sm text-muted-foreground">No open requests right now.</p> : (
        <ul className="space-y-3">
          {r.data.map((j) => (
            <li key={j.studentJobId} className="card p-4">
              <div className="flex justify-between gap-2"><b className="min-w-0 truncate">{jobTitle(j)}</b><b className="whitespace-nowrap text-xs text-success">{budgetLabel(j)}</b></div>
              <p className="text-xs text-muted-foreground">{modeLabel(j.locationType)} · {freqLabel(j.frequencyPerWeek)}</p>
              <div className="mt-2 flex items-center justify-between"><span className="text-xs text-muted-foreground">Posted {timeAgo(j.createdAt)}</span><Link href="/jobs" className="btn-outline min-h-10 px-3 text-xs">Quick apply</Link></div>
            </li>
          ))}
        </ul>)}
    </section>
  );
}

export default function TutorHub() {
  return (
    <main className="container-page space-y-8 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good afternoon, Dr. Elena</h1>
          <p className="text-muted-foreground">3 lessons today · 1 homework to grade · next class in 45 minutes</p>
        </div>
        <AvailabilityToggle />
      </div>

      <section aria-label="Next class" className="card border-primary/30 bg-primary-soft p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex min-w-0 items-center gap-4">
            <Avatar name="Ploy Chavalit" size={56} />
            <div className="min-w-0">
              <span className="pill bg-white normal-case text-primary-dark">● Starts in 45 min · 16:00–17:00</span>
              <h2 className="mt-1.5 truncate text-lg font-bold">Ploy Chavalit · AP Calculus BC</h2>
              <p className="text-muted-foreground">Integration by Parts & Polar Coordinates · Online Room #409</p>
            </div>
          </div>
          <div className="flex w-full flex-wrap gap-2 sm:w-auto">
            <Link href="/me/chat" className="btn-primary min-h-11 flex-1 px-6 sm:flex-none"><IconVideo size={18} />Start class</Link>
            <Link href="/me/bookings/BK-1042" className="btn-outline min-h-11"><IconBooks size={18} />Notes</Link>
            <Link href="/me/chat" className="btn-outline min-h-11" aria-label="Message student"><IconMessage size={18} />Message</Link>
          </div>
        </div>
        <p className="mt-4 rounded-xl bg-white/70 p-3 text-sm text-muted-foreground"><b className="text-ink">Goal:</b> review homework #4, then drill problem set 4.2 on integration by parts.</p>
      </section>

      <nav aria-label="Quick actions" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {shortcuts.map(({ href, icon: Icon, label, hint, ...r }) => (
          <Link key={label} href={href} className="card flex items-center gap-3 p-4 hover:border-primary/40">
            <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${"primary" in r ? "bg-primary text-white" : "bg-primary-soft text-primary"}`}><Icon size={22} /></span>
            <span className="min-w-0"><b className="block truncate">{label}</b><span className="block truncate text-xs text-muted-foreground">{hint}</span></span>
          </Link>
        ))}
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">Later today</h2>
            <Link href="/me/schedule" className="inline-flex min-h-10 items-center gap-1 text-sm font-medium text-primary hover:underline">Full calendar <IconArrowRight size={14} /></Link>
          </div>
          <ul className="space-y-3">
            {later.map((l) => (
              <li key={l.student} className="card flex flex-wrap items-center gap-4 p-4">
                <Avatar name={l.student} size={44} />
                <div className="min-w-0 flex-1 basis-48">
                  <b className="block">{l.student} <span className="text-xs font-normal text-muted-foreground">· {l.note}</span></b>
                  <span className="block truncate text-sm">{l.topic}</span>
                  <span className="text-xs text-muted-foreground">{l.time} · {l.where}</span>
                </div>
                <Link href="/me/bookings/BK-1042" className="btn-outline">Details</Link>
              </li>
            ))}
          </ul>

          <h2 className="mb-3 mt-8 text-lg font-bold">This month</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="card p-4"><div className="text-xs text-muted-foreground">Earnings</div><div className="text-xl font-bold sm:text-2xl">฿64.8k</div><div className="text-xs font-medium text-success">↗ +18%</div></div>
            <div className="card p-4"><div className="text-xs text-muted-foreground">Hours taught</div><div className="text-xl font-bold sm:text-2xl">54.5</div><div className="text-xs text-muted-foreground">of 60 hrs</div></div>
            <div className="card p-4"><div className="text-xs text-muted-foreground">Rating</div><div className="flex items-center gap-1 text-xl font-bold sm:text-2xl">4.98<IconStarFilled size={16} className="text-amber-400" /></div><div className="text-xs text-muted-foreground">142 reviews</div></div>
          </div>
          <Link href="/me/invoices" className="mt-2 inline-flex min-h-10 items-center gap-1 text-sm font-medium text-primary hover:underline">Invoices · ฿12,400 commission unpaid <IconArrowRight size={14} /></Link>
        </section>

        <div className="space-y-8">
          <section>
            <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">To grade</h2><Pill tone="amber">1 pending</Pill></div>
            <article className="card p-4">
              <b>Calculus Problem Set 4.2</b>
              <p className="text-xs text-muted-foreground">Ploy Chavalit · 12 problems attached</p>
              <Link href="/me/qa/1" className="btn-primary mt-3 w-full">Grade & give feedback</Link>
            </article>
          </section>

          <Suspense fallback={<p className="text-sm text-muted-foreground">Loading requests…</p>}><NewRequests /></Suspense>
        </div>
      </div>
    </main>
  );
}
