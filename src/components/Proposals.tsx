"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconStarFilled, IconBulb } from "@tabler/icons-react";
import { bids } from "@/data/mock";
import { Avatar, Pill } from "./ui";
import { baht, cn } from "@/lib/cn";

export function Proposals() {
  const router = useRouter();
  const [list, setList] = useState(bids);
  const [tab, setTab] = useState("all");
  return (
    <main className="container-page py-8">
      <p className="pb-3 text-xs text-muted">Home › My Requests › Mathematics (AP Calculus BC) Proposals</p>
      <div className="mb-6 flex items-start justify-between gap-4"><div><h1 className="max-w-2xl text-[32px] font-bold leading-10 tracking-tight">Proposals for: AP Calculus BC & Differential Equations</h1><p className="pt-2 text-muted">Review personalized proposals from vetted tutors. Compare methodologies, schedules, and hourly rates before confirming a trial lesson.</p></div>
        <div className="flex gap-2"><button className="btn-outline">Edit Request</button><button className="btn-outline">Pause Applications</button></div></div>
      <section className="card mb-6 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs"><span className="flex items-center gap-3"><Pill tone="green">● Open for proposals</Pill><span className="text-muted">Posted 3 hours ago · Request ID: #REQ-88219</span></span><span className="text-muted">{bids.length} Proposals Received · {list.length ? 3 : 0} Shortlisted · Avg. response: 24m</span></div>
        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4 text-xs md:grid-cols-6">{[["Subject Field", "AP & IB Mathematics"], ["Curriculum Level", "Grade 12 / Calc BC"], ["Budget Target", "฿800 – ฿1,500 / hr"], ["Preferred Format", "BTS Thong Lo / Online"], ["Frequency", "2x weekly (Mon/Wed/Sat)"], ["Timeline Urgency", "⚡ As soon as possible"]].map(([k, v]) => <div key={k}><p className="text-muted">{k}</p><b className="text-ink">{v}</b></div>)}</div>
      </section>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <div className="flex items-center justify-between"><div className="flex rounded-lg bg-surface-3 p-1 text-xs">{[["all", `All Proposals ${list.length}`], ["short", "Shortlisted 2"], ["arch", "Archived 0"]].map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={cn("rounded-md px-3 py-1.5", tab === k ? "bg-white font-medium shadow-sm" : "text-muted")}>{l}</button>)}</div><span className="text-xs text-muted">Sort: <b className="text-ink">Best Match</b></span></div>
          {list.map((b, i) => (
            <article key={b.id} className={cn("card relative p-5", i === 0 && "border-primary/40")}>
              {i === 0 && <span className="absolute right-0 top-0 rounded-bl-lg bg-primary-soft px-3 py-1 text-[11px] font-semibold text-primary">✦ {b.match}% MATCH RECOMMENDATION</span>}
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3"><Avatar name={b.tutor.name} size={56} online /><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-base font-semibold">{b.tutor.name}</h2><Pill tone="green">Verified Pro</Pill></div><p className="text-xs text-muted">{b.tutor.headline}</p><p className="flex items-center gap-1 pt-1 text-xs"><IconStarFilled size={13} className="text-amber-400" /><b>{b.tutor.rating.toFixed(1)}</b><span className="text-muted">({b.tutor.reviews} reviews) · Slots: {b.slots}</span></p></div></div>
                <div className="pt-6 text-right"><b className="text-[22px] text-primary">{baht(b.rate)}</b><span className="text-xs text-muted"> / hr</span></div>
              </div>
              <blockquote className="my-4 rounded-lg bg-surface-2 p-4 text-ink-2">“{b.msg}”</blockquote>
              <div className="flex flex-wrap items-center justify-between gap-2"><div className="flex gap-2"><Link href={`/tutors/${b.tutor.tutorProfileId}`} className="btn-outline">View Full Profile</Link><Link href="/me/chat" className="btn-outline">Message / Chat</Link></div>
                <div className="flex items-center gap-4"><button onClick={() => { setList(list.filter((x) => x.id !== b.id)); toast("Proposal declined."); }} className="text-sm text-muted hover:text-destructive">Decline</button>
                  <button onClick={() => { toast.success("Offer accepted — booking created (me_006_e)."); router.push("/me/bookings/BK-1042"); }} className="btn-primary">Accept Offer & Book Trial →</button></div></div>
            </article>))}
          {!list.length && <p className="py-16 text-center text-muted">No proposals left.</p>}
        </div>
        <aside className="space-y-4">
          <div className="card p-5"><b className="flex items-center gap-2"><IconBulb size={16} className="text-primary" />Hiring Advice for Students</b><ol className="list-decimal space-y-2 pl-5 pt-2 text-xs text-muted"><li>Verify syllabus alignment with the tutor.</li><li>Use the 30-minute trial lesson to test fit.</li><li>Keep communication on TewsDay for guaranteed trial reschedule protection.</li></ol></div>
          <div className="card border-primary/20 bg-primary-soft/40 p-5"><b>Need advisor assistance?</b><p className="py-2 text-xs text-muted">Not sure which instructor fits your target score? Our academic counselors can review your syllabus for free.</p><button className="btn-outline w-full">Talk to our academic matchmaker</button></div>
          <div className="card p-5 text-xs"><b className="text-sm">Request Lifecycle</b>{[["Request Published", "Today, 10:14", "text-success"], ["Reviewing Proposals", "In Progress (3)", "text-primary"], ["Trial Lesson Scheduled", "Pending", "text-muted"]].map(([k, v, c]) => <p key={k} className="flex justify-between pt-2"><span>● {k}</span><span className={c}>{v}</span></p>)}</div>
        </aside>
      </div>
    </main>
  );
}
