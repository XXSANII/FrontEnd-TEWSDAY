import { IconGift, IconBolt, IconShieldCheck } from "@tabler/icons-react";
import { RequestForm } from "@/components/RequestForm";

const perks = [
  { icon: IconGift, h: "Free to use", p: "No matching fee" },
  { icon: IconBolt, h: "Fast replies", p: "Avg. 4 offers in 2 hours" },
  { icon: IconShieldCheck, h: "Verified tutors", p: "Identity and degrees checked" },
];

export default function RequestPage() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-primary-soft/60 to-white">
      <div className="bg-notebook pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_40%)]" />
      <div className="container-page relative py-10 sm:py-14">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Tell us what you need. <span className="highlight">We&apos;ll find your tutor.</span></h1>
          <p className="mt-3 text-muted-foreground">Answer a few quick questions. It takes about a minute.</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {perks.map(({ icon: Icon, h, p }) => <li key={h} className="flex items-center gap-2"><Icon size={18} className="text-primary" /><span><b>{h}</b> <span className="text-muted-foreground">· {p}</span></span></li>)}
          </ul>
        </div>
        <RequestForm />
      </div>
    </main>
  );
}
