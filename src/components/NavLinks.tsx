"use client";
import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

type Items = [string, string][];

function Links({ items, active }: { items: Items; active: (href: string) => boolean }) {
  return (
    <nav className="flex items-center gap-6">
      {items.map(([label, href]) => (
        <Link key={href + label} href={href}
          className={cn("border-b-2 py-1.5 text-base", active(href) ? "border-primary text-primary" : "border-transparent text-ink-2 hover:text-primary")}>
          {label}
        </Link>
      ))}
    </nav>
  );
}

function Active({ items }: { items: Items }) {
  const path = usePathname();
  return <Links items={items} active={(h) => (h === "/" ? path === "/" : path === h || path.startsWith(h + "/"))} />;
}

// usePathname() is runtime data under Cache Components, so it must sit inside Suspense.
export function NavLinks({ items }: { items: Items }) {
  return (
    <Suspense fallback={<Links items={items} active={() => false} />}>
      <Active items={items} />
    </Suspense>
  );
}
