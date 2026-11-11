"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

type Items = [string, string][];

function List({ items, onPick, path }: { items: Items; onPick: () => void; path: string }) {
  const active = (h: string) => (h === "/" ? path === "/" : path === h || path.startsWith(h + "/"));
  return (
    <>
      {items.map(([label, href]) => (
        <Link key={href + label} href={href} onClick={onPick}
          className={cn("rounded-lg px-3 py-3 text-base", active(href) ? "bg-primary-soft font-medium text-primary" : "text-ink-2 hover:bg-surface-2")}>
          {label}
        </Link>
      ))}
    </>
  );
}

function Active({ items, onPick }: { items: Items; onPick: () => void }) {
  return <List items={items} onPick={onPick} path={usePathname()} />;
}

// Hamburger + dropdown panel shown below the md breakpoint. `extra` is rendered under the links.
export function MobileMenu({ items, extra, lg }: { items: Items; extra?: React.ReactNode; lg?: boolean }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <div className={lg ? "lg:hidden" : "md:hidden"}>
      <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}
        className="grid size-10 place-items-center rounded-lg text-ink-2 hover:bg-surface-2">
        {open ? <IconX size={22} /> : <IconMenu2 size={22} />}
      </button>
      {open && (
        <div className="absolute inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-white px-4 pb-4 pt-2 shadow-lg">
          <nav className="flex flex-col">
            <Suspense fallback={<List items={items} onPick={close} path="" />}>
              <Active items={items} onPick={close} />
            </Suspense>
          </nav>
          {extra && <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3" onClick={close}>{extra}</div>}
        </div>
      )}
    </div>
  );
}
