import Link from "next/link";
import { Logo } from "@/components/Logo";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-border bg-white"><div className="container-page flex h-16 items-center justify-between"><div className="flex items-center gap-8"><Logo boxed /><span className="pill bg-surface-3 text-ink-2">Admin</span>
        <nav className="flex gap-6 text-sm"><Link href="/admin/verification" className="text-primary">Verifications</Link><span className="text-muted">Change requests</span><span className="text-muted">Disputes</span><span className="text-muted">Invoices</span><span className="text-muted">Audit</span></nav></div><Link href="/" className="text-xs text-muted">Exit</Link></div></header>
      {children}
    </>
  );
}
