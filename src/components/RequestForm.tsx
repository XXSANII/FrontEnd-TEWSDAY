"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

const levels = ["Primary", "Middle School (Gr. 6-8)", "High School / IGCSE", "IB / AP / A-Levels", "Undergraduate", "Adult / Professional"];
const freqs = ["1 session / week", "2 sessions / week", "3+ sessions / week", "Crash Course"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const times = ["Morning (09-12)", "Afternoon (13-17)", "Evening (17-21)"];

function Section({ n, t, children }: { n: number; t: string; children: React.ReactNode }) {
  return (
    <section className="card p-6"><h2 className="mb-5 flex items-center gap-3 border-b border-border pb-3 text-base font-semibold"><span className="grid size-6 place-items-center rounded-full bg-primary text-xs text-white">{n}</span>{t}</h2><div className="space-y-5">{children}</div></section>
  );
}

export function RequestForm() {
  const router = useRouter();
  const [level, setLevel] = useState(levels[3]);
  const [topics, setTopics] = useState(["AP Calculus BC", "Differential Equations", "Exam Preparation"]);
  const [newTopic, setNewTopic] = useState("");
  const [mode, setMode] = useState<"online" | "onsite">("onsite");
  const [min, setMin] = useState(600);
  const [max, setMax] = useState(1500);
  const [freq, setFreq] = useState(freqs[1]);
  const [sel, setSel] = useState(["Mon", "Wed", "Sat"]);
  const [time, setTime] = useState(times[2]);
  const [urgency, setUrgency] = useState("asap");
  const [goal, setGoal] = useState("Preparing for May AP exams, targeting a 5 on BC Calculus. Struggling with series convergence tests and polar coordinates.");
  const toggle = (d: string) => setSel(sel.includes(d) ? sel.filter((x) => x !== d) : [...sel, d]);
  const opt = (on: boolean) => cn("rounded-lg border px-3 py-2.5 text-center text-sm", on ? "border-primary bg-primary-soft font-medium text-primary" : "border-border bg-white hover:bg-surface-2");
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Tutor request published (me_005_c)."); router.push("/me/jobs/REQ-88219"); }} className="space-y-6">
        <Section n={1} t="Academic Focus & Goals">
          <div><label className="label">Primary Subject *</label><select className="input"><option>Mathematics (AP / IB / A-Level)</option><option>Physics</option><option>English</option></select></div>
          <div><label className="label">Academic Level *</label><div className="grid grid-cols-3 gap-2">{levels.map((l) => <button type="button" key={l} onClick={() => setLevel(l)} className={opt(level === l)}>{l}</button>)}</div></div>
          <div><label className="label">Specific Focus Areas & Exam Targets</label>
            <div className="flex flex-wrap items-center gap-2 rounded-lg bg-surface-2 p-3">{topics.map((t) => <span key={t} className="flex items-center gap-1 rounded-md border border-border bg-white px-2 py-1 text-xs">{t}<button type="button" onClick={() => setTopics(topics.filter((x) => x !== t))} aria-label={`Remove ${t}`}><IconX size={12} /></button></span>)}
              <input value={newTopic} onChange={(e) => setNewTopic(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (newTopic.trim()) { setTopics([...topics, newTopic.trim()]); setNewTopic(""); } } }} placeholder="+ Add topic" className="bg-transparent text-xs outline-none" /></div></div>
          <div><div className="flex justify-between"><label className="label">What are your specific learning objectives or exam targets?</label><span className="text-xs text-muted">{goal.split(/\s+/).filter(Boolean).length} / 300 words</span></div><textarea value={goal} onChange={(e) => setGoal(e.target.value)} rows={3} className="input" /></div>
        </Section>
        <Section n={2} t="Budget & Learning Format">
          <div><div className="flex justify-between"><label className="label">Target Hourly Budget (THB / Hour)</label><b className="text-primary">{`฿${min} – ฿${max.toLocaleString()}`} <span className="text-xs font-normal text-muted">/ hr</span></b></div>
            <div className="grid grid-cols-2 gap-4"><input type="range" min={400} max={3000} step={50} value={min} onChange={(e) => setMin(Math.min(+e.target.value, max - 100))} className="accent-primary" /><input type="range" min={400} max={3000} step={50} value={max} onChange={(e) => setMax(Math.max(+e.target.value, min + 100))} className="accent-primary" /></div>
            <p className="flex justify-between text-xs text-muted"><span>Min: ฿400/hr</span><span>Max: ฿3,000+/hr</span></p></div>
          <div><label className="label">Learning Format *</label><div className="grid grid-cols-2 rounded-lg bg-surface-3 p-1">{(["online", "onsite"] as const).map((m) => <button type="button" key={m} onClick={() => setMode(m)} className={cn("rounded-md py-2 text-sm", mode === m ? "bg-white font-medium text-primary shadow-sm" : "text-muted")}>{m === "online" ? "Online Classroom" : "Onsite / In-Person"}</button>)}</div></div>
          {mode === "onsite" && <div className="rounded-lg border border-border p-4"><label className="label">Preferred Study Location</label><input className="input" defaultValue="Siam / Pathum Wan or BTS Thong Lo" /><div className="mt-3 grid h-24 place-items-center rounded-lg bg-surface-2 text-xs text-muted">Coverage: 5 km radius around Central Bangkok & BTS Green Line</div></div>}
        </Section>
        <Section n={3} t="Schedule & Frequency">
          <div><label className="label">Session Frequency</label><div className="grid grid-cols-4 gap-2">{freqs.map((f) => <button type="button" key={f} onClick={() => setFreq(f)} className={opt(freq === f)}>{f}</button>)}</div></div>
          <div><label className="label">Preferred Days</label><div className="flex gap-2">{days.map((d) => <button type="button" key={d} onClick={() => toggle(d)} className={cn(opt(sel.includes(d)), "px-4 py-1.5")}>{d}</button>)}</div></div>
          <div><label className="label">Preferred Time Slot</label><div className="grid grid-cols-3 gap-2">{times.map((t) => <button type="button" key={t} onClick={() => setTime(t)} className={opt(time === t)}>{t}</button>)}</div></div>
        </Section>
        <Section n={4} t="Urgency & Preferences">
          <div className="grid gap-5 sm:grid-cols-2">
            <div><label className="label">Start Date Urgency</label>{[["asap", "As soon as possible"], ["2w", "Within 1-2 weeks"], ["flex", "Flexible / Next month"]].map(([v, l]) => <label key={v} className={cn("mb-2 flex cursor-pointer items-center gap-2 rounded-lg border p-3", urgency === v ? "border-primary bg-primary-soft/60" : "border-border")}><input type="radio" checked={urgency === v} onChange={() => setUrgency(v)} className="accent-primary" />{l}</label>)}</div>
            <div className="space-y-3"><div><label className="label">Instruction Language</label><select className="input"><option>Bilingual (English & Thai)</option><option>English</option><option>Thai</option></select></div><div><label className="label">Tutor Gender Preference</label><select className="input"><option>No Preference (Open to All)</option><option>Female</option><option>Male</option></select></div></div></div>
        </Section>
        <div className="flex gap-3"><button className="btn-primary flex-1 py-3.5">Publish Tutor Request →</button><button type="button" onClick={() => toast("Draft saved.")} className="btn-outline px-8">Save Draft</button></div>
        <p className="text-xs text-muted">🔒 Your contact details remain confidential. Only qualified vetted tutors can respond to your request.</p>
      </form>
      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <div className="card p-5"><div className="mb-3 flex justify-between"><b>Live Request Summary</b><span className="pill bg-primary-soft text-primary">Draft</span></div>
          {[["Subject", "Mathematics"], ["Level", level.split(" (")[0]], ["Budget", `฿${min} – ฿${max.toLocaleString()} / hr`], ["Format", mode === "onsite" ? "Onsite (Bangkok)" : "Online"], ["Frequency", freq], ["Schedule", `${sel.join(", ")} (${time.split(" ")[0]})`]].map(([k, v]) => <p key={k} className="flex justify-between py-1 text-xs"><span className="text-muted">{k}:</span><span className="font-medium">{v}</span></p>)}</div>
        <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary-soft/60 p-4"><span className="grid size-10 place-items-center rounded-full bg-primary text-white">18</span><div><b>18 Vetted Tutors</b><p className="text-xs text-muted">Currently match these exact criteria in Bangkok Central.</p></div></div>
        <div className="card p-5"><b>How Matching Works</b><ol className="space-y-3 pt-3 text-xs">{[["Submit your request", "Advisor reviews your goals for optimal match."], ["Receive tailor-fit proposals", "Review tutor video intros & student reviews."], ["Free 30-min trial call", "Confirm chemistry before committing to a plan."]].map(([h, p], i) => <li key={h} className="flex gap-3"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-surface-3 text-[11px] font-semibold">{i + 1}</span><span><b className="block">{h}</b><span className="text-muted">{p}</span></span></li>)}</ol></div>
      </aside>
    </div>
  );
}
