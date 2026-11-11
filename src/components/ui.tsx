import { IconStarFilled } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

const hues = ["#b45309", "#7c3aed", "#0f766e", "#0369a1", "#be185d", "#4d7c0f"];
export function Avatar({ name, size = 48, online }: { name: string; size?: number; online?: boolean }) {
  const initials = name.replace(/^(Dr\.|Mr\.|Ms\.)\s*/i, "").split(" ").map((w) => w[0]).slice(0, 2).join("");
  const hue = hues[(name.charCodeAt(0) + name.length) % hues.length];
  return (
    <span className="relative inline-grid shrink-0 place-items-center rounded-full font-semibold text-white"
      style={{ width: size, height: size, background: hue, fontSize: size * 0.36 }}>
      {initials}
      {online !== undefined && (
        <span className={cn("absolute bottom-0 right-0 size-3 rounded-full border-2 border-white", online ? "bg-success" : "bg-faint")} />
      )}
    </span>
  );
}

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <IconStarFilled key={i} size={size} className={i <= Math.round(value) ? "text-amber-400" : "text-border"} />
      ))}
    </span>
  );
}

const tones = {
  green: "bg-success-soft text-success",
  orange: "bg-amber-50 text-amber-700 border border-amber-200",
  gray: "bg-border/50 text-muted-foreground",
  red: "bg-destructive-soft text-destructive",
  amber: "bg-amber-50 text-amber-700",
  blue: "bg-blue-50 text-blue-700",
};
export function Pill({ tone = "gray", children, className }: { tone?: keyof typeof tones; children: React.ReactNode; className?: string }) {
  return <span className={cn("pill", tones[tone], className)}>{children}</span>;
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md bg-surface-3 px-2 py-1 text-xs font-medium text-ink-2">{children}</span>;
}

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-border">
      <div className={cn("h-full rounded-full bg-primary", className)} style={{ width: `${value}%` }} />
    </div>
  );
}

export function PageTitle({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="border-l-4 border-primary pl-4">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
        {sub && <p className="mt-1 text-muted-foreground">{sub}</p>}
      </div>
      {action}
    </div>
  );
}
