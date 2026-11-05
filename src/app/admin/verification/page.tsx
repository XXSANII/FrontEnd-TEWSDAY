"use client";
import { useState } from "react";
import { toast } from "sonner";
import { verifications } from "@/data/mock";
import { Avatar, Pill, PageTitle } from "@/components/ui";

export default function AdminVerification() {
  const [rows, setRows] = useState(verifications);
  const act = (id: string, status: "verified" | "rejected") => { setRows(rows.map((r) => (r.tutorProfileId === id ? { ...r, status } : r))); toast.success(`Tutor ${status} (adm_002_e).`); };
  return (
    <main className="container-page py-8">
      <PageTitle title="Tutor verification queue" sub="Approve or reject tutor credential submissions (adm_002_s / adm_002_e)." />
      <div className="card overflow-hidden"><table className="w-full text-left text-sm"><thead className="bg-surface-2 text-xs uppercase text-muted"><tr>{["Tutor", "Subjects", "Submitted", "Documents", "Status", ""].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r.tutorProfileId} className="border-t border-border"><td className="px-4 py-3"><span className="flex items-center gap-2"><Avatar name={r.name} size={32} />{r.name}</span></td><td className="px-4">{r.subjects}</td><td className="px-4">{r.submitted}</td><td className="px-4">{r.docs} files</td><td className="px-4"><Pill tone={r.status === "verified" ? "green" : r.status === "rejected" ? "red" : "amber"}>{r.status}</Pill></td>
          <td className="px-4 text-right">{r.status === "pending" && <span className="flex justify-end gap-2"><button onClick={() => act(r.tutorProfileId, "rejected")} className="btn-outline px-3 py-1 text-xs">Reject</button><button onClick={() => act(r.tutorProfileId, "verified")} className="btn-primary px-3 py-1 text-xs">Approve</button></span>}</td></tr>)}</tbody></table></div>
    </main>
  );
}
