"use client";
import type { ComponentType, ReactNode } from "react";
import { IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

type Icon = ComponentType<{ size?: number; className?: string }>;

/** Big tappable card for picking one (or several) options, with an icon and a one-line hint. */
export function ChoiceCard({ icon: Icon, label, hint, active, onClick, className }: {
  icon?: Icon; label: string; hint?: string; active: boolean; onClick: () => void; className?: string;
}) {
  return (
    <button type="button" role="radio" aria-checked={active} onClick={onClick}
      className={cn("group relative flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200 active:scale-[0.98]",
        active ? "border-primary bg-primary-soft shadow-sm" : "border-border bg-white hover:border-primary/40 hover:bg-surface-1", className)}>
      {Icon && (
        <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl transition-colors", active ? "bg-primary text-white" : "bg-surface-2 text-ink-2 group-hover:bg-primary-soft group-hover:text-primary")}>
          <Icon size={22} />
        </span>
      )}
      <span className="min-w-0 flex-1"><b className="block leading-5">{label}</b>{hint && <span className="block text-xs text-muted-foreground">{hint}</span>}</span>
      <span aria-hidden className={cn("grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors", active ? "border-primary bg-primary text-white" : "border-border")}>
        {active && <IconCheck size={12} stroke={3} />}
      </span>
    </button>
  );
}

/** Small pill toggle, for multi-select (days, topics, tags). */
export function Chip({ active, onClick, children, className }: { active: boolean; onClick: () => void; children: ReactNode; className?: string }) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick}
      className={cn("inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-all duration-200 active:scale-95",
        active ? "border-primary bg-primary text-white shadow-sm" : "border-border bg-white text-ink-2 hover:border-primary/50 hover:bg-primary-soft", className)}>
      {active && <IconCheck size={14} stroke={3} />}{children}
    </button>
  );
}

/** Top progress bar for multi-step forms. */
export function StepProgress({ step, total, title }: { step: number; total: number; title: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-primary-dark">Step {step + 1} of {total}</span>
        <span className="text-muted-foreground">{title}</span>
      </div>
      <div className="flex gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={step + 1}>
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors duration-300", i <= step ? "bg-primary" : "bg-surface-3")} />
        ))}
      </div>
    </div>
  );
}

/** Question heading used at the top of each wizard step. */
export function Question({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
      {hint && <p className="mt-1.5 text-muted-foreground">{hint}</p>}
    </div>
  );
}
