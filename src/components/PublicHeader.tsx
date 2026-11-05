import Link from "next/link";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white">
      <div className="container-page flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <NavLinks items={[["Find Tutors", "/tutors"], ["Request Tutor", "/request"], ["Q&A", "/jobs"]]} />
        </div>
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="btn-outline">Sign In</Link>
          <Link href="/sign-in?mode=tutor" className="btn-primary">Join as Tutor</Link>
        </div>
      </div>
    </header>
  );
}
