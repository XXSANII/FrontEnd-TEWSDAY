"use client";
import { useState } from "react";
import { toast } from "sonner";
import { IconUpload, IconFileInvoice, IconCircleCheck } from "@tabler/icons-react";
import { invoices } from "@/data/mock";
import { Pill } from "./ui";
import { baht } from "@/lib/cn";

const tone = { unpaid: "red", pendingVerification: "amber", paid: "green", cancelled: "gray" } as const;
const label = { unpaid: "Unpaid", pendingVerification: "Pending verification", paid: "Paid", cancelled: "Cancelled" } as const;

export function InvoiceView() {
  const [list, setList] = useState(invoices);
  const [open, setOpen] = useState(invoices[0].invoiceId);
  const inv = list.find((i) => i.invoiceId === open)!;
  const fee = Math.round(inv.gross * inv.rate);
  function upload(file?: File) {
    if (!file) return;
    setList(list.map((i) => (i.invoiceId === open ? { ...i, status: "pendingVerification" } : i)));
    toast.success("Slip uploaded. An admin will verify it shortly (me_013_e).");
  }
  return (
    <main className="container-page py-8">
      <div className="mb-6"><h1 className="text-2xl font-semibold tracking-tight">Monthly Commission Invoices</h1>
        <p className="text-muted">Tuition is paid directly to tutors. Each month TewsDay issues one consolidated commission invoice (10%, or 8% for 20+ hours). Due on the 11th; suspension after day 14.</p></div>
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <ul className="space-y-3">
          {list.map((i) => (
            <li key={i.invoiceId}><button onClick={() => setOpen(i.invoiceId)} className={`card w-full p-4 text-left ${open === i.invoiceId ? "border-primary ring-2 ring-primary/15" : ""}`}>
              <div className="flex items-center justify-between"><b>{i.invoiceId}</b><Pill tone={tone[i.status as keyof typeof tone]}>{label[i.status as keyof typeof label]}</Pill></div>
              <p className="text-xs text-muted">{i.period}</p><p className="pt-2 text-lg font-semibold text-primary">{baht(Math.round(i.gross * i.rate))}</p></button></li>))}
        </ul>
        <div className="space-y-6">
          <section className="card p-6">
            <div className="mb-4 flex items-start justify-between"><div><p className="eyebrow text-primary-dark">Official billing record</p><h2 className="text-lg font-semibold">{inv.invoiceId}</h2><p className="text-xs text-muted">Billing period {inv.period} · Due {inv.due}</p></div><Pill tone={tone[inv.status as keyof typeof tone]}>{label[inv.status as keyof typeof label]}</Pill></div>
            <div className="divide-y divide-border rounded-lg border border-border text-sm">
              <div className="flex justify-between p-3"><span className="text-muted">Completed sessions</span><b>{inv.sessions}</b></div>
              <div className="flex justify-between p-3"><span className="text-muted">Teaching hours</span><b>{inv.hours} hrs</b></div>
              <div className="flex justify-between p-3"><span className="text-muted">Gross session value</span><b>{baht(inv.gross)}</b></div>
              <div className="flex justify-between p-3"><span className="text-muted">Commission rate (snapshot)</span><b>{(inv.rate * 100).toFixed(2)}%</b></div>
              <div className="flex justify-between bg-surface-1 p-3 text-base"><b>Commission payable</b><b className="text-primary">{baht(fee)}</b></div>
            </div>
          </section>
          <section className="card p-6">
            <p className="eyebrow text-primary-dark">Settlement</p><h2 className="pb-1 text-lg font-semibold">Transfer Slip & Proof of Payment</h2>
            <p className="pb-4 text-muted">Transfer {baht(fee)} to the platform payee account, then upload your bank slip for admin verification.</p>
            {inv.status === "unpaid" ? (
              <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface-1 p-10 text-center hover:border-primary">
                <IconUpload size={28} className="text-primary" /><span>Drag and drop your bank transfer slip here, or <u className="text-primary">browse files</u></span><span className="text-xs text-muted">JPG, PNG, PDF (up to 10MB)</span>
                <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => upload(e.target.files?.[0])} />
              </label>
            ) : (
              <div className="flex items-center gap-3 rounded-lg bg-surface-1 p-4"><IconFileInvoice size={22} className="text-primary" /><span>{inv.status === "paid" ? "Payment verified by admin." : "Slip received — waiting for admin verification."}</span>{inv.status === "paid" && <IconCircleCheck className="text-success" />}</div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
