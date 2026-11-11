"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconMail, IconLock, IconEye, IconEyeOff, IconArrowRight, IconSchool, IconUser, IconBackpack, IconCheck, IconRosetteDiscountCheck, IconVideo, IconTrendingUp } from "@tabler/icons-react";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import { ChoiceCard } from "./form";
import { login, register, getProfile, homeFor } from "@/lib/auth";

const perks = [
  { icon: IconRosetteDiscountCheck, text: "Every tutor is verified and background-checked" },
  { icon: IconVideo, text: "Try a 30-minute trial lesson before you commit" },
  { icon: IconTrendingUp, text: "Track progress and notes after every lesson" },
];

function strength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export function SignInForm() {
  const [tab, setTab] = useState<"in" | "up">("in");
  const [show, setShow] = useState(false);
  const [role, setRole] = useState<"student" | "tutor">("student");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  // Header links use /sign-in?mode=tutor. Read it once on the client so the page itself stays static.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("mode") === "tutor") { setTab("up"); setRole("tutor"); }
  }, []);
  const sc = strength(pw);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")).trim();
    setBusy(true);
    try {
      if (tab === "in") {
        await login(email, pw);
      } else {
        await register({ email, password: pw, displayName: String(f.get("name")).trim(), currentMode: role });
      }
      const profile = await getProfile();
      toast.success(tab === "in" ? "Signed in successfully." : "Account created successfully.");
      router.push(homeFor(profile));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid w-full max-w-[960px] overflow-hidden rounded-3xl border border-border bg-white shadow-[var(--shadow-lift)] lg:grid-cols-[1fr_1.1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <div className="bg-notebook pointer-events-none absolute inset-0 opacity-20 invert" />
        <div className="relative">
          <span className="grid size-12 place-items-center rounded-2xl bg-white/15"><IconSchool size={26} /></span>
          <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight">Learn faster with a tutor who gets you.</h2>
          <ul className="mt-8 space-y-4">
            {perks.map(({ icon: Icon, text }) => <li key={text} className="flex items-start gap-3"><span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-white/15"><Icon size={18} /></span><span className="opacity-95">{text}</span></li>)}
          </ul>
        </div>
        <p className="relative mt-10 text-sm opacity-80">Join 10,000+ students learning on TewsDay.</p>
      </aside>

      <div className="p-6 sm:p-10">
        <div className="mb-6 grid grid-cols-2 rounded-xl bg-surface-3 p-1" role="tablist">
          {(["in", "up"] as const).map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={cn("min-h-10 cursor-pointer rounded-lg text-sm font-semibold transition-all", tab === t ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-ink")}>
              {t === "in" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{tab === "in" ? "Welcome back" : "Let's get you started"}</h1>
        <p className="mb-6 mt-1 text-muted-foreground">{tab === "in" ? "Sign in to continue learning." : "It takes less than a minute."}</p>

        <form onSubmit={submit} className="space-y-5" key={tab}>
          {tab === "up" && (
            <div className="animate-step space-y-5">
              <div role="radiogroup" aria-label="I am a" className="grid gap-3 sm:grid-cols-2">
                <ChoiceCard icon={IconBackpack} label="I want to learn" hint="Student or parent" active={role === "student"} onClick={() => setRole("student")} />
                <ChoiceCard icon={IconSchool} label="I want to teach" hint="Tutor" active={role === "tutor"} onClick={() => setRole("tutor")} />
              </div>
              <div className="relative"><IconUser size={18} className="absolute left-3.5 top-3.5 text-muted-foreground" /><input name="name" required aria-label="Full name" placeholder="Your name" autoComplete="name" className="input pl-10" /></div>
            </div>
          )}
          <div className="relative"><IconMail size={18} className="absolute left-3.5 top-3.5 text-muted-foreground" /><input name="email" type="email" required aria-label="Email address" placeholder="Email address" autoComplete="email" className="input pl-10" /></div>
          <div>
            <div className="relative">
              <IconLock size={18} className="absolute left-3.5 top-3.5 text-muted-foreground" />
              <input type={show ? "text" : "password"} required minLength={tab === "up" ? 8 : 1} value={pw} onChange={(e) => setPw(e.target.value)} aria-label="Password" placeholder="Password" autoComplete={tab === "in" ? "current-password" : "new-password"} className="input px-10" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-1.5 top-1 grid size-9 cursor-pointer place-items-center rounded-lg text-muted-foreground hover:bg-surface-2" aria-label={show ? "Hide password" : "Show password"}>{show ? <IconEyeOff size={18} /> : <IconEye size={18} />}</button>
            </div>
            {tab === "up" && pw && (
              <div className="mt-2 flex items-center gap-2" aria-live="polite">
                <div className="flex flex-1 gap-1">{[1, 2, 3].map((i) => <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors", sc >= i ? (sc === 3 ? "bg-success" : "bg-warning") : "bg-surface-3")} />)}</div>
                <span className="text-xs text-muted-foreground">{["Too short", "Weak", "Good", "Strong"][sc]}</span>
              </div>
            )}
            {tab === "in" && <div className="mt-2 text-right"><Link href="#" className="inline-flex min-h-8 items-center text-xs font-semibold text-primary hover:underline">Forgot password?</Link></div>}
          </div>
          <button disabled={busy} className="btn-primary min-h-12 w-full text-base disabled:opacity-60">{busy ? "Please wait…" : tab === "in" ? "Sign in" : role === "tutor" ? "Apply as tutor" : "Create account"}<IconArrowRight size={18} /></button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
        <div className="grid grid-cols-3 gap-3">
          {["Google", "Apple", "LINE"].map((p) => <button key={p} onClick={() => toast.info(`${p} sign-in needs the backend (auth_003).`)} className="btn-outline">{p}</button>)}
        </div>
        <p className="flex items-center justify-center gap-1.5 pt-6 text-center text-xs text-muted-foreground"><IconCheck size={14} className="text-success" />By continuing, you agree to our <Link href="#" className="font-semibold text-primary hover:underline">Terms</Link> and <Link href="#" className="font-semibold text-primary hover:underline">Privacy Policy</Link>.</p>
      </div>
    </div>
  );
}
