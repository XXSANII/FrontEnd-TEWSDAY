"use client";
import { useState } from "react";
import { IconSearch, IconX, IconBookmark, IconEye, IconSend, IconBolt } from "@tabler/icons-react";
import { toast } from "sonner";
import { jobs } from "@/data/mock";
import { Avatar, Pill, Tag } from "./ui";
import { baht } from "@/lib/cn";

export function JobBoard() {
  const [q, setQ] = useState("");
  const [bid, setBid] = useState<(typeof jobs)[number] | null>(null);
  const [rate, setRate] = useState(1200);
  const list = jobs.filter((j) => (j.title + j.topics.join(" ")).toLowerCase().includes(q.toLowerCase()));
  return (
    <main>
      <div className="border-b border-border bg-white"><div className="container-page py-8">
        <p className="pb-2 text-xs text-muted">Home › Tutor Suite › Student Job Marketplace</p>
        <h1 className="text-[32px] font-bold tracking-tight">Student Request Marketplace</h1>
        <p className="text-muted">Browse active learning requests from students and send proposals to connect directly.</p></div></div>
      <div className="container-page grid gap-6 py-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <label className="card flex items-center gap-2 px-4 py-3"><IconSearch size={16} className="text-muted" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Calculus & Physics" className="flex-1 text-sm outline-none" /></label>
          {list.map((j, i) => (
            <article key={j.studentJobId} className={`card p-5 ${i === 0 ? "border-l-4 border-l-primary" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex flex-wrap gap-2">{i === 0 && <Pill tone="orange">● Urgent · Starts this week</Pill>}<Pill tone="orange" className="normal-case">{j.topics[0]}</Pill><Pill>{j.grade}</Pill></div>
                <div className="text-right"><p className="eyebrow">Offer budget</p><b className="text-lg">{j.budget}</b></div>
              </div>
              <h2 className="pt-3 text-lg font-semibold">{j.title}</h2>
              <div className="flex items-center gap-2 py-2 text-xs text-muted"><Avatar name={j.student} size={28} />{j.student} · {j.mode} · {j.freq} · Posted {j.posted}<Pill tone="green">AI match {j.match}%</Pill></div>
              <div className="flex flex-wrap gap-1.5">{j.topics.map((t) => <Tag key={t}>{t}</Tag>)}</div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <div className="flex gap-2"><button className="btn-outline px-3 py-1.5 text-xs"><IconBookmark size={14} />Save</button><button className="btn-outline px-3 py-1.5 text-xs"><IconEye size={14} />View Full Brief</button></div>
                <button onClick={() => setBid(j)} className="btn-primary">Send Offer →</button>
              </div>
            </article>))}
          {!list.length && <p className="py-16 text-center text-muted">No requests match your search.</p>}
        </div>
        <aside className="space-y-4">
          <div className="card p-5"><div className="flex items-center justify-between"><div><b>Instant Lead Alerts</b><p className="text-xs text-muted">via LINE and Email</p></div><span className="relative h-6 w-11 rounded-full bg-primary"><span className="absolute right-0.5 top-0.5 size-5 rounded-full bg-white" /></span></div></div>
          <div className="card p-5"><b>Hourly Rate Benchmarks</b>{[["Calculus", "฿950 – ฿1,350"], ["Physics C", "฿900 – ฿1,300"], ["Math Prep", "฿850 – ฿1,150"]].map(([s, r]) => <p key={s} className="flex justify-between border-b border-border py-2 text-xs last:border-0"><span>{s}</span><b className="text-success">{r} / hr</b></p>)}</div>
          <div className="card p-5"><b className="flex items-center gap-2"><IconBolt size={16} className="text-primary" />Proposal Success Tips</b><ol className="list-decimal space-y-2 pl-5 pt-2 text-xs text-muted"><li>Respond under 1 hour: 3.4× higher acceptance rate.</li><li>Cite the specific exam board and syllabus codes.</li><li>Offering a 20–30 min free trial removes barrier-to-entry.</li></ol></div>
        </aside>
      </div>

      {bid && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setBid(null)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); toast.success(`Offer sent to ${bid.student} (me_006_c).`); setBid(null); }} className="max-h-[90vh] w-full max-w-lg space-y-4 overflow-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between"><div><p className="eyebrow text-primary-dark">Tutor proposal builder</p><h2 className="text-xl font-semibold">Submit Lesson Offer to {bid.student}</h2></div><button type="button" onClick={() => setBid(null)} aria-label="Close"><IconX size={20} /></button></div>
            <div className="rounded-lg border border-primary/30 bg-primary-soft/50 p-3 text-xs"><b className="text-primary">{bid.title}</b><p className="text-muted">Student budget: {bid.budget} · {bid.mode}</p></div>
            <div><label className="label">Your Proposed Hourly Rate (THB/hr)</label><input type="number" min={100} value={rate} onChange={(e) => setRate(+e.target.value)} className="input" />
              <p className="flex justify-between pt-1 text-xs text-muted"><span>Platform commission 10% (8% for 20+ hrs/month) is billed monthly.</span><b className="text-primary">Est. net: {baht(Math.round(rate * 0.9))}/hr</b></p></div>
            <div><label className="label">Personalized Message & Pitch</label><textarea required rows={4} className="input" defaultValue={`Hi ${bid.student.split(" ")[0]}! I have relevant experience and can start this week with a free 30-minute trial.`} /></div>
            <div><label className="label">Earliest Availability / Start Date</label><input className="input" defaultValue="Tomorrow, 17:00 ICT" /></div>
            <div className="flex justify-end gap-3"><button type="button" className="btn-outline" onClick={() => setBid(null)}>Cancel</button><button className="btn-primary"><IconSend size={14} />Submit Offer & Message Student</button></div>
          </form>
        </div>)}
    </main>
  );
}
