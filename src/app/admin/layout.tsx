import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";

const items: [string, string][] = [["Verifications", "/admin/verification"]];
const soon = ["Change requests", "Disputes", "Invoices", "Audit"];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="relative border-b border-border bg-white">
        <div className="container-page flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-4 md:gap-8">
            <Logo boxed /><span className="pill bg-surface-3 text-ink-2">Admin</span>
            <nav className="hidden gap-6 text-sm md:flex">
              <Link href="/admin/verification" className="text-primary">Verifications</Link>
              {soon.map((s) => <span key={s} className="text-muted-foreground">{s}</span>)}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xs text-muted-foreground">Exit</Link>
            <MobileMenu items={items} extra={<>{soon.map((s) => <span key={s} className="px-3 py-1 text-sm text-muted-foreground">{s} (soon)</span>)}</>} />
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
