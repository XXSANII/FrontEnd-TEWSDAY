"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconBook2, IconMail, IconLock, IconEye, IconEyeOff, IconArrowRight, IconSchool } from "@tabler/icons-react";
import { toast } from "sonner";
import { cn } from "@/lib/cn";

export function SignInForm() {
  const [tab, setTab] = useState<"in" | "up">("in");
  const [show, setShow] = useState(false);
  const [role, setRole] = useState<"student" | "tutor">("student");
  const router = useRouter();

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email"));
    if (!email.includes("@")) return toast.error("Please enter a valid email address.");
    // Mock auth: the real flow posts to auth_001 / auth_002 and stores the backend JWT.
    document.cookie = `tw_role=${email.startsWith("admin") ? "admin" : role}; path=/`;
    toast.success(tab === "in" ? "Signed in successfully." : "Account created successfully.");
    router.push(email.startsWith("admin") ? "/admin" : role === "tutor" ? "/me/tutor" : "/me");
  }

  return (
    <div className="card w-full max-w-[460px] p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <span className="grid size-12 place-items-center rounded-full bg-primary-soft text-primary"><IconBook2 size={22} /></span>
        <h1 className="pt-3 text-2xl font-semibold">{tab === "in" ? "Welcome back" : "Create your account"}</h1>
        <p className="pb-5 text-muted">Thailand&apos;s premier tutor matching community</p>
      </div>
      <div className="mb-5 grid grid-cols-2 rounded-lg bg-surface-3 p-1">
        {(["in", "up"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("rounded-md py-2 text-sm font-medium", tab === t ? "bg-white text-primary shadow-sm" : "text-muted")}>
            {t === "in" ? "Sign In" : "Sign Up"}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="space-y-4">
        {tab === "up" && (
          <div className="grid grid-cols-2 gap-2">
            {(["student", "tutor"] as const).map((r) => (
              <button type="button" key={r} onClick={() => setRole(r)} className={cn("rounded-lg border px-3 py-2 text-sm font-medium capitalize", role === r ? "border-primary bg-primary-soft text-primary" : "border-border")}>I&apos;m a {r}</button>
            ))}
          </div>
        )}
        <div><label className="label">Email address</label>
          <div className="relative"><IconMail size={16} className="absolute left-3 top-3.5 text-muted" />
            <input name="email" type="email" required placeholder="name@example.com" className="input pl-9" /></div></div>
        <div><div className="flex justify-between"><label className="label">Password</label><Link href="#" className="text-xs font-medium text-primary">Forgot password?</Link></div>
          <div className="relative"><IconLock size={16} className="absolute left-3 top-3.5 text-muted" />
            <input type={show ? "text" : "password"} required minLength={6} placeholder="••••••••" className="input px-9" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3 text-muted" aria-label="Toggle password">{show ? <IconEyeOff size={16} /> : <IconEye size={16} />}</button></div></div>
        <label className="flex items-center gap-2 text-muted"><input type="checkbox" className="size-4 accent-primary" />Remember me for 30 days</label>
        <button className="btn-primary w-full py-3">{tab === "in" ? "Sign In to TewsDay" : "Create account"}<IconArrowRight size={16} /></button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-border" />Or continue with<span className="h-px flex-1 bg-border" /></div>
      <div className="grid grid-cols-3 gap-3">
        {["Google", "Apple", "LINE"].map((p) => <button key={p} onClick={() => toast.info(`${p} sign-in needs the backend (auth_003).`)} className="btn-outline">{p}</button>)}
      </div>
      <div className="mt-5 flex items-center justify-between rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-xs">
        <span className="flex items-center gap-2 font-medium"><IconSchool size={16} className="text-primary" />Looking to teach in Bangkok?</span>
        <button onClick={() => { setTab("up"); setRole("tutor"); }} className="font-semibold text-primary">Apply as Tutor ›</button>
      </div>
      <p className="pt-4 text-center text-xs text-muted">By continuing, you agree to TewsDay&apos;s <Link href="#" className="text-primary">Terms of Service</Link> and <Link href="#" className="text-primary">Privacy Policy</Link>.</p>
    </div>
  );
}
