import { LoginForm } from "@/components/auth/AuthForms";

export default function LoginPage() {
  return (
    <main className="mars-bg-gradient flex min-h-screen items-center justify-center px-4 sm:px-6 pt-28 pb-16">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0e14]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-mars-orange">
          TEAM ACCESS
        </span>
        <h1 className="mb-6 mt-2 font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Member Sign In
        </h1>
        <LoginForm />
      </section>
    </main>
  );
}
