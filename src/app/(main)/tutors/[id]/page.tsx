import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconStarFilled, IconBookmark, IconMessage, IconCircleCheck, IconShieldCheck, IconMapPin } from "@tabler/icons-react";
import { ApiError } from "@/lib/api";
import { getTutor, searchTutorReviews } from "@/lib/tutors";
import { Avatar, Pill, Stars } from "@/components/ui";
import { BookingPanel } from "@/components/BookingPanel";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { baht } from "@/lib/cn";

const where = { online: "Online", onsite: "In person", both: "Online & in person" } as const;

export default function TutorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="container-page py-20 text-center text-muted-foreground">Loading profile…</div>}>
      <TutorProfile params={params} />
    </Suspense>
  );
}

async function TutorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // A malformed id fails validation (400) and an unknown one is 404; both mean "no such tutor".
  const [t, reviews] = await Promise.all([
    getTutor(id),
    searchTutorReviews(id).then((r) => r.data).catch(() => []),
  ]).catch((e) => { if (e instanceof ApiError && (e.status === 404 || e.status === 400)) notFound(); throw e; });
  const verified = t.verificationStatus === "verified";
  return (
    <main>
      <div className="border-b border-border bg-white"><div className="container-page py-2 text-xs text-muted-foreground">Home › <Link href="/tutors" className="hover:text-primary">Find Tutors</Link> › <span className="text-ink">{t.displayName}</span></div></div>
      <div className="container-page space-y-6 py-6">
        <section className="card flex flex-wrap items-center justify-between gap-6 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <Avatar name={t.displayName} size={96} />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-semibold">{t.displayName}</h1>{verified && <Pill tone="green">Verified</Pill>}</div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><IconStarFilled size={14} className="text-amber-400" /><b className="text-ink">{t.averageRating.toFixed(1)}</b> ({t.reviewCount} reviews)</span>
                <span className="flex items-center gap-1"><IconMapPin size={14} />{where[t.teachingLocationType]}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">{t.subjects.map((s) => <span key={s.tutorSubjectId} className="rounded bg-surface-3 px-2 py-0.5 text-[11px] font-medium">{s.subjectName}</span>)}</div>
            </div>
          </div>
          <div className="space-y-2 text-right">
            <div><span className="text-2xl font-bold">{t.hourlyRate != null ? baht(t.hourlyRate) : "—"}</span><span className="text-xs text-muted-foreground"> / hr</span></div>
            <div className="flex justify-end gap-2">
              <button className="btn-outline px-3" aria-label="Save"><IconBookmark size={16} /></button>
              <Link href="/me/chat" className="btn-outline"><IconMessage size={16} />Send Message</Link>
              <a href="#book" className="btn-primary">Book Session</a>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="card p-6"><h2 className="mb-3 font-semibold">About Me</h2>
              <p className="whitespace-pre-line text-muted-foreground">{t.bio || "This tutor has not added a bio yet."}</p>
            </section>
            {t.subjects.length > 0 && (
              <section className="card p-6"><h2 className="mb-4 font-semibold">Subjects</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {t.subjects.map((s) => (
                    <li key={s.tutorSubjectId} className="rounded-lg border border-border bg-surface-1 p-3">
                      <div className="flex justify-between gap-2"><b className="text-sm">{s.subjectName}</b>{(s.customHourlyRate ?? t.hourlyRate) != null && <span className="text-xs font-semibold">{baht((s.customHourlyRate ?? t.hourlyRate)!)} / hr</span>}</div>
                      <p className="text-xs text-muted-foreground">{[s.category, s.proficiencyLevel, s.gradeLevels.join(", ")].filter(Boolean).join(" · ")}</p>
                      {s.specializedTopics.length > 0 && <p className="mt-1 text-xs text-muted-foreground">{s.specializedTopics.join(", ")}</p>}
                    </li>))}
                </ul></section>
            )}
            {t.educations.length > 0 && (
              <section className="card p-6"><h2 className="mb-4 font-semibold">Education</h2>
                <ol className="space-y-4 border-l-2 border-border pl-5">
                  {t.educations.map((e) => (<li key={e.tutorEducationId} className="relative"><span className="absolute -left-[27px] top-1 size-3 rounded-full border-2 border-primary bg-white" />
                    <div className="flex justify-between"><div><p className="text-sm font-semibold">{[e.degree, e.fieldOfStudy].filter(Boolean).join(" in ") || "Education"}</p><p className="text-xs text-muted-foreground">{e.institution}</p>{e.isVerifiedFlag && <Pill tone="green" className="mt-1">✓ Verified</Pill>}</div>{e.graduationYear && <span className="text-xs text-muted-foreground">{e.graduationYear}</span>}</div></li>))}
                </ol></section>
            )}
            <AvailabilityCalendar />
            <section className="card p-6"><div className="mb-4 flex justify-between"><h2 className="font-semibold">Student Reviews</h2><span className="text-xs text-muted-foreground">{t.reviewCount} {t.reviewCount === 1 ? "review" : "reviews"}</span></div>
              {reviews.length === 0 ? <p className="text-muted-foreground">No reviews yet.</p> : (
                <>
                  <div className="mb-4 flex items-center gap-4 rounded-lg bg-surface-1 p-4"><div className="text-4xl font-bold">{t.averageRating.toFixed(1)}</div><div><Stars value={t.averageRating} /><p className="text-xs text-muted-foreground">Based on {t.reviewCount} {t.reviewCount === 1 ? "lesson" : "lessons"}</p></div></div>
                  <div className="space-y-3">{reviews.map((r) => (<div key={r.reviewId} className="rounded-lg border border-border p-4"><div className="mb-2 flex items-center justify-between"><div className="flex items-center gap-2"><Avatar name={r.reviewerDisplayName} size={32} /><div><b className="text-sm">{r.reviewerDisplayName}</b><p className="text-[11px] text-muted-foreground">{new Date(r.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p></div></div><Stars value={r.ratingScore} /></div>{r.comment && <p className="text-ink-2">“{r.comment}”</p>}</div>))}</div>
                </>)}
            </section>
          </div>
          <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <BookingPanel rate={t.hourlyRate ?? 0} />
            <section className="card space-y-2 p-5"><h3 className="flex items-center gap-2 font-semibold"><IconShieldCheck size={18} className="text-primary" />Verification</h3>
              <p className="flex items-center gap-2 text-xs"><IconCircleCheck size={15} className={verified ? "text-success" : "text-muted-foreground"} />{verified ? "Identity and credentials verified by TewsDay" : "Verification not completed yet"}</p></section>
            <section className="card space-y-2 p-5"><h3 className="flex items-center gap-2 font-semibold"><IconMapPin size={18} className="text-primary" />Teaching format</h3>
              <p className="text-xs">{where[t.teachingLocationType]}{t.serviceRadiusKm != null && t.teachingLocationType !== "online" ? ` · within ${t.serviceRadiusKm} km` : ""}</p></section>
          </div>
        </div>
      </div>
    </main>
  );
}
