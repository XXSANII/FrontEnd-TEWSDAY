"use client";
import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

type Items = [string, string][];

function Links({ items, active, lg }: { items: Items; active: (href: string) => boolean; lg?: boolean }) {
  return (
    <nav className={cn("hidden items-center gap-6", lg ? "lg:flex" : "md:flex")}>
      {items.map(([label, href]) => (
        <Link key={href + label} href={href}
          className={cn("whitespace-nowrap border-b-2 py-1.5 text-base", active(href) ? "border-primary text-primary" : "border-transparent text-ink-2 hover:text-primary")}>
          {label}
        </Link>
      ))}
    </nav>
  );
}

function Active({ items, lg }: { items: Items; lg?: boolean }) {
  const path = usePathname();
  return <Links lg={lg} items={items} active={(h) => (h === "/" ? path === "/" : path === h || path.startsWith(h + "/"))} />;
}

// usePathname() is runtime data under Cache Components, so it must sit inside Suspense.
export function NavLinks({ items, lg }: { items: Items; lg?: boolean }) {
  return (
    <Suspense fallback={<Links lg={lg} items={items} active={() => false} />}>
      <Active items={items} lg={lg} />
    </Suspense>
  );
}
