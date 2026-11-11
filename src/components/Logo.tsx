import Link from "next/link";
import { IconSchool } from "@tabler/icons-react";
export function Logo({ boxed = false }: { boxed?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-primary">
      {boxed ? (
        <span className="grid size-8 place-items-center rounded-lg bg-primary text-white"><IconSchool size={18} /></span>
      ) : (
        <span className="grid size-8 place-items-center rounded-lg bg-primary text-white"><IconSchool size={18} /></span>
      )}
      TewsDay
    </Link>
  );
}
