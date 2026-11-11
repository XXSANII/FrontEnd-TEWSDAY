import { SignInForm } from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <main className="relative grid min-h-[calc(100vh-65px-73px)] place-items-center overflow-hidden bg-gradient-to-br from-primary-soft via-white to-surface-2 px-4 py-10 sm:px-6 sm:py-16">
      <div className="bg-notebook pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <SignInForm />
    </main>
  );
}
