"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconBulb } from "@tabler/icons-react";
import { Avatar, Pill } from "./ui";
import { baht, cn } from "@/lib/cn";
import { ApiError } from "@/lib/api";
import { budgetLabel, freqLabel, getJob, jobTitle, modeLabel, searchApplications, setApplicationStatus, timeAgo, type Application, type JobDetail } from "@/lib/jobs";

const statusPill = { pending: null, accepted: ["green", "Accepted"], rejected: ["gray", "Declined"], withdrawn: ["gray", "Withdrawn"] } as const;
const jobPill = { open: ["green", "● Open for proposals"], matched: ["blue", "● Matched"], closed: ["gray", "● Closed"], cancelled: ["gray", "● Cancelled"] } as const;

export function Proposals({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [list, setList] = useState<Application[]>([]);
  const [tab, setTab] = useState<"all" | "pending" | "rejected">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | Error | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let stale = false;
    Promise.all([getJob(jobId), searchApplications(jobId)])
      .then(([j, a]) => { if (!stale) { setJob(j); setList(a.data); } })
      .catch((e) => { if (!stale) setError(e instanceof Error ? e : new Error("Could not load proposals.")); })
      .finally(() => { if (!stale) setLoading(false); });
    return () => { stale = true; };
  }, [jobId]);

  async function decide(a: Application, status: "accepted" | "rejected") {
    if (busyId) return;
    setBusyId(a.jobApplicationId);
    try {
      const r = await setApplicationStatus(a.jobApplicationId, status);
      if (status === "accepted") {
        toast.success("Offer accepted — booking created.");
        router.push(r.bookingId ? `/me/bookings/${r.bookingId}` : "/me");
      } else {
        setList((l) => l.map((x) => (x.jobApplicationId === a.jobApplicationId ? { ...x, status: "rejected" } : x)));
        toast("Proposal declined.");
      }
    } catch (e) { toast.error(e instanceof Error ? e.message : "Something went wrong."); }
    finally { setBusyId(null); }
  }

  if (loading) return <main className="container-page py-20 text-center text-muted-foreground">Loading proposals…</main>;
  if (error || !job) {
    const auth = error instanceof ApiError && error.status === 401;
    return (
      <main className="container-page py-20 text-center" role="alert">
        <p className="font-semibold">{auth ? "Please sign in to see your proposals." : "Couldn't load this request."}</p>
        {!auth && <p className="text-muted-foreground">{error?.message}</p>}
        {auth && <Link href="/sign-in" className="btn-primary mt-4 inline-flex">Sign in</Link>}
      </main>
    );
  }

  const shown = list.filter((a) => tab === "all" || (tab === "pending" ? a.status === "pending" : a.status === "rejected"));
  const count = (s: Application["status"]) => list.filter((a) => a.status === s).length;
  const [jTone, jText] = jobPill[job.status];
  return (
    <main className="container-page py-8">
      <p className="pb-3 text-xs text-muted-foreground">Home › My Requests › {job.subjectName} Proposals</p>
      <div className="mb-6"><h1 className="max-w-2xl text-[32px] font-bold leading-10 tracking-tight">Proposals for: {jobTitle(job)}</h1><p className="pt-2 text-muted-foreground">Review proposals from vetted tutors. Compare schedules and hourly rates before confirming a trial lesson.</p></div>
      <section className="card mb-6 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs"><span className="flex items-center gap-3"><Pill tone={jTone}>{jText}</Pill><span className="text-muted-foreground">Posted {timeAgo(job.createdAt)} · Request ID: #{job.studentJobId.slice(0, 8)}</span></span><span className="text-muted-foreground">{list.length} Proposals Received · {count("pending")} Pending</span></div>
        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4 text-xs md:grid-cols-5">{[["Subject", job.subjectName], ["Level", job.targetGradeLevel ?? "—"], ["Budget Target", budgetLabel(job)], ["Preferred Format", modeLabel(job.locationType)], ["Frequency", freqLabel(job.frequencyPerWeek)]].map(([k, v]) => <div key={k}><p className="text-muted-foreground">{k}</p><b className="text-ink">{v}</b></div>)}</div>
        {job.learningGoal && <p className="mt-4 border-t border-border pt-4 text-sm text-ink-2">{job.learningGoal}</p>}
      </section>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <div className="flex rounded-lg bg-surface-3 p-1 text-xs w-fit">{([["all", `All Proposals ${list.length}`], ["pending", `Pending ${count("pending")}`], ["rejected", `Declined ${count("rejected")}`]] as const).map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={cn("rounded-md px-3 py-1.5", tab === k ? "bg-white font-medium shadow-sm" : "text-muted-foreground")}>{l}</button>)}</div>
          {shown.map((a) => {
            const pill = statusPill[a.status];
            const slots = typeof a.proposedAvailability === "string" ? a.proposedAvailability : "";
            return (
              <article key={a.jobApplicationId} className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex gap-3"><Avatar name={a.tutorDisplayName} size={56} /><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-base font-semibold">{a.tutorDisplayName}</h2>{pill && <Pill tone={pill[0]}>{pill[1]}</Pill>}</div><p className="pt-1 text-xs text-muted-foreground">Sent {timeAgo(a.createdAt)}{slots && ` · Slots: ${slots}`}</p></div></div>
                  <div className="text-right"><b className="text-[22px] text-primary">{baht(a.proposedRate)}</b><span className="text-xs text-muted-foreground"> / hr</span></div>
                </div>
                {a.coverMessage && <blockquote className="my-4 whitespace-pre-line rounded-lg bg-surface-2 p-4 text-ink-2">“{a.coverMessage}”</blockquote>}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2"><div className="flex flex-wrap gap-2"><Link href={`/tutors/${a.tutorProfileId}`} className="btn-outline">View Full Profile</Link><Link href="/me/chat" className="btn-outline">Message / Chat</Link></div>
                  {a.status === "pending" && job.status === "open" && (
                    <div className="flex items-center gap-4"><button disabled={!!busyId} onClick={() => decide(a, "rejected")} className="text-sm text-muted-foreground hover:text-destructive disabled:opacity-60">Decline</button>
                      <button disabled={!!busyId} onClick={() => decide(a, "accepted")} className="btn-primary disabled:opacity-60">{busyId === a.jobApplicationId ? "Please wait…" : "Accept Offer & Book Trial →"}</button></div>)}
                </div>
              </article>);
          })}
          {!shown.length && <p className="py-16 text-center text-muted-foreground">{list.length ? "Nothing in this tab." : "No proposals yet. Tutors will reach out soon."}</p>}
        </div>
        <aside className="space-y-4">
          <div className="card p-5"><b className="flex items-center gap-2"><IconBulb size={16} className="text-primary" />Hiring Advice for Students</b><ol className="list-decimal space-y-2 pl-5 pt-2 text-xs text-muted-foreground"><li>Verify syllabus alignment with the tutor.</li><li>Use the 30-minute trial lesson to test fit.</li><li>Keep communication on TewsDay for guaranteed trial reschedule protection.</li></ol></div>
          <div className="card p-5 text-xs"><b className="text-sm">Request Lifecycle</b>{[["Request Published", timeAgo(job.createdAt), "text-success"], ["Reviewing Proposals", `${list.length} received`, job.status === "open" ? "text-primary" : "text-success"], ["Trial Lesson Scheduled", job.status === "matched" ? "Booked" : "Pending", job.status === "matched" ? "text-success" : "text-muted-foreground"]].map(([k, v, c]) => <p key={k} className="flex justify-between pt-2"><span>● {k}</span><span className={c}>{v}</span></p>)}</div>
        </aside>
      </div>
    </main>
  );
}
