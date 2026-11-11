"use client";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { IconArrowUp, IconBookmark, IconShare, IconCircleCheck, IconArrowLeft, IconMessageQuestion } from "@tabler/icons-react";
import { Avatar, Pill } from "@/components/ui";

const steps = [
  ["Define the original integral and assign LIATE variables", "Let I = ∫ e^{3x} sin(2x) dx. By LIATE (trig precedes exponential): u = sin(2x), dv = e^{3x} dx → du = 2cos(2x) dx, v = (1/3)e^{3x}."],
  ["Apply the Parts Formula", "I = (1/3)e^{3x} sin(2x) − (2/3)∫ e^{3x} cos(2x) dx   … (Equation 1)"],
  ["Second iteration (where 90% of students make sign errors)", "Apply parts again with u = cos(2x). Substitute back into Equation 1 with bold brackets: I = (1/3)e^{3x} sin(2x) − (2/3)[ (1/3)e^{3x} cos(2x) + (2/3) I ]."],
  ["Solve algebraically for I and append the constant", "(13/9) I = … ⇒ I = e^{3x}/13 · [ 3 sin(2x) − 2 cos(2x) ] + C"],
];
export default function QAThread() {
  const [up, setUp] = useState(18);
  const [voted, setVoted] = useState(false);
  return (
    <main className="container-page py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5"><Link href="/me/qa" className="inline-flex min-h-10 items-center gap-1.5 font-semibold text-primary hover:underline"><IconArrowLeft size={16} />Back to Q&A</Link><span className="flex items-center gap-1.5 text-sm text-muted-foreground"><IconMessageQuestion size={16} className="text-primary" />Q&A · Mathematics · Question #QA-8492</span></div>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="card p-6">
            <div className="flex items-center gap-3 pb-3"><Avatar name="Ploy C." size={40} /><div className="text-xs"><b className="text-sm">Ploy C.</b> <span className="text-muted-foreground">Grade 12 · Bangkok Patana · Posted 4 hours ago · 142 views</span></div></div>
            <div className="flex flex-wrap gap-2 pb-3"><Pill tone="orange">AP Calculus BC</Pill><Pill>Integration by Parts</Pill><Pill>Exam Prep May 2025</Pill></div>
            <p className="eyebrow pb-1 text-primary-dark">Question</p><h1 className="text-2xl font-extrabold leading-8 tracking-tight">How to evaluate the recursive integral ∫ e^{"{3x}"} · sin(2x) dx using Integration by Parts without sign errors?</h1>
            <p className="py-3 text-muted-foreground">I am practicing integration by parts for upcoming AP Calculus BC mock exams. Every time I apply the parts formula twice to cyclic trigonometric integrals like this, I get tangled up with sign changes when calculating the original integral on the left-hand side.</p>
            <div className="grid h-36 place-items-center rounded-lg bg-surface-3 text-xs text-muted-foreground">Calculus_Homework_Set3_Problem6.png (Scanned scratchpad · 1.4 MB)</div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-2"><button onClick={() => { setUp(voted ? up - 1 : up + 1); setVoted(!voted); }} className={`btn-outline ${voted ? "border-primary text-primary" : ""}`}><IconArrowUp size={14} />{up} Upvotes</button><button className="btn-outline" onClick={() => toast("Saved to your bookmarks.")}><IconBookmark size={14} />Save</button><button className="btn-outline" onClick={() => { navigator.clipboard?.writeText(window.location.href); toast("Link copied."); }}><IconShare size={14} />Share</button></div><span className="flex items-center gap-1 text-xs text-success"><IconCircleCheck size={14} />2 Verified Tutor Solutions</span></div>
          </section>
          <h2 className="flex items-center gap-2 text-xl font-bold"><IconCircleCheck size={22} className="text-success" />2 answers from verified tutors</h2>
          <section className="card border-success/40 bg-success-soft/30 p-6">
            <p className="pb-3 text-xs font-semibold text-success">✓ ACCEPTED SOLUTION · Verified by TewsDay Academic Council</p>
            <div className="flex items-center gap-3 pb-4"><Avatar name="Elena Rostova" size={44} /><div><b>Dr. Elena Rostova, Ph.D.</b> <Pill tone="orange">Top 1% Tutor</Pill><p className="text-xs text-muted-foreground">AP Calculus & Physics Specialist · 4.98 ★ (140+ answers)</p></div></div>
            <p className="pb-3">Hello Ploy! Cyclic integrals involving e^(ax) sin(bx) are famous on the AP Calculus free-response section. The secret to avoiding sign errors is explicitly labelling the original integral as <i>I</i> and wrapping the second integration by parts in rigid brackets.</p>
            <ol className="space-y-3">{steps.map(([h, b], i) => <li key={h} className="rounded-lg border border-border bg-white p-4"><b className="flex items-center gap-2"><span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] text-white">{i + 1}</span>{h}</b><p className="pt-2 font-mono text-xs text-muted-foreground">{b}</p></li>)}</ol>
            <p className="mt-4 rounded-lg border border-primary/20 bg-primary-soft/60 p-4 text-xs"><b className="text-primary-dark">Dr. Elena&apos;s Exam Tip:</b> Whenever you differentiate cosine, the negative sign turns the second integral subtraction into a positive addition. If you end up with “+ … = …” on the LHS, you dropped one of the three negative sign iterations!</p>
            <div className="mt-4 flex flex-wrap gap-2"><button className="btn-outline text-success">42 Upvotes · Helpful to students</button><button className="btn-primary" onClick={() => toast.success("Booking request started.")}>Book 1-on-1 with Dr. Elena</button></div>
          </section>
          <section className="card p-6"><div className="flex items-center gap-3 pb-3"><Avatar name="Krit L." size={36} /><div className="text-xs"><b className="text-sm">Krit T., M.Sc. Chulalongkorn</b> <Pill tone="green">Verified Tutor</Pill><p className="text-muted-foreground">Calculus & Linear Algebra Tutor · Answered 1 hour ago</p></div></div><Pill tone="amber">Fast alternative</Pill><p className="pt-2 text-muted-foreground">Tabular (DI) Method Quick-Check: build a table of derivatives of sin(2x) and integrals of e^(3x); multiply diagonals with alternating signs until the row repeats, then solve for I.</p></section>
          <details className="card group p-6"><summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3"><b>Are you a tutor? Write an answer</b><Pill tone="orange">Tutors only</Pill></summary><div className="pt-4"><textarea rows={5} placeholder="Write your step-by-step explanation. Use LaTeX for math equations ($$…$$) and explain common pitfalls students face on this question…" className="input" />
            <label className="mt-3 flex cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-border p-6 text-center text-xs text-muted-foreground">Drag and drop solution images, scanned scratchpad, or diagrams<span>PNG, JPG, or PDF up to 10MB</span><input type="file" className="hidden" /></label>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3"><label className="flex items-center gap-2 text-xs"><input type="checkbox" defaultChecked className="accent-primary" />Adheres to TewsDay Honor Code & Academic Integrity</label><div className="flex gap-2"><button className="btn-outline">Save Draft</button><button className="btn-primary" onClick={() => toast.success("Solution submitted.")}>Submit Solution</button></div></div></div></details>
        </div>
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div className="card p-5"><b>Need 1-on-1 Help With This?</b><p className="pb-3 text-xs text-muted-foreground">Connect with certified AP Calculus specialists right now.</p>{[["Dr. Elena Rostova", "฿1,400/hr"], ["Michael Chen, M.S.", "฿1,200/hr"]].map(([n, r]) => <div key={n} className="mb-2 flex items-center gap-3 rounded-lg border border-border p-3"><Avatar name={n} size={36} online /><div className="flex-1 text-xs"><b>{n}</b><p className="text-primary">{r}</p></div><button className="btn-primary px-3 py-1 text-xs">Book</button></div>)}</div>
          <div className="card p-5"><b>Related Questions</b>{["How to choose between Tabular method and standard integration by Parts?", "Evaluating ∫ sec³(x) dx: Reduction formula vs integration by parts?", "Taylor Series substitution for cyclic exponential integrals"].map((q) => <p key={q} className="border-b border-border py-2 text-xs last:border-0">{q}</p>)}</div>
          <div className="card border-primary/20 bg-primary-soft/40 p-5 text-xs"><b className="text-sm">TewsDay Academic Guarantee</b><p className="pt-1 text-muted-foreground">Every verified answer is peer-reviewed by our Academic Council. We foster step-by-step conceptual mastery.</p></div>
        </aside>
      </div>
    </main>
  );
}
