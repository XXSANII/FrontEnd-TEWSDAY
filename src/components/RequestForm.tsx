"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  IconArrowLeft, IconArrowRight, IconX, IconPlus, IconDeviceLaptop, IconMapPin, IconSunrise, IconSun, IconMoon,
  IconMathFunction, IconAtom, IconLanguage, IconFlask, IconCode, IconBook2, IconSchool, IconRocket, IconCoin, IconSparkles, IconFlame, IconCalendar, IconClockHour4, IconSend,
} from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { ApiError, tokenStore } from "@/lib/api";
import { createJob } from "@/lib/jobs";
import { searchSubjects, searchTutors } from "@/lib/tutors";
import { ChoiceCard, Chip, Question, StepProgress } from "./form";

// Subjects come from the backend (pub_001_s); icons and topic suggestions are presentation only.
const subjectStyle: Record<string, { icon: typeof IconBook2; topics: string[] }> = {
  mathematics: { icon: IconMathFunction, topics: ["Calculus", "Algebra", "Statistics", "Geometry", "Exam prep"] },
  physics: { icon: IconAtom, topics: ["Mechanics", "Waves", "Electricity", "Thermodynamics", "Exam prep"] },
  english: { icon: IconLanguage, topics: ["IELTS", "Essay writing", "Grammar", "Speaking", "SAT"] },
  chemistry: { icon: IconFlask, topics: ["Organic", "Stoichiometry", "Lab skills", "Exam prep"] },
  coding: { icon: IconCode, topics: ["Python", "Web basics", "AP CS", "Algorithms"] },
};
const fallbackStyle = { icon: IconBook2, topics: ["Homework help", "Exam prep", "Catch up", "Get ahead"] };

const levels = [
  { label: "Primary", hint: "Grades 1–5" },
  { label: "Middle school", hint: "Grades 6–8" },
  { label: "High school / IGCSE", hint: "Grades 9–11" },
  { label: "IB / AP / A-Level", hint: "Pre-university" },
  { label: "University", hint: "Undergraduate" },
  { label: "Adult learner", hint: "Skills & careers" },
];

const budgets = [
  { id: "starter", label: "Starter", hint: "฿400 – 700 / hr", min: 400, max: 700 },
  { id: "standard", label: "Standard", hint: "฿700 – 1,200 / hr", min: 700, max: 1200 },
  { id: "expert", label: "Expert", hint: "฿1,200+ / hr", min: 1200, max: 3000 },
] as const;

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const slots = [
  { label: "Morning", hint: "09:00 – 12:00", icon: IconSunrise },
  { label: "Afternoon", hint: "13:00 – 17:00", icon: IconSun },
  { label: "Evening", hint: "17:00 – 21:00", icon: IconMoon },
];
const freqs = ["1× a week", "2× a week", "3× or more", "Crash course"];
const starts = [
  { id: "asap", label: "As soon as possible", icon: IconFlame },
  { id: "2w", label: "In 1–2 weeks", icon: IconCalendar },
  { id: "flex", label: "I'm flexible", icon: IconClockHour4 },
];

const titles = ["Subject", "Level", "Your goal", "Format & budget", "Schedule", "Review"];

