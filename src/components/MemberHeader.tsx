import Link from "next/link";
import { IconBell } from "@tabler/icons-react";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { Avatar } from "./ui";

export function MemberHeader({ mode }: { mode: "student" | "tutor" }) {
  const student: [string, string][] = [["Dashboard", "/me"], ["Find Tutors", "/tutors"], ["My Bookings", "/me/bookings/BK-1042"], ["Q&A", "/me/qa/1"], ["Messages", "/me/chat"]];
  const tutor: [string, string][] = [["Teaching Hub", "/me/tutor"], ["Opportunities", "/jobs"], ["Schedule", "/me/schedule"], ["Messages", "/me/chat"], ["Invoices", "/me/invoices"]];
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white">
      <div className="container-page flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo boxed />
          <NavLinks items={mode === "student" ? student : tutor} />
        </div>
        <div className="flex items-center gap-4">
          <Link href={mode === "student" ? "/me/tutor" : "/me"} className="rounded-full bg-surface-3 px-3.5 py-1.5 text-xs font-medium text-ink-2 hover:bg-surface-2">
            ⇄ Switch to {mode === "student" ? "Tutor" : "Student"} View
          </Link>
          <Link href="/me/chat" className="relative text-muted hover:text-primary" aria-label="Notifications">
            <IconBell size={20} />
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary" />
          </Link>
          <div className="flex items-center gap-2 border-l border-border pl-4">
            <Avatar name={mode === "student" ? "Ploy C." : "Elena R."} size={36} />
            <div className="text-xs leading-4">
              <div className="font-semibold">{mode === "student" ? "Ploy C." : "Dr. Elena R."}</div>
              <div className="text-muted">{mode === "student" ? "Grade 12 · IB Candidate" : "Verified Tutor"}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
