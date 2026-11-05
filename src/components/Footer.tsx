import Link from "next/link";
const links = [
  ["Find Tutors", "/tutors"], ["Request Tutor", "/request"], ["Q&A", "/me/qa/1"],
  ["Privacy Policy", "#"], ["Terms of Service", "#"],
];
export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container-page flex flex-wrap items-center justify-between gap-4 py-6">
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold tracking-tight text-primary">TewsDay</span>
          <span className="text-xs text-muted">© 2025 TewsDay Inc. All rights reserved.</span>
        </div>
        <nav className="flex flex-wrap gap-6 text-muted">
          {links.map(([l, h]) => (
            <Link key={l} href={h} className="hover:text-primary">{l}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
