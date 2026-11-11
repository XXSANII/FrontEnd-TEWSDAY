"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Avatar, Pill, PageTitle } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ApiError } from "@/lib/api";
import { searchVerifications, verifyTutor, type VerificationRow, type VerificationStatus } from "@/lib/admin";

const tabs: [VerificationStatus | "all", string][] = [["pending", "Pending"], ["verified", "Verified"], ["rejected", "Rejected"], ["unverified", "Not submitted"], ["all", "All"]];
const tone = { pending: "amber", verified: "green", rejected: "red", unverified: "gray" } as const;
const date = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function AdminVerification() {
  const [tab, setTab] = useState<VerificationStatus | "all">("pending");
  const [rows, setRows] = useState<VerificationRow[]>([]);
  const [loaded, setLoaded] = useState<string | null>(null); // tab the rows belong to
  const [error, setError] = useState<{ tab: string; err: Error } | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [tries, setTries] = useState(0);

  useEffect(() => {
    let stale = false;
    searchVerifications(tab === "all" ? undefined : tab)
      .then((r) => { if (!stale) { setRows(r.data); setLoaded(tab); setError(null); } })
      .catch((e) => { if (!stale) setError({ tab, err: e instanceof Error ? e : new Error("Could not load the queue.") }); });
    return () => { stale = true; };
  }, [tab, tries]);

  async function act(r: VerificationRow, status: "verified" | "rejected") {
    if (busyId) return;
    setBusyId(r.tutorProfileId);
    try {
      await verifyTutor(r.tutorProfileId, status);
      // Rows leave a status-filtered view once decided; on "All" they just update in place.
      setRows((l) => (tab === "all" ? l.map((x) => (x.tutorProfileId === r.tutorProfileId ? { ...x, verificationStatus: status } : x)) : l.filter((x) => x.tutorProfileId !== r.tutorProfileId)));
      toast.success(status === "verified" ? `${r.displayName} verified.` : `${r.displayName} rejected.`);
    } catch (e) { toast.error(e instanceof Error ? e.message : "Something went wrong."); }
    finally { setBusyId(null); }
  }

  const err = error?.tab === tab ? error.err : null;
  const loading = loaded !== tab && !err;
  const status = err instanceof ApiError ? err.status : 0;
  return (
    <main className="container-page py-8">
      <PageTitle title="Tutor verification queue" sub="Approve or reject tutor credential submissions." />
      <div className="mb-4 flex w-fit flex-wrap rounded-lg bg-surface-3 p-1 text-xs" role="tablist">
        {tabs.map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={cn("rounded-md px-3 py-1.5", tab === k ? "bg-white font-medium shadow-sm" : "text-muted-foreground")}>{l}</button>)}
      </div>
      {err ? (
        <div className="card py-16 text-center" role="alert">
          <p className="font-semibold">{status === 401 ? "Please sign in as an admin." : status === 403 ? "Your account is not an admin." : "Couldn't load the queue."}</p>
          {status !== 401 && status !== 403 && <p className="text-muted-foreground">{err.message}</p>}
          {status === 401 ? <Link href="/sign-in" className="btn-primary mt-4 inline-flex">Sign in</Link> : status !== 403 && <button onClick={() => setTries(tries + 1)} className="btn-outline mt-4">Try again</button>}
        </div>
      ) : loading ? <p className="py-16 text-center text-muted-foreground">Loading queue…</p> : !rows.length ? <p className="card py-16 text-center text-muted-foreground">Nothing here right now.</p> : (
        <div className="card overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-surface-2 text-xs uppercase text-muted-foreground"><tr>{["Tutor", "Email", "Created", "Intro video", "Status", ""].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
          <tbody>{rows.map((r) => <tr key={r.tutorProfileId} className="border-t border-border"><td className="px-4 py-3"><span className="flex items-center gap-2"><Avatar name={r.displayName} size={32} />{r.displayName}</span></td><td className="px-4">{r.email}</td><td className="px-4">{date(r.createdAt)}</td><td className="px-4">{r.introVideoStatus ?? "—"}</td><td className="px-4"><Pill tone={tone[r.verificationStatus]}>{r.verificationStatus}</Pill></td>
            <td className="px-4 text-right">{r.verificationStatus === "pending" && <span className="flex justify-end gap-2"><button disabled={!!busyId} onClick={() => act(r, "rejected")} className="btn-outline px-3 py-1 text-xs disabled:opacity-60">Reject</button><button disabled={!!busyId} onClick={() => act(r, "verified")} className="btn-primary px-3 py-1 text-xs disabled:opacity-60">Approve</button></span>}</td></tr>)}</tbody></table></div>
      )}
    </main>
  );
}
