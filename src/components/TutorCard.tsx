import Link from "next/link";
import { IconStarFilled, IconRosetteDiscountCheck, IconDeviceLaptop, IconMapPin, IconMessageCircle } from "@tabler/icons-react";
import type { Tutor } from "@/lib/tutors";
import { Avatar } from "./ui";
import { baht } from "@/lib/cn";

export function TutorCard({ t }: { t: Tutor }) {
  const verified = t.verificationStatus === "verified";
  return (
    <article className="card group relative flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5">
      <div className="h-16 bg-gradient-to-r from-primary-soft to-amber-50" />
      <div className="-mt-8 flex flex-1 flex-col px-5 pb-5">
        <div className="flex items-end justify-between">
          <span className="rounded-full ring-4 ring-white"><Avatar name={t.displayName} size={64} /></span>
          {verified && <span className="pill border border-success/20 bg-success-soft text-success"><IconRosetteDiscountCheck size={12} />Verified</span>}
        </div>
        <h3 className="mt-3 text-lg font-bold leading-6"><Link href={`/tutors/${t.tutorProfileId}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">{t.displayName}</Link></h3>
        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{t.bio || "This tutor has not added a bio yet."}</p>

        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <li className="flex items-center gap-1"><IconStarFilled size={14} className="text-amber-400" /><b className="text-ink">{t.averageRating.toFixed(1)}</b> ({t.reviewCount} reviews)</li>
          <li className="flex items-center gap-1">{t.teachingLocationType === "online" ? <IconDeviceLaptop size={14} className="text-primary" /> : <IconMapPin size={14} className="text-primary" />}{t.teachingLocationType === "online" ? "Online" : "Online & in person"}</li>
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4 mt-5">
          <div><span className="text-xl font-extrabold">{t.hourlyRate != null ? baht(t.hourlyRate) : "—"}</span><span className="text-xs text-muted-foreground"> / hr</span></div>
          <div className="relative z-10 flex gap-2">
            <Link href="/me/chat" className="btn-outline px-3" aria-label={`Message ${t.displayName}`}><IconMessageCircle size={18} /></Link>
            <Link href={`/tutors/${t.tutorProfileId}#book`} className="btn-primary px-4">Book trial</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
