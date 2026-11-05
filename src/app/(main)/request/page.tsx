import { RequestForm } from "@/components/RequestForm";
const perks = [["Free Service", "No matching fee charged"], ["Avg. 4 Proposals", "Within first 2 hours"], ["Verified Credentials", "Identity & degree checked"]];
export default function RequestPage() {
  return (
    <main className="container-page py-8">
      <p className="pb-3 text-xs text-muted">Home › Request Tutor</p>
      <h1 className="text-[32px] font-bold tracking-tight">Request a Tutor</h1>
      <p className="max-w-xl pb-6 text-muted">Tell us your learning goals and preferences. Our academic advisors match you with top-tier vetted tutors within 24 hours.</p>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">{perks.map(([h, p]) => <div key={h} className="card flex items-center gap-3 p-4"><span className="size-8 rounded-full bg-primary-soft" /><div><b className="block text-xs">{h}</b><span className="text-xs text-muted">{p}</span></div></div>)}</div>
      <RequestForm />
    </main>
  );
}
