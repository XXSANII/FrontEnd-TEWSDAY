"use client";
import { useState } from "react";
import { IconSearch, IconPaperclip, IconPhoto, IconMoodSmile, IconSend, IconVideo, IconShieldCheckFilled, IconArrowLeft } from "@tabler/icons-react";
import { conversations, messages as seed } from "@/data/mock";
import { Avatar } from "./ui";
import { cn } from "@/lib/cn";

export function ChatView() {
  const [active, setActive] = useState("c1");
  const [msgs, setMsgs] = useState(seed);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("All");
  // Below lg the list and the thread are separate screens; on desktop both are always visible.
  const [view, setView] = useState<"list" | "thread">("list");
  const conv = conversations.find((c) => c.id === active)!;
  const send = () => { if (!text.trim()) return; setMsgs([...msgs, { from: "me", text, time: "now" }]); setText(""); };
  return (
    <div className="container-page py-6">
      <div className="grid h-[calc(100dvh-9rem)] min-h-[480px] overflow-hidden rounded-2xl border border-border bg-white lg:h-[720px] lg:grid-cols-[380px_1fr]">
        <aside className={cn("min-h-0 flex-col border-r border-border lg:flex", view === "list" ? "flex" : "hidden")}>
          <div className="space-y-3 p-5">
            <div className="flex items-center gap-2"><h1 className="text-xl font-semibold">Messages</h1><span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary">2 Unread</span></div>
            <label className="flex items-center gap-2 rounded-lg border border-border bg-surface-1 px-3 py-2"><IconSearch size={16} className="text-muted-foreground" /><input placeholder="Search conversations, tutors..." className="w-full bg-transparent text-sm outline-none" /></label>
            <div className="flex gap-2 text-xs">{["All", "Tutors", "Unread"].map((f) => <button key={f} onClick={() => setFilter(f)} className={cn("rounded-full px-3 py-1", filter === f ? "bg-ink text-white" : "bg-surface-3 text-muted-foreground")}>{f}</button>)}</div>
          </div>
          <ul className="flex-1 overflow-auto">
            {conversations.filter((c) => filter !== "Unread" || c.unread).map((c) => (
              <li key={c.id}><button onClick={() => { setActive(c.id); setView("thread"); }} className={cn("flex w-full gap-3 border-b border-border px-5 py-4 text-left", active === c.id && "border-l-4 border-l-primary bg-primary-soft/50")}>
                <Avatar name={c.name} size={44} online={c.online} />
                <span className="min-w-0 flex-1"><span className="flex justify-between"><b className="truncate">{c.name}</b><span className={cn("text-xs", active === c.id ? "font-semibold text-primary" : "text-muted-foreground")}>{c.time}</span></span>
                  <span className="flex justify-between gap-2"><span className="truncate text-muted-foreground">{c.last}</span>{c.unread > 0 && <span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] font-semibold text-white">{c.unread}</span>}</span></span>
              </button></li>))}
          </ul>
        </aside>
        <section className={cn("min-h-0 min-w-0 flex-col lg:flex", view === "thread" ? "flex" : "hidden")}>
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
            <div className="flex items-center gap-3"><button onClick={() => setView("list")} aria-label="Back to conversations" className="grid size-9 place-items-center rounded-lg hover:bg-surface-2 lg:hidden"><IconArrowLeft size={20} /></button><Avatar name={conv.name} size={44} online={conv.online} /><div><b className="flex items-center gap-1 text-base">{conv.name}<IconShieldCheckFilled size={15} className="text-success" /></b><p className="text-xs text-muted-foreground"><span className="text-success">● {conv.online ? "Online" : "Offline"}</span> · Responds within 15 mins</p></div></div>
            <button className="btn-primary"><IconVideo size={16} />Join Classroom #409</button>
          </header>
          <div className="flex-1 space-y-4 overflow-auto p-4 sm:p-6">
            <p className="mx-auto max-w-xl rounded-lg border border-primary/20 bg-primary-soft/50 p-3 text-xs"><b className="text-primary-dark">Safe Learning Protection:</b> Always keep lesson fees and communication on TewsDay. Never share private banking credentials outside the platform.</p>
            <p className="text-center"><span className="rounded-full bg-surface-3 px-3 py-1 text-xs text-muted-foreground">Today</span></p>
            {msgs.map((m, i) => (
              <div key={i} className={cn("flex items-end gap-2", m.from === "me" && "justify-end")}>
                {m.from !== "me" && <Avatar name={conv.name} size={32} />}
                <div className={cn("max-w-[85%] rounded-2xl sm:max-w-[70%] px-4 py-3", m.from === "me" ? "bg-primary text-white" : "bg-surface-3")}><p>{m.text}</p><p className={cn("pt-1 text-[11px]", m.from === "me" ? "text-white/70" : "text-muted-foreground")}>{m.time}</p></div>
              </div>))}
          </div>
          <footer className="border-t border-border p-4">
            <div className="flex items-center gap-3 rounded-xl border border-border px-3 py-2"><IconPaperclip size={18} className="text-muted-foreground" /><IconPhoto size={18} className="text-muted-foreground" /><IconMoodSmile size={18} className="hidden text-muted-foreground sm:block" />
              <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder={`Type a message to ${conv.name.split(" ")[0]}...`} className="flex-1 text-sm outline-none" />
              <button onClick={send} className="btn-primary"><IconSend size={15} />Send</button></div>
            <p className="pt-2 text-[11px] text-muted-foreground">Press Enter to send · Supports PDF, PNG, JPG up to 25MB</p>
          </footer>
        </section>
      </div>
    </div>
  );
}
