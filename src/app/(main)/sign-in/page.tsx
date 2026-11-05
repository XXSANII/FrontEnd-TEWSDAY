import { SignInForm } from "@/components/SignInForm";
export default function SignInPage() {
  return (
    <main className="grid min-h-[calc(100vh-65px-73px)] place-items-center bg-gradient-to-br from-primary-soft/40 via-surface-1 to-surface-2 px-6 py-16">
      <SignInForm />
    </main>
  );
}
