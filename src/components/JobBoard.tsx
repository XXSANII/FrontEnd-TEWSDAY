"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconSearch, IconX, IconSend, IconBolt } from "@tabler/icons-react";
import { toast } from "sonner";
import { Pill, Tag } from "./ui";
import { baht } from "@/lib/cn";
import { ApiError, tokenStore } from "@/lib/api";
import { applyToJob, budgetLabel, freqLabel, jobTitle, modeLabel, searchJobs, timeAgo, type Job } from "@/lib/jobs";

export function JobBoard() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tries, setTries] = useState(0);
  const [open, setOpen] = useState<string | null>(null); // job whose full brief is expanded
  const [bid, setBid] = useState<Job | null>(null);
  const [rate, setRate] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let stale = false;
    searchJobs()
      .then((r) => { if (!stale) { setJobs(r.data); setError(""); } })
      .catch((e) => { if (!stale) setError(e instanceof Error ? e.message : "Could not load requests."); })
      .finally(() => { if (!stale) setLoading(false); });
    return () => { stale = true; };
  }, [tries]);

  const needle = q.trim().toLowerCase();
  const list = jobs.filter((j) => !needle || [j.subjectName, j.targetGradeLevel, j.learningGoal, ...j.topics].join(" ").toLowerCase().includes(needle));

  function startOffer(j: Job) {
    if (!tokenStore.get()) { toast.info("Sign in as a tutor to send an offer."); router.push("/sign-in?mode=tutor"); return; }
    setRate(j.budgetMax ?? j.budgetMin ?? 0);
    setBid(j);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!bid || busy) return;
    const f = new FormData(e.currentTarget);
    setBusy(true);
    try {
      await applyToJob(bid.studentJobId, {
        proposedRate: rate,
        coverMessage: String(f.get("message")).trim() || undefined,
        proposedAvailability: String(f.get("availability")).trim() || undefined,
      });
      toast.success("Offer sent to the student.");
      setBid(null);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) { toast.info("Please sign in again."); router.push("/sign-in?mode=tutor"); }
      else toast.error(err instanceof Error ? err.message : "Could not send the offer.");
    } finally { setBusy(false); }
  }

  return (
    <main>
      <div className="border-b border-border bg-white"><div className="container-page py-8">
        <p className="pb-2 text-xs text-muted-foreground">Home › Tutor Suite › Student Job Marketplace</p>
        <h1 className="text-[32px] font-bold tracking-tight">Student Request Marketplace</h1>
        <p className="text-muted-foreground">Browse active learning requests from students and send proposals to connect directly.</p></div></div>
      <div className="container-page grid gap-6 py-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <label className="card flex items-center gap-2 px-4 py-3"><IconSearch size={16} className="text-muted-foreground" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search subject, level or topic" aria-label="Search requests" className="flex-1 text-sm outline-none" /></label>
          {list.map((j) => (
            <article key={j.studentJobId} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex flex-wrap gap-2"><Pill tone="orange" className="normal-case">{j.subjectName}</Pill>{j.targetGradeLevel && <Pill>{j.targetGradeLevel}</Pill>}</div>
                <div className="text-right"><p className="eyebrow">Offer budget</p><b className="text-lg">{budgetLabel(j)}</b></div>
              </div>
              <h2 className="pt-3 text-lg font-semibold">{jobTitle(j)}</h2>
              <div className="flex flex-wrap items-center gap-2 py-2 text-xs text-muted-foreground">{modeLabel(j.locationType)} · {freqLabel(j.frequencyPerWeek)} · Posted {timeAgo(j.createdAt)}</div>
              {j.topics.length > 0 && <div className="flex flex-wrap gap-1.5">{j.topics.map((t) => <Tag key={t}>{t}</Tag>)}</div>}
              {open === j.studentJobId && <p className="mt-3 whitespace-pre-line text-sm text-ink-2">{j.learningGoal || "The student did not add more details."}</p>}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <button onClick={() => setOpen(open === j.studentJobId ? null : j.studentJobId)} aria-expanded={open === j.studentJobId} className="btn-outline px-3 py-1.5 text-xs">{open === j.studentJobId ? "Hide brief" : "View Full Brief"}</button>
                <button onClick={() => startOffer(j)} className="btn-primary">Send Offer →</button>
              </div>
            </article>))}
          {error ? (
            <div className="py-16 text-center" role="alert"><p className="font-semibold">Couldn&apos;t load requests</p><p className="text-muted-foreground">{error}</p><button onClick={() => { setLoading(true); setTries(tries + 1); }} className="btn-outline mt-4">Try again</button></div>
          ) : loading ? <p className="py-16 text-center text-muted-foreground">Loading requests…</p>
          : !list.length && <p className="py-16 text-center text-muted-foreground">{jobs.length ? "No requests match your search." : "No open requests right now."}</p>}
        </div>
        <aside className="space-y-4">
          <div className="card p-5"><b className="flex items-center gap-2"><IconBolt size={16} className="text-primary" />Proposal Success Tips</b><ol className="list-decimal space-y-2 pl-5 pt-2 text-xs text-muted-foreground"><li>Reply quickly while the request is fresh.</li><li>Mention the exam board and syllabus the student needs.</li><li>Offering a short free trial lowers the barrier to say yes.</li></ol></div>
        </aside>
      </div>

      {bid && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setBid(null)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={submit} className="max-h-[90vh] w-full max-w-lg space-y-4 overflow-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between"><div><p className="eyebrow text-primary-dark">Tutor proposal builder</p><h2 className="text-xl font-semibold">Submit Lesson Offer</h2></div><button type="button" onClick={() => setBid(null)} aria-label="Close"><IconX size={20} /></button></div>
            <div className="rounded-lg border border-primary/30 bg-primary-soft/50 p-3 text-xs"><b className="text-primary">{jobTitle(bid)}</b><p className="text-muted-foreground">Student budget: {budgetLabel(bid)} · {modeLabel(bid.locationType)}</p></div>
            <div><label className="label" htmlFor="rate">Your Proposed Hourly Rate (THB/hr)</label><input id="rate" type="number" required min={0} value={rate} onChange={(e) => setRate(+e.target.value)} className="input" />
              <p className="pt-1 text-xs text-muted-foreground">Platform commission is billed to you monthly. Est. net at 10%: <b className="text-primary">{baht(Math.round(rate * 0.9))}/hr</b></p></div>
            <div><label className="label" htmlFor="message">Personalized Message & Pitch</label><textarea id="message" name="message" required maxLength={2000} rows={4} className="input" placeholder="Introduce yourself and how you would help." /></div>
            <div><label className="label" htmlFor="availability">Earliest Availability / Start Date</label><input id="availability" name="availability" className="input" placeholder="e.g. Mon/Wed 17:00" /></div>
            <div className="flex flex-wrap justify-end gap-3"><button type="button" className="btn-outline" onClick={() => setBid(null)}>Cancel</button><button disabled={busy} className="btn-primary disabled:opacity-60"><IconSend size={14} />{busy ? "Sending…" : "Submit Offer"}</button></div>
          </form>
        </div>)}
    </main>
  );
}
