import { Suspense } from "react";
import Link from "next/link";
import { IconPrinter, IconCalendar, IconFlag, IconVideo, IconDownload, IconMail, IconCertificate, IconCheck } from "@tabler/icons-react";
import { Avatar, Pill } from "@/components/ui";

export default function BookingRoute({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="container-page py-20 text-center text-muted">Loading booking…</div>}>
      <BookingPage params={params} />
    </Suspense>
  );
}

async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="container-page py-8">
      <p className="pb-3 text-xs text-muted">Home › My Bookings › Booking #{id} (AP Calculus BC)</p>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
        <div><h1 className="max-w-md text-[32px] font-bold leading-10 tracking-tight">Course Booking & Tutoring Agreement</h1><p className="pt-2 text-muted">Confirmed agreement, verified lesson schedule and legal electronic contract.</p></div>
        <div className="flex gap-2"><button className="btn-outline"><IconPrinter size={15} />Print Summary</button><button className="btn-outline"><IconCalendar size={15} />Reschedule Next</button><button className="btn-outline text-destructive"><IconFlag size={15} />Report Issue</button></div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <div className="space-y-6">
          <section className="card p-6">
            <div className="flex items-center justify-between text-sm"><span>Booking ID: <b>#{id}</b> <span className="text-muted">· Booked Oct 22, 2024</span></span><Pill tone="green">● Active Course</Pill></div>
            <Pill tone="orange" className="mt-4 normal-case">Mathematics & Advanced Placement</Pill>
            <h2 className="pt-2 text-2xl font-bold tracking-tight">AP Calculus BC — Full Exam Mastery Package</h2>
            <p className="pb-4 text-muted">Comprehensive prep covering Taylor & Maclaurin series, polar coordinates, differential equations, and FRQ drill strategy.</p>
            <div className="grid gap-3 rounded-xl bg-surface-1 p-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-border bg-white p-3"><Avatar name="Elena Rostova" size={48} /><div className="text-xs"><b className="text-sm">Dr. Elena Rostova</b><p className="text-muted">Ph.D. Applied Math • Chula / MIT</p><p>★ 4.98 (84 reviews)</p></div></div>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-white p-3"><Avatar name="Ploy Chavalit" size={48} /><div className="text-xs"><b className="text-sm">Ploy Chavalit</b><p className="text-muted">Grade 12 • Bangkok Patana School</p><Pill tone="green">Minor Safety Level 2 Protected</Pill></div></div>
            </div>
            <h3 className="pb-3 pt-6 font-semibold">Financial & Payment Details</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[["Hourly Rate", "฿1,200", "per 60 mins"], ["Prepaid Volume", "10 Classes", "15.0 total hrs"], ["Platform Bond", "100%", "Dual Check-in"], ["Total Agreed", "฿18,000", "Direct to tutor"]].map(([k, v, s], i) => <div key={k} className={`rounded-lg border p-3 text-center ${i === 3 ? "border-primary/30 bg-primary-soft/60" : "border-border"}`}><p className="text-xs text-muted">{k}</p><b className={`text-lg ${i === 3 ? "text-primary" : ""}`}>{v}</b><p className="text-[11px] text-muted">{s}</p></div>)}</div>
          </section>
          <section className="card p-6">
            <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">Classroom & Meeting Logistics</h2><span className="rounded bg-surface-3 px-2 py-0.5 text-xs">Format: Hybrid Mode</span></div>
            <div className="rounded-xl border border-primary/20 bg-primary-soft/40 p-4"><Pill tone="orange">Next lesson (Session 2 of 10)</Pill>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2"><div><p className="text-xl font-bold">Thursday, Oct 24 • 16:00 - 17:30 ICT</p><p className="text-xs text-primary">Starts in 2 days (90 minutes session)</p></div><div className="w-48 space-y-2"><button className="btn-primary w-full"><IconVideo size={15} />Join Classroom #409</button><button className="btn-outline w-full text-xs">+ Add to Google Cal</button></div></div></div>
            <h3 className="pb-2 pt-6 font-semibold">Lesson Progression Tracker</h3>
            {[["done", "Session 1 — Comprehensive Diagnostic & Curriculum Mapping", "Oct 17, 2024 • 90 mins • In-person at The Commons", "฿1,800 Paid"], ["next", "Session 2 — Integration Drills & Improper Integrals", "Oct 24, 2024 (Upcoming) • 16:00 - 17:30 ICT", "Ready to Start"], ["later", "Sessions 3 through 10 — Infinite Series, Parametric, Polar & 3 Full Mocks", "Scheduled weekly through Dec 19, 2024", "View Full Schedule"]].map(([k, t, s, r]) => (
              <div key={t} className={`mb-2 flex items-center justify-between gap-3 rounded-lg border p-3 ${k === "next" ? "border-primary/40 bg-primary-soft/40" : "border-border"}`}><div className="flex items-center gap-3"><span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${k === "done" ? "bg-success-soft text-success" : k === "next" ? "bg-primary text-white" : "bg-surface-3"}`}>{k === "done" ? <IconCheck size={14} /> : k === "next" ? 2 : "3+"}</span><div><b className="text-sm">{t}</b><p className="text-xs text-muted">{s}</p></div></div><span className="whitespace-nowrap rounded border border-border bg-white px-2 py-1 text-xs">{r}</span></div>))}
          </section>
          <section className="card flex gap-3 p-5"><IconCertificate className="shrink-0 text-primary" /><div><b>TewsDay 48-Hour Rescheduling Guarantee</b><p className="py-1 text-muted">Need to reschedule? Notice given 48+ hours in advance allows free automated reschedule. After a session ends, you have 48 hours to confirm completion; otherwise it is auto-completed.</p><Link href="/me/invoices" className="text-xs font-medium text-primary">Review billing terms</Link></div></section>
        </div>
        <section className="card h-fit p-6">
          <div className="flex items-center justify-between"><Pill tone="green">✓ Signed by both parties</Pill><span className="rounded bg-surface-3 px-2 py-0.5 font-mono text-[11px]">DOC #CON-{id}-BC</span></div>
          <h2 className="pt-3 text-2xl font-bold tracking-tight">Legally Binding Tutoring Contract</h2>
          <p className="pb-4 text-xs text-muted">Signed electronically via TewsDay Verified Digital Signatures (PDPA & Thailand Electronic Transactions Act B.E. 2544 compliant).</p>
          {[["Somchai Chavalit (Guardian for Ploy C.)", "Oct 22, 2024 • 15:42 ICT"], ["Dr. Elena Rostova, Ph.D. (Tutor)", "Oct 22, 2024 • 16:05 ICT"]].map(([n, d]) => <p key={n} className="flex justify-between border-b border-border py-2 text-xs"><span className="flex items-center gap-2"><IconCheck size={14} className="text-success" />{n}</span><span className="text-muted">{d}</span></p>)}
          <div className="my-4 grid h-72 place-items-center rounded-lg bg-zinc-700 p-4"><div className="h-full w-4/5 overflow-hidden rounded bg-white p-4 text-[9px] leading-3 text-muted"><b className="block text-center text-[10px] text-ink">STANDARD TUTORING SERVICES AGREEMENT</b><p className="pt-2"><b>SECTION 1: SCOPE OF SERVICES</b> The Educator undertakes to deliver 15.0 instructional hours in AP Calculus BC to student Ploy Chavalit.</p><p className="pt-2"><b>SECTION 2: HOURLY RATE & PAYMENT</b> Compensation is established at ฿1,200 per sixty (60) minutes, paid directly to the Educator per session.</p><p className="pt-2"><b>SECTION 3: MINOR SAFETY & CODE OF CONDUCT</b> Sessions follow the platform conduct policy.</p></div></div>
          <button className="btn-primary w-full py-3"><IconDownload size={16} />Download Signed PDF (Official Copy)</button>
          <div className="grid grid-cols-2 gap-2 pt-2"><button className="btn-outline"><IconMail size={15} />Email to Guardian</button><button className="btn-outline">View Certificate</button></div>
          <p className="mt-4 rounded-lg border border-primary/20 bg-primary-soft/40 p-3 text-xs text-muted">This contract is legally enforceable under Thai civil law. SHA-256 document hash is stored for audit.</p>
        </section>
      </div>
    </main>
  );
}
