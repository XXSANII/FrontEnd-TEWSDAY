"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { IconUpload, IconFileInvoice, IconCircleCheck } from "@tabler/icons-react";
import { Pill } from "./ui";
import { baht } from "@/lib/cn";
import { ApiError } from "@/lib/api";
import { attachSlip, dateLabel, getInvoice, periodLabel, searchInvoices, uploadFile, type Invoice, type InvoiceDetail } from "@/lib/invoices";

const tone = { unpaid: "red", pendingVerification: "amber", paid: "green", cancelled: "gray" } as const;
const label = { unpaid: "Unpaid", pendingVerification: "Pending verification", paid: "Paid", cancelled: "Cancelled" } as const;
const MAX_BYTES = 10 * 1024 * 1024;

export function InvoiceView() {
  const [list, setList] = useState<Invoice[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [inv, setInv] = useState<InvoiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  useEffect(() => {
    let stale = false;
    searchInvoices("tutorCommission")
      .then((r) => { if (!stale) { setList(r.data); setOpen(r.data[0]?.invoiceId ?? null); } })
      .catch((e) => { if (!stale) setError(e instanceof Error ? e : new Error("Could not load invoices.")); })
      .finally(() => { if (!stale) setLoading(false); });
    return () => { stale = true; };
  }, []);

  useEffect(() => {
    if (!open) return;
    let stale = false;
    getInvoice(open)
      .then((d) => { if (!stale) setInv(d); })
      .catch((e) => { if (!stale) { setFailed(open); toast.error(e instanceof Error ? e.message : "Could not load this invoice."); } });
    return () => { stale = true; };
  }, [open]);

  async function upload(file?: File) {
    if (!file || !inv || busy) return;
    if (file.size > MAX_BYTES) return toast.error("File is too large (max 10MB).");
    setBusy(true);
    try {
      const fileId = await uploadFile(file, "invoice-slips");
      const r = await attachSlip(inv.invoiceId, fileId);
      setInv({ ...inv, status: r.status, slipFileId: r.slipFileId, paidAt: r.paidAt });
      setList((l) => l.map((i) => (i.invoiceId === inv.invoiceId ? { ...i, status: r.status } : i)));
      toast.success("Slip uploaded. An admin will verify it shortly.");
    } catch (e) { toast.error(e instanceof Error ? e.message : "Could not upload the slip."); }
    finally { setBusy(false); }
  }

  if (loading) return <main className="container-page py-20 text-center text-muted-foreground">Loading invoices…</main>;
  if (error) {
    const auth = error instanceof ApiError && error.status === 401;
    return (
      <main className="container-page py-20 text-center" role="alert">
        <p className="font-semibold">{auth ? "Please sign in to see your invoices." : "Couldn't load invoices."}</p>
        {!auth && <p className="text-muted-foreground">{error.message}</p>}
        {auth && <Link href="/sign-in?mode=tutor" className="btn-primary mt-4 inline-flex">Sign in</Link>}
      </main>
    );
  }

  const detailLoading = !!open && inv?.invoiceId !== open && failed !== open;
  const gross = inv?.items.reduce((s, i) => s + i.sessionGrossAmount, 0) ?? 0;
  return (
    <main className="container-page py-8">
      <div className="mb-6"><h1 className="text-2xl font-semibold tracking-tight">Monthly Commission Invoices</h1>
        <p className="text-muted-foreground">Tuition is paid directly to tutors. Each month TewsDay issues one consolidated commission invoice (10%, or 8% for 20+ hours). Due on the 11th; suspension after day 14.</p></div>
      {!list.length ? <p className="py-16 text-center text-muted-foreground">No commission invoices yet. They appear after your first billing month.</p> : (
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <ul className="space-y-3">
          {list.map((i) => (
            <li key={i.invoiceId}><button onClick={() => setOpen(i.invoiceId)} className={`card w-full p-4 text-left ${open === i.invoiceId ? "border-primary ring-2 ring-primary/15" : ""}`}>
              <div className="flex items-center justify-between"><b>{i.invoiceNumber}</b><Pill tone={tone[i.status]}>{label[i.status]}</Pill></div>
              <p className="text-xs text-muted-foreground">Due {dateLabel(i.dueDate)}</p><p className="pt-2 text-lg font-semibold text-primary">{baht(i.amount)}</p></button></li>))}
        </ul>
        {detailLoading ? <p className="py-16 text-center text-muted-foreground">Loading invoice…</p> : inv?.invoiceId !== open ? <p className="py-16 text-center text-muted-foreground" role="alert">Couldn&apos;t load this invoice.</p> : inv && (
        <div className="space-y-6">
          <section className="card p-6">
            <div className="mb-4 flex items-start justify-between"><div><p className="eyebrow text-primary-dark">Official billing record</p><h2 className="text-lg font-semibold">{inv.invoiceNumber}</h2><p className="text-xs text-muted-foreground">Billing period {periodLabel(inv)} · Due {dateLabel(inv.dueDate)}</p></div><Pill tone={tone[inv.status]}>{label[inv.status]}</Pill></div>
            <div className="divide-y divide-border rounded-lg border border-border text-sm">
              <div className="flex justify-between p-3"><span className="text-muted-foreground">Completed sessions</span><b>{inv.items.length}</b></div>
              <div className="flex justify-between p-3"><span className="text-muted-foreground">Gross session value</span><b>{baht(gross)}</b></div>
              {inv.commissionRateSnapshot != null && <div className="flex justify-between p-3"><span className="text-muted-foreground">Commission rate (snapshot)</span><b>{(inv.commissionRateSnapshot * 100).toFixed(2)}%</b></div>}
              <div className="flex justify-between bg-surface-1 p-3 text-base"><b>Commission payable</b><b className="text-primary">{baht(inv.amount)}</b></div>
            </div>
          </section>
          <section className="card p-6">
            <p className="eyebrow text-primary-dark">Settlement</p><h2 className="pb-1 text-lg font-semibold">Transfer Slip & Proof of Payment</h2>
            <p className="pb-4 text-muted-foreground">Transfer {baht(inv.amount)} to the platform payee account, then upload your bank slip for admin verification.</p>
            {inv.status === "unpaid" ? (
              <label className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface-1 p-10 text-center hover:border-primary ${busy ? "pointer-events-none opacity-60" : ""}`}>
                <IconUpload size={28} className="text-primary" /><span>{busy ? "Uploading…" : <>Drag and drop your bank transfer slip here, or <u className="text-primary">browse files</u></>}</span><span className="text-xs text-muted-foreground">JPG, PNG, PDF (up to 10MB)</span>
                <input type="file" accept="image/*,.pdf" className="hidden" disabled={busy} onChange={(e) => { upload(e.target.files?.[0]); e.target.value = ""; }} />
              </label>
            ) : (
              <div className="flex items-center gap-3 rounded-lg bg-surface-1 p-4"><IconFileInvoice size={22} className="text-primary" /><span>{inv.status === "paid" ? "Payment verified by admin." : inv.status === "cancelled" ? "This invoice was cancelled." : "Slip received — waiting for admin verification."}</span>{inv.status === "paid" && <IconCircleCheck className="text-success" />}</div>
            )}
          </section>
        </div>)}
      </div>)}
    </main>
  );
}
