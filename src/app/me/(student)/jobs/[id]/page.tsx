import { Suspense } from "react";
import { Proposals } from "@/components/Proposals";

export default function ProposalsPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="container-page py-20 text-center text-muted-foreground">Loading proposals…</div>}>
      <ProposalsLoader params={params} />
    </Suspense>
  );
}

async function ProposalsLoader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Proposals jobId={id} />;
}
