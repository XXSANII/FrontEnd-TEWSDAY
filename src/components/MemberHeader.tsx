import Link from "next/link";
import { IconBell } from "@tabler/icons-react";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { Avatar } from "./ui";

export function MemberHeader({ mode }: { mode: "student" | "tutor" }) {
  const student: [string, string][] = [["Dashboard", "/me"], ["Find Tutors", "/tutors"], ["My Bookings", "/me/bookings/BK-1042"], ["Q&A", "/me/qa"], ["Messages", "/me/chat"]];
  const tutor: [string, string][] = [["Teaching Hub", "/me/tutor"], ["Opportunities", "/jobs"], ["Schedule", "/me/schedule"], ["Messages", "/me/chat"], ["Invoices", "/me/invoices"]];
  const items = mode === "student" ? student : tutor;
  const name = mode === "student" ? "Ploy C." : "Dr. Elena R.";
  const role = mode === "student" ? "Grade 12 · IB Candidate" : "Verified Tutor";
  const other = mode === "student" ? "Tutor" : "Student";
  const otherHref = mode === "student" ? "/me/tutor" : "/me";
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white">
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <div className="flex items-center gap-8">
          <Logo boxed />
          <NavLinks items={items} lg />
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Link href={otherHref} className="hidden rounded-full bg-surface-3 px-3.5 py-1.5 text-xs font-medium text-ink-2 hover:bg-surface-2 lg:inline-block">
            ⇄ Switch to {other} View
          </Link>
          <Link href="/me/chat" className="relative grid size-10 place-items-center rounded-lg text-muted-foreground hover:bg-surface-2 hover:text-primary" aria-label="Notifications">
            <IconBell size={20} />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
          </Link>
          <div className="flex items-center gap-2 border-l border-border pl-3 md:pl-4">
            <Avatar name={name} size={36} />
            <div className="hidden text-xs leading-4 xl:block">
              <div className="font-semibold">{name}</div>
              <div className="text-muted-foreground">{role}</div>
            </div>
          </div>
          <MobileMenu lg items={items} extra={
            <Link href={otherHref} className="btn-soft w-full py-3">⇄ Switch to {other} View</Link>
          } />
        </div>
      </div>
    </header>
  );
}
