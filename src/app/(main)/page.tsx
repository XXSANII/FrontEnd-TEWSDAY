import { Suspense, cache } from "react";
import Link from "next/link";
import {
  IconArrowRight, IconStarFilled, IconMathFunction, IconAtom, IconLanguage, IconFlask, IconCode, IconBook2,
  IconRosetteDiscountCheck, IconShieldCheck, IconMessageCircle, IconCalendarCheck, IconSparkles, IconTrendingUp, IconVideo,
} from "@tabler/icons-react";
import { searchTutors } from "@/lib/tutors";
import { baht } from "@/lib/cn";
import { Avatar, Pill } from "@/components/ui";

const subjects = [
  { label: "Mathematics", hint: "Calculus · SAT · IB", icon: IconMathFunction, tone: "bg-primary-soft text-primary" },
  { label: "Physics", hint: "A-Level · IB · PAT", icon: IconAtom, tone: "bg-sky-50 text-sky-700" },
  { label: "English", hint: "IELTS · Writing · IGCSE", icon: IconLanguage, tone: "bg-emerald-50 text-emerald-700" },
  { label: "Chemistry", hint: "IGCSE · BMAT · AP", icon: IconFlask, tone: "bg-rose-50 text-rose-700" },
  { label: "Coding", hint: "Python · AP CS", icon: IconCode, tone: "bg-violet-50 text-violet-700" },
  { label: "Economics", hint: "IB · Statistics", icon: IconBook2, tone: "bg-amber-50 text-amber-700" },
] as const;

const steps = [
  { icon: IconSparkles, title: "Tell us your goal", text: "Share the subject, level and what you want to achieve. Takes about a minute." },
  { icon: IconMessageCircle, title: "Chat with matched tutors", text: "Get offers from verified tutors and message them before you decide." },
  { icon: IconCalendarCheck, title: "Start with a trial lesson", text: "Try a 30-minute intro lesson. Keep the tutor only if it feels right." },
] as const;

const stories = [
  { name: "Ploy C.", role: "Grade 12 · IB student", quote: "I went from a 4 to a 6 in Math AA in one term. My tutor explained things in a way school never did." },
  { name: "Khun Somchai", role: "Parent of a Grade 9 student", quote: "Verified tutors and clear progress notes after every lesson. I always know how my son is doing." },
  { name: "Mind W.", role: "Grade 11 · SAT prep", quote: "I posted my goal at night and had three great offers by morning. The trial lesson sold me." },
] as const;

// One request per render, shared by the hero and the featured section. A backend outage must not break the landing page.
const topTutors = cache(async () => {
  try { return (await searchTutors({ pageSize: 4 })).data; } catch { return []; }
});

async function HeroAvatars() {
  const tutors = await topTutors();
  return <div className="flex -space-x-2">{tutors.map((t) => <span key={t.tutorProfileId} className="rounded-full ring-2 ring-white"><Avatar name={t.displayName} size={36} /></span>)}</div>;
}

async function HeroTutorCard() {
  const t = (await topTutors())[0];
  if (!t) return null;
  return (
    <div className="card p-5 sm:ml-10">
      <div className="flex items-center gap-3">
        <Avatar name={t.displayName} size={52} />
        <div className="min-w-0 flex-1"><b className="block truncate">{t.displayName}</b><span className="block truncate text-xs text-muted-foreground">{t.bio || "TewsDay tutor"}</span></div>
        {t.verificationStatus === "verified" && <Pill tone="green">Verified</Pill>}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm"><span className="flex items-center gap-1 font-semibold"><IconStarFilled size={14} className="text-amber-400" />{t.averageRating.toFixed(1)} <span className="font-normal text-muted-foreground">({t.reviewCount})</span></span><span className="font-bold">{t.hourlyRate != null ? baht(t.hourlyRate) : "—"}<span className="text-xs font-normal text-muted-foreground"> / hr</span></span></div>
    </div>
  );
}

async function FeaturedTutors() {
  const tutors = (await topTutors()).slice(0, 3);
  if (!tutors.length) return <p className="py-8 text-center text-muted-foreground">Tutors will appear here soon.</p>;
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {tutors.map((t) => (
        <article key={t.tutorProfileId} className="card flex flex-col p-5">
          <div className="flex items-center gap-3">
            <Avatar name={t.displayName} size={56} />
            <div className="min-w-0"><h3 className="truncate font-bold">{t.displayName}</h3></div>
          </div>
          {t.verificationStatus === "verified" && <div className="mt-3 flex flex-wrap gap-1.5"><Pill tone="green">Verified</Pill></div>}
          <p className="mt-3 line-clamp-2 text-muted-foreground">{t.bio || "This tutor has not added a bio yet."}</p>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="flex items-center gap-1 text-sm"><IconStarFilled size={14} className="text-amber-400" /><b>{t.averageRating.toFixed(1)}</b><span className="text-muted-foreground">({t.reviewCount})</span></span>
            <span className="font-bold">{t.hourlyRate != null ? baht(t.hourlyRate) : "—"}<span className="text-xs font-normal text-muted-foreground"> / hr</span></span>
          </div>
          <Link href={`/tutors/${t.tutorProfileId}`} className="btn-outline mt-4 w-full">View profile</Link>
        </article>
      ))}
    </div>
  );
}

