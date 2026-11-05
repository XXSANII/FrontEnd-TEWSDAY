import Link from "next/link";
import { IconStarFilled, IconRosetteDiscountCheck, IconAward, IconDeviceLaptop, IconMapPin } from "@tabler/icons-react";
import type { Tutor } from "@/data/mock";
import { Avatar, Tag } from "./ui";
import { baht } from "@/lib/cn";

export function TutorCard({ t }: { t: Tutor }) {
  const top = t.badge === "TOP 1% TUTOR";
  return (
    <article className="card flex flex-col p-5">
      <div className="flex gap-3">
        <Avatar name={t.name} size={56} online={t.online} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            {top ? (
              <span className="pill bg-amber-50 text-amber-700 border border-amber-200"><IconAward size={12} />Top 1% Tutor</span>
            ) : (
              <span className="pill bg-success-soft text-success border border-success/20"><IconRosetteDiscountCheck size={12} />Verified Pro</span>
            )}
            <span className="flex items-center gap-1 text-sm"><IconStarFilled size={14} className="text-amber-400" /><b>{t.rating.toFixed(1)}</b><span className="text-muted">({t.reviews})</span></span>
          </div>
          <h3 className="mt-1 text-base font-semibold leading-5">{t.name}</h3>
          <p className="text-xs text-muted">{t.headline}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">{t.subjects.map((s) => <Tag key={s}>{s}</Tag>)}</div>
      <p className="mt-3 line-clamp-2 text-muted">{t.bio}</p>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
        {t.teachingLocationType === "online" ? <IconDeviceLaptop size={14} className="text-primary" /> : <IconMapPin size={14} className="text-primary" />}
        {t.teachingLocationType === "online" ? "Online Only" : "Online & Onsite"} ({t.area})
      </p>
      <div className="mt-auto flex items-center justify-between border-t border-border pt-4 mt-4">
        <div><span className="text-xl font-bold">{baht(t.rate)}</span><span className="text-xs text-muted"> / hr</span></div>
        <div className="flex gap-2">
          <Link href={`/tutors/${t.tutorProfileId}`} className="btn-outline px-3 py-1.5">Profile</Link>
          <Link href={`/tutors/${t.tutorProfileId}#book`} className="btn-primary px-3 py-1.5">Book Trial</Link>
        </div>
      </div>
    </article>
  );
}
