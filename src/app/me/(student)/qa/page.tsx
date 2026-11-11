"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { IconMessageQuestion, IconSend, IconArrowUp, IconMessageCircle, IconCircleCheck, IconSearch, IconRosetteDiscountCheck, IconBulb } from "@tabler/icons-react";
import { Avatar, Pill } from "@/components/ui";
import { Chip } from "@/components/form";

const subjects = ["Mathematics", "Physics", "English", "Chemistry", "Coding", "Other"];

type Q = { id: string; title: string; subject: string; author: string; ago: string; answers: number; votes: number; solved: boolean; mine?: boolean };
const questions: Q[] = [
  { id: "1", title: "How to evaluate ∫ e^(3x) sin(2x) dx using integration by parts without sign errors?", subject: "Mathematics", author: "Ploy C.", ago: "4 hours ago", answers: 2, votes: 18, solved: true, mine: true },
  { id: "2", title: "Difference between reduction formula and integration by parts for ∫ sec³(x) dx?", subject: "Mathematics", author: "Mind W.", ago: "1 day ago", answers: 1, votes: 7, solved: true },
  { id: "3", title: "Why does the magnetic flux change sign in Faraday's law problems?", subject: "Physics", author: "Kevin T.", ago: "1 day ago", answers: 0, votes: 3, solved: false },
  { id: "4", title: "How should I structure a Band 8 IELTS Task 2 essay in 40 minutes?", subject: "English", author: "Nine T.", ago: "2 days ago", answers: 3, votes: 24, solved: true },
  { id: "5", title: "Balancing redox equations in acidic solution: which step do I do first?", subject: "Chemistry", author: "Kanya P.", ago: "3 days ago", answers: 0, votes: 2, solved: false, mine: true },
];

const filters = ["All", "My questions", "Unanswered", "Solved"] as const;

export default function QAHome() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [subject, setSubject] = useState("All");
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState("");
  const [draftSubject, setDraftSubject] = useState("");

  const list = useMemo(() => questions.filter((x) =>
    (filter === "All" || (filter === "My questions" && x.mine) || (filter === "Unanswered" && x.answers === 0) || (filter === "Solved" && x.solved)) &&
    (subject === "All" || x.subject === subject) && (!q || x.title.toLowerCase().includes(q.toLowerCase()))), [filter, subject, q]);

  function ask(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Question posted. Verified tutors will answer soon.");
    setDraft(""); setDraftSubject("");
  }

  return (
    <main>
      <section className="border-b border-border bg-gradient-to-b from-primary-soft to-white">
        <div className="container-page py-8 sm:py-12">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-primary text-white"><IconMessageQuestion size={26} /></span>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Q&amp;A</h1>
              <p className="text-muted-foreground">Ask a question. Get step-by-step answers from verified tutors, for free.</p>
            </div>
          </div>

          <form onSubmit={ask} className="card mt-6 p-4 sm:p-5">
            <label htmlFor="ask" className="label">What are you stuck on?</label>
            <textarea id="ask" value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} required minLength={10} className="input" placeholder="Describe the problem. Include what you already tried." />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Subject">
                {subjects.map((s) => <Chip key={s} active={draftSubject === s} onClick={() => setDraftSubject(draftSubject === s ? "" : s)}>{s}</Chip>)}
              </div>
              <button className="btn-primary min-h-11 px-6" disabled={draft.trim().length < 10}><IconSend size={16} />Post question</button>
            </div>
          </form>
        </div>
      </section>

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[1fr_300px]">
        <section aria-labelledby="qlist">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h2 id="qlist" className="mr-auto text-xl font-bold">Recent questions</h2>
            <label className="relative w-full sm:w-64"><span className="sr-only">Search questions</span>
              <IconSearch size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions" className="input pl-10" /></label>
          </div>
          <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter">
            {filters.map((f) => <Chip key={f} active={filter === f} onClick={() => setFilter(f)} className="shrink-0">{f}</Chip>)}
            <span className="mx-1 hidden w-px bg-border sm:block" />
            {["All", ...subjects.slice(0, 5)].map((s) => <Chip key={s} active={subject === s} onClick={() => setSubject(s)} className="shrink-0">{s === "All" ? "All subjects" : s}</Chip>)}
          </div>

          {list.length ? (
            <ul className="space-y-3">
              {list.map((x) => (
                <li key={x.id}>
                  <Link href="/me/qa/1" /* mock: every question opens the one sample thread */ className="card block p-4 hover:border-primary/40 sm:p-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <Pill tone="orange">{x.subject}</Pill>
                      {x.solved ? <span className="inline-flex items-center gap-1 font-semibold text-success"><IconCircleCheck size={14} />Solved</span> : x.answers === 0 ? <span className="font-semibold text-warning">Needs an answer</span> : null}
                      {x.mine && <Pill>Your question</Pill>}
                    </div>
                    <h3 className="mt-2 text-base font-bold leading-6 sm:text-lg">{x.title}</h3>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2"><Avatar name={x.author} size={24} />{x.author} · {x.ago}</span>
                      <span className="flex items-center gap-4"><span className="flex items-center gap-1"><IconArrowUp size={15} />{x.votes}</span><span className="flex items-center gap-1"><IconMessageCircle size={15} />{x.answers} {x.answers === 1 ? "answer" : "answers"}</span></span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="card py-14 text-center"><p className="font-bold">No questions found</p><p className="text-muted-foreground">Try another filter, or ask the first one above.</p></div>
          )}
        </section>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div className="card p-5">
            <h2 className="font-bold">How Q&amp;A works</h2>
            <ol className="mt-3 space-y-3 text-sm">
              {[["Ask", "Post your question with what you tried."], ["Get answers", "Verified tutors reply with clear steps."], ["Learn more", "Book a tutor if you want 1-on-1 help."]].map(([h, p], i) => (
                <li key={h} className="flex gap-3"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-white">{i + 1}</span><span><b>{h}</b><span className="block text-muted-foreground">{p}</span></span></li>
              ))}
            </ol>
          </div>
          <div className="flex gap-3 rounded-2xl border border-primary/20 bg-primary-soft p-4 text-sm">
            <IconRosetteDiscountCheck size={22} className="shrink-0 text-primary" /><p><b>Answers are from verified tutors.</b> <span className="text-muted-foreground">Every tutor is identity and degree checked.</span></p>
          </div>
          <div className="flex gap-3 rounded-2xl border border-border bg-white p-4 text-sm">
            <IconBulb size={22} className="shrink-0 text-amber-500" /><p><b>Tip:</b> <span className="text-muted-foreground">Add a photo of your working so tutors can see where you got stuck.</span></p>
          </div>
        </aside>
      </div>
    </main>
  );
}
