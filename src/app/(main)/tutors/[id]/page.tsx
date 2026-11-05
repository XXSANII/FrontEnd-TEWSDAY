import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconStarFilled, IconBookmark, IconMessage, IconPlayerPlayFilled, IconCircleCheck, IconWorld, IconShieldCheck } from "@tabler/icons-react";
import { tutors } from "@/data/mock";
import { Avatar, Pill, Stars } from "@/components/ui";
import { BookingPanel } from "@/components/BookingPanel";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { baht } from "@/lib/cn";

const reviews = [
  ["Ploy C.", "AP Calculus BC • 2 days ago", "Dr. Elena completely turned around my confidence with Taylor Series and polar coordinates. Her interactive tablet notes are better than any textbook. I scored a 5 on my AP BC exam!"],
  ["Alex M.", "IB Math AA HL • 1 week ago", "Extremely patient, structured, and insightful. She helped prepare my Internal Assessment on differential modeling and was invaluable in helping me secure my spot."],
  ["Tanawat K.", "Linear Algebra • 3 weeks ago", "Helped me during my first term at university with vector subspaces and matrix decompositions. Best math teacher I have ever worked with."],
];
const education = [
  ["Ph.D. in Applied Mathematics", "Imperial College London", "2014 – 2018", "Verified Diploma & Doctoral Thesis"],
  ["M.Sc. in Mathematical Physics", "University of Cambridge (Honors First Class)", "2012 – 2014", "Verified Degree"],
  ["B.Sc. in Mathematics", "Chulalongkorn University (First Class Honors, Gold Medal)", "2008 – 2012", ""],
  ["Certified IB Mathematics Examiner & AP Calculus Specialist", "International Baccalaureate Organization & College Board", "Active Certification", ""],
];

export default function TutorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="container-page py-20 text-center text-muted">Loading profile…</div>}>
      <TutorProfile params={params} />
    </Suspense>
  );
}

