import Link from "next/link";
export function Logo({ boxed = false }: { boxed?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-primary">
      {boxed ? (
        <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-white">T</span>
      ) : (
        <span className="size-2.5 rounded-full bg-primary" />
      )}
      TewsDay
    </Link>
  );
}