export function RequestForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [subjectList, setSubjectList] = useState<{ id: string; label: string; icon: typeof IconBook2; topics: string[] }[]>([]);
  const [subjectError, setSubjectError] = useState("");
  const [tutorCount, setTutorCount] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [subject, setSubject] = useState<string>("");
  const [level, setLevel] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [custom, setCustom] = useState("");
  const [goal, setGoal] = useState("");
  const [mode, setMode] = useState<"online" | "onsite" | "">("");
  const [area, setArea] = useState("");
  const [budget, setBudget] = useState<string>("standard");
  const [sel, setSel] = useState<string[]>([]);
  const [slot, setSlot] = useState("Evening");
  const [freq, setFreq] = useState(freqs[1]);
  const [start, setStart] = useState("asap");

  useEffect(() => {
    searchSubjects()
      .then((r) => setSubjectList(r.data.map((s) => ({ id: s.subjectId, label: s.name, ...(subjectStyle[s.name.toLowerCase()] ?? fallbackStyle) }))))
      .catch((e) => setSubjectError(e instanceof Error ? e.message : "Could not load subjects."));
    searchTutors({ verifiedOnlyFlag: true, pageSize: 1 }).then((r) => setTutorCount(r.total)).catch(() => setTutorCount(null));
  }, []);

  const current = subjectList.find((s) => s.label === subject);
  const suggestions = current?.topics ?? [];
  const toggle = <T,>(_list: T[], v: T, set: React.Dispatch<React.SetStateAction<T[]>>) => set((l) => (l.includes(v) ? l.filter((x) => x !== v) : [...l, v]));
  const addCustom = () => { const t = custom.trim(); if (t && !topics.includes(t)) setTopics([...topics, t]); setCustom(""); };

  const valid = [!!subject, !!level, topics.length > 0 || goal.trim().length > 5, !!mode && (mode === "online" || area.trim().length > 1), sel.length > 0, true][step];
  const b = budgets.find((x) => x.id === budget)!;
  const last = step === titles.length - 1;

  const summary: [string, string][] = [
    ["Subject", subject || "—"], ["Level", level || "—"], ["Focus", topics.length ? topics.slice(0, 3).join(", ") + (topics.length > 3 ? ` +${topics.length - 3}` : "") : "—"],
    ["Format", mode ? (mode === "online" ? "Online" : `Onsite · ${area || "…"}`) : "—"], ["Budget", b.hint], ["Schedule", sel.length ? `${sel.join(", ")} · ${slot}` : "—"],
  ];

  async function publish() {
    if (busy || !current) return;
    if (!tokenStore.get()) { toast.info("Please sign in to publish your request."); router.push("/sign-in"); return; }
    setBusy(true);
    try {
      const job = await createJob({
        subjectId: current.id,
        targetGradeLevel: level,
        topics,
        learningGoal: goal.trim() || undefined,
        budgetMin: b.min,
        budgetMax: b.max,
        locationType: mode as "online" | "onsite",
        frequencyPerWeek: ({ "1× a week": 1, "2× a week": 2, "3× or more": 3 } as Record<string, number>)[freq] ?? null,
        preferredDays: { days: sel, timeOfDay: slot, start, area: mode === "onsite" ? area.trim() : undefined },
      });
      toast.success("Tutor request published. Tutors will reach out soon.");
      router.push(`/me/jobs/${job.studentJobId}`);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) { toast.info("Please sign in to publish your request."); router.push("/sign-in"); }
      else toast.error(e instanceof Error ? e.message : "Could not publish your request.");
    } finally { setBusy(false); }
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
      <form onSubmit={(e) => { e.preventDefault(); if (last) publish(); else if (valid) setStep(step + 1); }} className="card p-5 sm:p-8">
        <StepProgress step={step} total={titles.length} title={titles[step]} />
        <div key={step} className="animate-step pt-8">
          {step === 0 && (<>
            <Question title="What would you like to learn?" hint="Pick the closest subject. You can add details next." />
            <div role="radiogroup" aria-label="Subject" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {subjectError && <p className="col-span-full text-sm text-destructive" role="alert">{subjectError}</p>}
              {subjectList.map((s) => (
                <button type="button" role="radio" aria-checked={subject === s.label} key={s.label} onClick={() => { setSubject(s.label); setTopics([]); }}
                  className={cn("flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 text-center transition-all duration-200 active:scale-[0.97]",
                    subject === s.label ? "border-primary bg-primary-soft shadow-sm" : "border-border bg-white hover:-translate-y-0.5 hover:border-primary/40")}>
                  <span className={cn("grid size-12 place-items-center rounded-xl", subject === s.label ? "bg-primary text-white" : "bg-surface-2 text-ink-2")}><s.icon size={24} /></span>
                  <b className="text-sm">{s.label}</b>
                </button>
              ))}
            </div>
          </>)}

          {step === 1 && (<>
            <Question title="Which level are you studying at?" hint="This helps us find tutors who teach at your pace." />
            <div role="radiogroup" aria-label="Level" className="grid gap-3 sm:grid-cols-2">
              {levels.map((l) => <ChoiceCard key={l.label} icon={IconSchool} label={l.label} hint={l.hint} active={level === l.label} onClick={() => setLevel(l.label)} />)}
            </div>
          </>)}

          {step === 2 && (<>
            <Question title="What do you want to get better at?" hint="Tap what applies, or write it in your own words." />
            <div className="flex flex-wrap gap-2">
              {[...suggestions, ...topics.filter((t) => !(suggestions as readonly string[]).includes(t))].map((t) => (
                <Chip key={t} active={topics.includes(t)} onClick={() => toggle(topics, t, setTopics)}>{t}</Chip>
              ))}
              <span className="inline-flex min-h-10 items-center gap-1 rounded-full border border-dashed border-border bg-surface-1 pl-3 pr-1">
                <IconPlus size={14} className="text-muted-foreground" />
                <input value={custom} onChange={(e) => setCustom(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustom(); } }}
                  placeholder="Add your own" aria-label="Add your own topic" className="w-28 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
                {custom.trim() && <button type="button" onClick={addCustom} className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">Add</button>}
              </span>
            </div>
            <label className="label mt-6" htmlFor="goal">Anything else your tutor should know? <span className="font-normal text-muted-foreground">(optional)</span></label>
            <textarea id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} rows={4} className="input" placeholder="e.g. I have my AP exam in May and want to reach a 5. Series and polar coordinates feel hardest." />
          </>)}

          {step === 3 && (<>
            <Question title="How would you like to learn?" />
            <div role="radiogroup" aria-label="Format" className="grid gap-3 sm:grid-cols-2">
              <ChoiceCard icon={IconDeviceLaptop} label="Online" hint="Learn from anywhere" active={mode === "online"} onClick={() => setMode("online")} />
              <ChoiceCard icon={IconMapPin} label="In person" hint="Tutor comes to you or meets nearby" active={mode === "onsite"} onClick={() => setMode("onsite")} />
            </div>
            {mode === "onsite" && (
              <div className="animate-step mt-4"><label className="label" htmlFor="area">Where would you like to meet?</label>
                <div className="relative"><IconMapPin size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" /><input id="area" value={area} onChange={(e) => setArea(e.target.value)} className="input pl-10" placeholder="e.g. Siam, BTS Thong Lo" /></div></div>
            )}
            <h3 className="mb-3 mt-8 font-bold">What&apos;s your budget per hour?</h3>
            <div role="radiogroup" aria-label="Budget" className="grid gap-3 sm:grid-cols-3">
              {budgets.map((x, i) => <ChoiceCard key={x.id} icon={[IconCoin, IconSparkles, IconRocket][i]} label={x.label} hint={x.hint} active={budget === x.id} onClick={() => setBudget(x.id)} />)}
            </div>
          </>)}

          {step === 4 && (<>
            <Question title="When are you free?" hint="Choose the days and time that usually work for you." />
            <div className="flex flex-wrap gap-2" role="group" aria-label="Days">
              {days.map((d) => (
                <button type="button" key={d} aria-pressed={sel.includes(d)} onClick={() => toggle(sel, d, setSel)}
                  className={cn("grid size-12 cursor-pointer place-items-center rounded-full border-2 text-sm font-bold transition-all duration-200 active:scale-90",
                    sel.includes(d) ? "border-primary bg-primary text-white shadow-sm" : "border-border bg-white hover:border-primary/50")}>{d}</button>
              ))}
            </div>
            <div role="radiogroup" aria-label="Time of day" className="mt-5 grid gap-3 sm:grid-cols-3">
              {slots.map((s) => <ChoiceCard key={s.label} icon={s.icon} label={s.label} hint={s.hint} active={slot === s.label} onClick={() => setSlot(s.label)} />)}
            </div>
            <h3 className="mb-3 mt-8 font-bold">How often?</h3>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Frequency">{freqs.map((f) => <Chip key={f} active={freq === f} onClick={() => setFreq(f)}>{f}</Chip>)}</div>
            <h3 className="mb-3 mt-8 font-bold">When do you want to start?</h3>
            <div role="radiogroup" aria-label="Start" className="grid gap-3 sm:grid-cols-3">
              {starts.map((s) => <ChoiceCard key={s.id} icon={s.icon} label={s.label} active={start === s.id} onClick={() => setStart(s.id)} />)}
            </div>
          </>)}

          {step === 5 && (<>
            <Question title="Looks good? Let's find your tutor." hint="Check your request below. Tutors reply within a few hours." />
            <dl className="divide-y divide-border rounded-2xl border border-border">
              {summary.map(([k, v], i) => (
                <div key={k} className="flex items-center justify-between gap-4 px-4 py-3">
                  <dt className="text-sm text-muted-foreground">{k}</dt>
                  <dd className="flex min-w-0 items-center gap-3 text-right font-semibold"><span className="truncate">{v}</span>
                    <button type="button" onClick={() => setStep([0, 1, 2, 3, 3, 4][i])} className="min-h-10 shrink-0 px-1 text-xs font-semibold text-primary hover:underline">Edit</button></dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">Your contact details stay private. Only verified tutors can reply to your request.</p>
          </>)}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-5">
          <button type="button" onClick={() => setStep(step - 1)} disabled={step === 0} className="btn-outline min-h-12 disabled:invisible"><IconArrowLeft size={16} />Back</button>
          <div className="flex items-center gap-3">
            <button disabled={!valid || busy} className="btn-primary min-h-12 px-7 text-base">{last ? <><IconSend size={18} />{busy ? "Publishing…" : "Publish request"}</> : <>Continue<IconArrowRight size={18} /></>}</button>
          </div>
        </div>
      </form>

      <aside className="space-y-4 lg:sticky lg:top-20">
        <div className="card p-5">
          <div className="mb-2 flex items-center justify-between"><b>Your request</b><span className="pill bg-primary-soft text-primary-dark">Draft</span></div>
          <ul className="space-y-0.5">
            {summary.map(([k, v]) => <li key={k} className="flex justify-between gap-3 py-1.5 text-sm"><span className="text-muted-foreground">{k}</span><span className={cn("truncate text-right font-medium", v === "—" && "text-faint")}>{v}</span></li>)}
          </ul>
        </div>
        {tutorCount != null && <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary-soft p-4">
          <span className="grid size-11 place-items-center rounded-full bg-primary font-bold text-white">{tutorCount}</span>
          <div className="text-sm"><b>Verified tutors</b><p className="text-xs text-muted-foreground">are ready to match your request.</p></div>
        </div>}
      </aside>
    </div>
  );
}
