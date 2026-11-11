import Link from "next/link";
import { IconVideo, IconClipboardList, IconMessageCircle, IconSearch, IconArrowRight, IconCalendarEvent, IconHelpCircle, IconNotebook } from "@tabler/icons-react";
import { Avatar, Pill, Progress, Stars } from "@/components/ui";

const courses = [
  { tutor: "Dr. Elena Rostova", title: "AP Calculus BC", progress: 80, lessons: "8 of 10 lessons", next: "Today, 16:00", live: true },
  { tutor: "Marcus Vance", title: "Physics HL (IB Diploma)", progress: 62, lessons: "5 of 8 lessons", next: "Friday, 17:30", live: false },
  { tutor: "Sarah Lin", title: "Essay Writing & SAT", progress: 50, lessons: "3 of 6 lessons", next: "Sunday, 10:00", live: false },
] as const;

const todo = [
  { title: "Calculus Problem Set 4.2", sub: "AP Calculus BC", due: "Due tomorrow", urgent: true },
  { title: "Physics Past Paper 2023, Section B", sub: "Physics HL", due: "In 3 days", urgent: false },
] as const;

const shortcuts = [
  { href: "/me/chat", icon: IconVideo, label: "Join class", hint: "Starts in 28 min", primary: true },
  { href: "/me/qa/1", icon: IconClipboardList, label: "Homework", hint: "2 due this week" },
  { href: "/me/chat", icon: IconMessageCircle, label: "Messages", hint: "Chat with tutors" },
  { href: "/tutors", icon: IconSearch, label: "Book a tutor", hint: "Find more lessons" },
] as const;

export default function StudentDashboard() {
  return (
    <main className="container-page space-y-8 py-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hi Ploy, ready to learn?</h1>
        <p className="text-muted-foreground">3 active courses · 2 homework due · next class today at 16:00</p>
      </div>

      <section aria-label="Next class" className="card flex flex-wrap items-center justify-between gap-5 border-primary/30 bg-primary-soft p-5 sm:p-6">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar name="Dr. Elena Rostova" size={56} online />
          <div className="min-w-0">
            <span className="pill bg-white normal-case text-primary-dark">● Starts in 00:28:14</span>
            <h2 className="mt-1.5 truncate text-lg font-bold">AP Calculus BC · Integration by Parts</h2>
            <p className="text-muted-foreground">Dr. Elena Rostova · Today, 16:00–17:00</p>
          </div>
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
          <Link href="/me/chat" className="btn-primary min-h-11 flex-1 px-6 sm:flex-none"><IconVideo size={18} />Join classroom</Link>
          <Link href="/me/bookings/BK-1042" className="btn-outline min-h-11" aria-label="Class details"><IconCalendarEvent size={18} />Details</Link>
        </div>
      </section>

      <nav aria-label="Quick actions" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {shortcuts.map(({ href, icon: Icon, label, hint, ...r }) => (
          <Link key={label} href={href} className="card group flex items-center gap-3 p-4 hover:border-primary/40">
            <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${"primary" in r ? "bg-primary text-white" : "bg-primary-soft text-primary"}`}><Icon size={22} /></span>
            <span className="min-w-0"><b className="block truncate">{label}</b><span className="block truncate text-xs text-muted-foreground">{hint}</span></span>
          </Link>
        ))}
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">My courses</h2>
            <Link href="/me/bookings/BK-1042" className="inline-flex min-h-10 items-center gap-1 text-sm font-medium text-primary hover:underline">View all <IconArrowRight size={14} /></Link>
          </div>
          <ul className="space-y-3">
            {courses.map((c) => (
              <li key={c.title} className="card flex flex-wrap items-center gap-4 p-4">
                <Avatar name={c.tutor} size={44} />
                <div className="min-w-0 flex-1 basis-48">
                  <b className="block truncate">{c.title}</b>
                  <span className="text-xs text-muted-foreground">{c.tutor} · Next: {c.next}</span>
                  <div className="mt-2 flex items-center gap-2"><div className="flex-1"><Progress value={c.progress} /></div><span className="text-xs font-medium text-muted-foreground">{c.lessons}</span></div>
                </div>
                <Link href={c.live ? "/me/chat" : "/me/bookings/BK-1042"} className={c.live ? "btn-primary min-h-10" : "btn-outline min-h-10"}>
                  {c.live ? "Join" : "Continue"}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-8">
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold">To do</h2>
              <Pill tone="orange">{todo.length} due</Pill>
            </div>
            <ul className="space-y-3">
              {todo.map((t) => (
                <li key={t.title} className="card flex flex-wrap items-center justify-between gap-3 p-4">
                  <div className="min-w-0 flex-1 basis-40"><b className="block truncate">{t.title}</b><span className="text-xs text-muted-foreground">{t.sub}</span></div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Pill tone={t.urgent ? "red" : "gray"}>{t.due}</Pill>
                    <Link href="/me/qa/1" className="btn-outline min-h-10 px-3 text-xs">Submit</Link>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/me/qa" className="mt-1 flex min-h-10 items-center gap-2 text-sm text-muted-foreground hover:text-primary"><IconHelpCircle size={16} />Question between sessions? Ask in Q&A</Link>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold">Latest feedback</h2>
              <Link href="/me/bookings/BK-1042" className="inline-flex min-h-10 items-center px-1 text-sm font-medium text-primary hover:underline">All</Link>
            </div>
            <article className="card p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2"><Avatar name="Dr. Elena Rostova" size={32} /><div className="leading-5"><b className="text-sm">Dr. Elena Rostova</b><p className="text-xs text-muted-foreground">AP Calculus BC · 2 days ago</p></div></div>
                <Stars value={5} />
              </div>
              <p className="mt-3 line-clamp-3 text-sm">“Exceptional grasp of chain rule substitutions today. Review problem set 4.2 before our next drill.”</p>
              <Link href="/me/bookings/BK-1042" className="mt-2 inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-primary hover:underline"><IconNotebook size={15} />Open lesson notes</Link>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}
