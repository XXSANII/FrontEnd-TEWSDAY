import Link from "next/link";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";

const items: [string, string][] = [["Find Tutors", "/tutors"], ["Request Tutor", "/request"], ["Q&A", "/me/qa"]];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white">
      <div className="container-page flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <NavLinks items={items} />
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/sign-in" className="btn-outline">Sign In</Link>
          <Link href="/sign-in?mode=tutor" className="btn-primary">Join as Tutor</Link>
        </div>
        <MobileMenu items={items} extra={<>
          <Link href="/sign-in" className="btn-outline w-full py-3">Sign In</Link>
          <Link href="/sign-in?mode=tutor" className="btn-primary w-full py-3">Join as Tutor</Link>
        </>} />
      </div>
    </header>
  );
}
