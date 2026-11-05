import { Suspense } from "react";
import { TutorSearch } from "@/components/TutorSearch";

async function Search({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return <TutorSearch initialQ={q ?? ""} />;
}

export default function TutorsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return (
    <main>
      <Suspense fallback={<div className="container-page py-20 text-center text-muted">Loading tutors…</div>}>
        <Search searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
