"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, Pill } from "@/components/ui";
import { cn } from "@/lib/cn";

function Field({ l, v, ro }: { l: string; v: string; ro?: boolean }) {
  return <div><label className="label text-xs">{l}</label><input defaultValue={v} readOnly={ro} className={cn("input", ro && "bg-surface-1")} /></div>;
}

const tabs = ["Profile & Safety", "Learning Preferences", "Payment & Billing", "Notifications", "Privacy & Security"];
export default function StudentProfile() {
  const [tab, setTab] = useState(0);
  const [photoId, setPhotoId] = useState(true);
  const [district, setDistrict] = useState(true);
  return (
    <main className="pb-24">
      <div className="container-page pt-8">
        <p className="pb-3 text-xs text-muted-foreground">Home › Account Settings › <span className="text-primary">Student Profile & Safety</span></p>
        <div className="flex items-start justify-between"><div><h1 className="text-[32px] font-bold tracking-tight">Student Profile & Safety Settings</h1><p className="text-muted-foreground">Manage student identity, academic affiliation, verified guardians, and emergency security protocols.</p></div><Pill tone="orange" className="normal-case">Active safety protocol level 2</Pill></div>
        <nav className="-mx-6 mt-6 flex gap-6 overflow-x-auto border-b border-border px-6 [&>button]:whitespace-nowrap">{tabs.map((t, i) => <button key={t} onClick={() => setTab(i)} className={cn("border-b-2 pb-3 text-sm", tab === i ? "border-primary font-medium text-primary" : "border-transparent text-muted-foreground")}>{t}</button>)}</nav>
      </div>
      <div className="container-page grid gap-6 py-6 lg:grid-cols-2">
        {tab !== 0 ? <p className="card col-span-2 p-16 text-center text-muted-foreground">“{tabs[tab]}” will be connected to its API in a later sprint.</p> : (<>
          <div className="space-y-6">
            <section className="card space-y-5 p-6"><div className="flex justify-between"><h2 className="font-semibold">Student Identity & Academic Status</h2><Pill>ID Verified</Pill></div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5"><Avatar name="Ploy Chavalit" size={88} /><div className="min-w-0"><p className="flex flex-wrap items-center gap-2 font-semibold">Ploy Chavalit <Pill tone="orange">Minor / student protected</Pill></p><p className="pb-2 text-xs text-muted-foreground">Upload a clear photo facing the camera. JPG, PNG under 5MB.</p><div className="flex gap-2"><button className="btn-outline">Change Photo</button><button className="btn-outline border-transparent text-muted-foreground">Remove</button></div></div></div>
              <div className="grid gap-4 sm:grid-cols-2"><Field l="Legal Full Name (as on passport / ID)" v="Ploy Chavalit" ro /><Field l="Display / Nickname" v="Ploy" /></div>
              <Field l="School / Institution Name" v="Bangkok Patana International School" />
              <div className="grid gap-4 sm:grid-cols-2"><Field l="Curriculum & Grade Level" v="IB Diploma · Grade 12" /><Field l="Date of Birth" v="2007-03-14" ro /></div>
              <Field l="Location / Study Address (Private & Redacted)" v="Sukhumvit Soi 55, Thong Lo, Watthana, Bangkok 10110" />
              <div><label className="label text-xs">Academic Focus & Target Milestones</label><textarea rows={2} className="input" defaultValue="Targeting 42+ IB Points. Focusing on AP Calculus BC and Physics HL preparation for UK university direct admissions." /></div>
            </section>
            <section className="card flex gap-3 border-primary/20 bg-primary-soft/50 p-5"><div><b>Under-18 Safety Guaranteed</b><p className="text-muted-foreground">Tutor sessions for minors require guardian visibility. Guardian contact details are never shown on the public profile (PDPA).</p></div></section>
          </div>
          <div className="space-y-6">
            <section className="card space-y-4 p-6"><h2 className="font-semibold">Parent & Guardian Contact</h2><Pill tone="green">PDPA Protected</Pill>
              <p className="text-muted-foreground">For students under 18 or home-visit sessions, guardian verification ensures peace of mind and direct emergency coordination.</p>
              <p className="eyebrow text-primary-dark">Primary guardian</p><Field l="Guardian Full Name" v="Somchai Chavalit" />
              <div className="grid gap-4 sm:grid-cols-2"><div><label className="label text-xs">Relationship</label><select className="input"><option>Father</option><option>Mother</option></select></div><Field l="Contact Phone" v="+66 81 845 2910" /></div>
              <Field l="Guardian Email" v="somchai.c@example.com" />
              <p className="eyebrow border-t border-border pt-4">Secondary emergency contact</p><Field l="Emergency Contact Name" v="Anong Chavalit" />
              <div className="grid gap-4 sm:grid-cols-2"><div><label className="label text-xs">Relationship</label><select className="input"><option>Mother</option><option>Father</option></select></div><Field l="Emergency Phone" v="+66 89 721 3490" /></div></section>
            <section className="card space-y-4 p-6"><h2 className="font-semibold">Home Visit Privacy Protocol</h2>
              <label className="flex items-start justify-between gap-4"><span><b>Require Tutor Photo ID Verification</b><span className="block text-xs text-muted-foreground">Tutor must present in-app verified biometric badge upon physical arrival.</span></span><input type="checkbox" checked={photoId} onChange={() => setPhotoId(!photoId)} className="mt-1 size-5 accent-primary" /></label>
              <label className="flex items-start gap-3"><input type="checkbox" checked={district} onChange={() => setDistrict(!district)} className="mt-1 size-4 accent-primary" /><span><b>District-Only Pre-Booking Visibility</b><span className="block text-xs text-muted-foreground">Show general district to prospective tutors; hide precise address until trial booking is confirmed.</span></span></label>
              <p className="flex items-center justify-between rounded-lg bg-surface-2 p-3 text-xs"><span><b>TewsDay Student Safety Hotline</b><br />Bangkok 24/7 Rapid Response Unit</span><b className="rounded border border-border bg-white px-2 py-1">+66 2 100 8999</b></p></section>
          </div>
        </>)}
      </div>
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-white/95 backdrop-blur"><div className="container-page flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"><span className="text-xs text-muted-foreground">Last saved Oct 22, 2024 at 14:30 ICT</span><div className="flex flex-wrap gap-2 sm:gap-3"><button className="btn-outline" onClick={() => toast("Changes discarded.")}>Discard Changes</button><button className="btn-primary" onClick={() => toast.success("Profile saved (me_002_e).")}>Save Profile & Security Settings</button></div></div></div>
    </main>
  );
}