async function TutorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = tutors.find((x) => x.tutorProfileId === id);
  if (!t) notFound();
  return (
    <main>
      <div className="border-b border-border bg-white"><div className="container-page py-2 text-xs text-muted">Home › <Link href="/tutors" className="hover:text-primary">Find Tutors</Link> › {t.subjects[0]} › <span className="text-ink">{t.name}</span></div></div>
      <div className="container-page space-y-6 py-6">
        <section className="card flex flex-wrap items-center justify-between gap-6 p-6">
          <div className="flex items-center gap-5">
            <Avatar name={t.name} size={96} online={t.online} />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-semibold">{t.name}</h1><Pill tone="green">Verified Pro</Pill>{t.badge === "TOP 1% TUTOR" && <Pill tone="orange">Top 1% Tutor</Pill>}</div>
              <p className="text-muted">{t.headline} · 9+ Years Mentoring High School & Undergraduate</p>
              <div className="flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1"><IconStarFilled size={14} className="text-amber-400" /><b className="text-ink">{t.rating.toFixed(1)}</b> ({t.reviews} reviews)</span>
                <span>1,280+ Hours Taught</span><span className="text-success">100% Response Rate (&lt; 15 mins)</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">{t.subjects.map((s) => <span key={s} className="rounded bg-surface-3 px-2 py-0.5 text-[11px] font-medium">{s}</span>)}</div>
            </div>
          </div>
          <div className="space-y-2 text-right">
            <div><span className="text-2xl font-bold">{baht(t.rate)}</span><span className="text-xs text-muted"> / hr</span><div className="text-xs text-primary">30-Min Trial Lesson: ฿600 ($18 USD)</div></div>
            <div className="flex justify-end gap-2">
              <button className="btn-outline px-3" aria-label="Save"><IconBookmark size={16} /></button>
              <Link href="/me/chat" className="btn-outline"><IconMessage size={16} />Send Message</Link>
              <a href="#book" className="btn-primary">Book Session</a>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="card p-6"><h2 className="mb-3 font-semibold">About Me & Teaching Methodology</h2>
              <p className="text-muted">Hello! I am Dr. {t.name.split(" ")[1]}. {t.bio} With over 9 years of international tutoring experience and an academic background spanning Imperial College London and Cambridge, I specialize in demystifying rigorous mathematics and physics.</p>
              <p className="mt-3 text-muted">My pedagogical philosophy centers on <b className="text-ink">Intuitive First-Principles Thinking</b>. Rather than memorizing rote mechanics, we break complex differential and linear transformations down into visual, geometric understanding.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[["Track Record", "94% of my long-term mentees achieve a 5 in AP Calculus BC or 7 in IB Math HL."], ["University Placement", "Past students admitted to MIT, Stanford, Oxford, Cambridge, and Imperial."], ["Interactive Tech", "Wacom 4K stylus notes exported instantly to PDF after every live lecture."]].map(([h, p]) => (
                  <div key={h} className="rounded-lg border border-border bg-surface-1 p-3"><div className="text-xs font-semibold text-primary">{h}</div><p className="text-xs text-muted">{p}</p></div>))}</div>
            </section>
            <section className="card p-6"><div className="mb-3 flex justify-between"><h2 className="font-semibold">Tutor Video Introduction</h2><span className="text-xs text-muted">1:45 min intro</span></div>
              <div className="relative grid aspect-video place-items-center rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950">
                <button className="grid size-16 place-items-center rounded-full bg-primary text-white shadow-lg" aria-label="Play"><IconPlayerPlayFilled size={26} /></button>
                <p className="absolute bottom-3 left-4 text-xs text-white/90">Watch {t.name.split(" ")[1]} introduce her teaching approach & interactive whiteboard setup</p></div></section>
            <section className="card p-6"><div className="mb-4 flex justify-between"><h2 className="font-semibold">Verified Education & Certifications</h2><span className="text-xs text-success">100% Background Checked</span></div>
              <ol className="space-y-4 border-l-2 border-border pl-5">
                {education.map(([h, s, y, v]) => (<li key={h} className="relative"><span className="absolute -left-[27px] top-1 size-3 rounded-full border-2 border-primary bg-white" />
                  <div className="flex justify-between"><div><p className="text-sm font-semibold">{h}</p><p className="text-xs text-muted">{s}</p>{v && <Pill tone="green" className="mt-1">✓ {v}</Pill>}</div><span className="text-xs text-muted">{y}</span></div></li>))}
              </ol></section>
            <AvailabilityCalendar />
            <section className="card p-6"><div className="mb-4 flex justify-between"><h2 className="font-semibold">Student Reviews & Testimonials</h2><span className="text-xs text-muted">{t.reviews} Verified Evaluations</span></div>
              <div className="mb-4 flex items-center gap-8 rounded-lg bg-surface-1 p-4"><div className="text-center"><div className="text-4xl font-bold">{t.rating.toFixed(1)}</div><Stars value={t.rating} /><p className="text-xs text-muted">Based on {t.reviews} lessons</p></div>
                <div className="flex-1 space-y-1.5 text-xs">{[["Teaching Skill", 5], ["Clarity & Logic", 5], ["Punctuality", 4.9], ["Custom Materials", 5]].map(([l, v]) => (<div key={l as string} className="flex items-center gap-3"><span className="w-28 text-muted">{l}</span><div className="h-1.5 flex-1 rounded-full bg-border"><div className="h-full rounded-full bg-primary" style={{ width: `${(v as number) * 20}%` }} /></div><b>{(v as number).toFixed(1)}</b></div>))}</div></div>
              <div className="space-y-3">{reviews.map(([n, c, tx]) => (<div key={n} className="rounded-lg border border-border p-4"><div className="mb-2 flex items-center justify-between"><div className="flex items-center gap-2"><Avatar name={n} size={32} /><div><b className="text-sm">{n}</b> <Pill tone="green">Verified Lesson</Pill><p className="text-[11px] text-muted">{c}</p></div></div><Stars value={5} /></div><p className="text-ink-2">“{tx}”</p></div>))}</div></section>
          </div>
          <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <BookingPanel rate={t.rate} />
            <section className="card space-y-2 p-5"><h3 className="flex items-center gap-2 font-semibold"><IconShieldCheck size={18} className="text-primary" />Background Verification</h3>
              {["Government ID Verified (National ID / Passport)", "Degree Authenticity verified by TewsDay", "Clean Criminal Record Check (Valid 2026)", "Top Rated Educator 2024 – 2025"].map((x) => <p key={x} className="flex items-center gap-2 text-xs"><IconCircleCheck size={15} className="text-success" />{x}</p>)}</section>
            <section className="card space-y-2 p-5"><h3 className="flex items-center gap-2 font-semibold"><IconWorld size={18} className="text-primary" />Languages & Location</h3>
              <p className="flex justify-between text-xs">English <Pill>Native / C2 Academic</Pill></p><p className="flex justify-between text-xs">Thai <Pill>Fluent Professional</Pill></p><p className="text-xs text-muted">Location Base: {t.area}, Thailand</p></section>
          </div>
        </div>
      </div>
    </main>
  );
}
