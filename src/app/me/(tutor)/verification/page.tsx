"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconUpload, IconCheck, IconTrash, IconShieldLock } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

export default function Verification() {
  const router = useRouter();
  const [idType, setIdType] = useState("Passport");
  const [files, setFiles] = useState(["Elena_Rostova_PhD_Diploma.pdf"]);
  const inputCls = "input";
  return (
    <main className="pb-24">
      <div className="mx-auto max-w-[680px] space-y-6 px-6 py-8">
        <ol className="grid grid-cols-3 rounded-xl border border-border bg-white p-4 text-xs">{[["Step 1", "Basic Info", "done"], ["Step 2", "Credentials", "now"], ["Step 3", "Review & Submit", "todo"]].map(([a, b, s]) => <li key={a} className="flex items-center gap-2"><span className={cn("grid size-7 place-items-center rounded-full border-2 text-xs font-bold", s === "done" ? "border-success bg-success-soft text-success" : s === "now" ? "border-primary text-primary" : "border-border text-muted")}>{s === "done" ? <IconCheck size={14} /> : a.slice(-1)}</span><span><span className="block text-[10px] uppercase text-muted">{a}</span><b className={s === "todo" ? "text-muted" : ""}>{b}</b></span></li>)}</ol>
        <div><span className="pill bg-primary-soft text-primary">Vetting Protocol v3.2</span><h1 className="pt-3 text-[32px] font-bold tracking-tight">Verify Your Teaching Credentials</h1><p className="text-muted">To ensure student trust and unlock premium verified badges, submit proof of academic qualifications and government ID. All records are securely encrypted and reviewed within 24 hours.</p></div>
        <section className="card space-y-4 p-6"><div className="flex justify-between"><div><h2 className="font-semibold">Higher Education & Degrees</h2><p className="text-xs text-muted">List your primary degrees and granting institutions.</p></div><span className="pill bg-primary-soft text-primary">Primary degree</span></div>
          <div className="grid gap-4 sm:grid-cols-2"><div><label className="label">Degree Level *</label><select className={inputCls}><option>Ph.D. / Doctoral Degree</option><option>Master&apos;s</option><option>Bachelor&apos;s</option></select></div><div><label className="label">Degree Title / Major *</label><input className={inputCls} defaultValue="Ph.D. in Applied Mathematics" /></div></div>
          <div className="grid gap-4 sm:grid-cols-[1fr_1fr_120px]"><div><label className="label">Institution *</label><input className={inputCls} defaultValue="Imperial College London" /></div><div><label className="label">Country *</label><select className={inputCls}><option>United Kingdom</option><option>Thailand</option></select></div><div><label className="label">Year *</label><input className={inputCls} defaultValue="2018" /></div></div>
          <label className="flex items-start gap-3 rounded-lg border border-border bg-surface-1 p-3"><input type="checkbox" defaultChecked className="mt-1 accent-primary" /><span><b>Graduated with High Distinction / First Class Honours</b><span className="block text-xs text-muted">Shown as an achievement crest on your public profile once verified.</span></span></label>
          <label className="flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 border-dashed border-border p-8 text-center"><IconUpload className="text-primary" /><span>Drag & drop your official diploma or transcript here, or <u className="text-primary">Browse files</u></span><span className="text-xs text-muted">PDF, PNG, JPG (Max 15MB)</span><input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && setFiles([...files, e.target.files[0].name])} /></label>
          {files.map((f) => <div key={f} className="flex items-center justify-between rounded-lg border border-border p-3 text-xs"><span><b className="text-sm">{f}</b> <span className="pill bg-success-soft text-success">100% Uploaded</span><br /><span className="text-muted">Encrypted SHA-256</span></span><button aria-label="Delete" onClick={() => setFiles(files.filter((x) => x !== f))}><IconTrash size={16} className="text-muted" /></button></div>)}
        </section>
        <section className="card space-y-4 p-6"><div className="flex justify-between"><div><h2 className="font-semibold">Identity Verification</h2><p className="text-xs text-muted">Verify legal identity to guarantee a safe educational environment.</p></div><span className="pill bg-surface-3 text-muted">Confidential</span></div>
          <div className="grid grid-cols-3 gap-2">{["Thai National ID", "Passport", "Govt. Work Permit"].map((t) => <button key={t} onClick={() => setIdType(t)} className={cn("rounded-lg border p-3 text-sm", idType === t ? "border-primary bg-primary-soft font-medium" : "border-border")}>{t}</button>)}</div>
          <div><label className="label">{idType} / Document Number *</label><input className={inputCls} defaultValue="GBR 928371049" /><p className="pt-1 text-right text-xs text-muted">Will never be published</p></div>
          <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-lg border border-border bg-surface-1 p-3 text-xs"><b>Photo Page / Front of ID</b><p className="py-6 text-center">✓ passport_photo_page.jpg</p><span className="text-primary">Replace Photo</span></div><label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-3 text-center text-xs"><IconUpload size={18} className="mb-1" />Click to upload document (optional)<input type="file" className="hidden" /></label></div>
          <p className="flex gap-3 rounded-lg border border-primary/20 bg-primary-soft/50 p-4 text-xs"><IconShieldLock className="shrink-0 text-primary" size={20} /><span><b className="text-sm">Privacy & Security Notice</b><br />Your identification is used strictly for safety vetting under Thailand&apos;s PDPA. It is stored privately, accessed through signed URLs, and never displayed on your public profile.</span></p></section>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-white"><div className="mx-auto flex max-w-[680px] items-center justify-between px-6 py-3"><span className="text-xs text-muted">● Auto-saved 2 minutes ago</span><div className="flex gap-3"><button className="btn-outline" onClick={() => router.push("/me/tutor")}>Back</button><button className="btn-primary" onClick={() => { toast.success("Verification submitted — status: pending (me_003_e)."); router.push("/me/tutor"); }}>Submit Verification</button></div></div></div>
    </main>
  );
}