export default function Landing() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-soft/70 via-white to-white">
        <div className="bg-notebook pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]" />
        <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary-dark shadow-sm">
              <IconRosetteDiscountCheck size={14} />Every tutor is background-checked
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Learn faster with a tutor who <span className="highlight">gets you</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Tell us what you want to learn. We match you with verified 1-on-1 tutors, and your first lesson is a low-pressure trial.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/request" className="btn-primary min-h-12 px-7 text-base">Find my tutor<IconArrowRight size={18} /></Link>
              <Link href="/tutors" className="btn-outline min-h-12 px-7 text-base">Browse tutors</Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Suspense fallback={<div className="h-9" />}><HeroAvatars /></Suspense>
              <p className="text-sm text-muted-foreground"><span className="inline-flex items-center gap-1 font-semibold text-ink"><IconStarFilled size={14} className="text-amber-400" />4.9</span> from 10,000+ completed lessons</p>
            </div>
          </div>

          {/* Product preview (decorative) */}
          <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/10 to-amber-200/30 blur-2xl" />
            <div className="relative space-y-4">
              <Suspense fallback={null}><HeroTutorCard /></Suspense>
              <div className="grid grid-cols-2 gap-4">
                <div className="card p-4">
                  <span className="grid size-9 place-items-center rounded-lg bg-primary text-white"><IconVideo size={18} /></span>
                  <b className="mt-3 block">Next class</b><span className="text-xs text-muted-foreground">Today · 16:00</span>
                </div>
                <div className="card p-4">
                  <span className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700"><IconTrendingUp size={18} /></span>
                  <b className="mt-3 block">+2 grades</b><span className="text-xs text-muted-foreground">Avg. after one term</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="container-page py-16">
        <div className="mb-8 max-w-xl">
          <h2 className="text-3xl font-extrabold tracking-tight">What do you want to learn?</h2>
          <p className="mt-2 text-muted-foreground">Pick a subject to meet tutors who teach it every day.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {subjects.map(({ label, hint, icon: Icon, tone }) => (
            <Link key={label} href={`/tutors?q=${label}`} className="card group flex flex-col gap-3 p-4 hover:-translate-y-0.5 hover:border-primary/40">
              <span className={`grid size-11 place-items-center rounded-xl ${tone}`}><Icon size={22} /></span>
              <span><b className="block">{label}</b><span className="block text-xs text-muted-foreground">{hint}</span></span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface-1 py-16">
        <div className="container-page">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight">Your first lesson in 3 simple steps</h2>
            <p className="mt-2 text-muted-foreground">No searching through endless lists. We bring the right tutors to you.</p>
          </div>
          <ol className="grid gap-5 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="card relative p-6">
                <span className="absolute right-5 top-4 text-5xl font-extrabold text-primary/10">{i + 1}</span>
                <span className="grid size-12 place-items-center rounded-xl bg-primary text-white shadow-sm"><Icon size={24} /></span>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-1.5 text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center"><Link href="/request" className="btn-primary min-h-12 px-7 text-base">Get matched for free<IconArrowRight size={18} /></Link></div>
        </div>
      </section>

      {/* Tutors */}
      <section className="container-page py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Meet some of our top tutors</h2>
            <p className="mt-2 text-muted-foreground">University graduates and experienced educators, verified by our team.</p>
          </div>
          <Link href="/tutors" className="inline-flex min-h-10 items-center gap-1 font-semibold text-primary hover:underline">Browse all tutors <IconArrowRight size={16} /></Link>
        </div>
        <Suspense fallback={<div className="py-8 text-center text-muted-foreground">Loading tutors…</div>}><FeaturedTutors /></Suspense>
      </section>

      {/* Stories */}
      <section className="bg-surface-1 py-16">
        <div className="container-page">
          <h2 className="mb-8 text-center text-3xl font-extrabold tracking-tight">Students and parents love it</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {stories.map((s) => (
              <figure key={s.name} className="card flex flex-col p-6">
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map((i) => <IconStarFilled key={i} size={16} className="text-amber-400" />)}</div>
                <blockquote className="mt-3 flex-1">“{s.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3"><Avatar name={s.name} size={40} /><span className="leading-5"><b className="block text-sm">{s.name}</b><span className="text-xs text-muted-foreground">{s.role}</span></span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-page py-16">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
          <div className="bg-notebook pointer-events-none absolute inset-0 opacity-20 invert" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to start learning?</h2>
            <p className="mt-3 opacity-90">Join thousands of students getting better grades with a tutor who fits them.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/request" className="btn min-h-12 bg-white px-7 text-base text-primary-dark hover:bg-primary-soft">Find my tutor</Link>
              <Link href="/sign-in?mode=tutor" className="btn min-h-12 border border-white/50 px-7 text-base text-white hover:bg-white/10"><IconShieldCheck size={18} />Teach on TewsDay</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
