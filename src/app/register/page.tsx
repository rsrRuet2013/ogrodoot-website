import { RegisterForm } from "@/components/auth/AuthForms";

export default function RegisterPage() {
  return (
    <main className="mars-bg-gradient min-h-screen px-4 sm:px-6 pb-20 pt-32 flex items-center justify-center">
      <section className="w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0b0e14]/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-mars-orange">
          JOIN THE TEAM
        </span>
        <h1 className="mt-2 font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Member Registration
        </h1>
        <p className="mb-8 mt-2 text-sm leading-relaxed text-slate-300">
          Register your details for team administrator approval. Registration requires verification prior to account activation.
        </p>
        <RegisterForm />
      </section>
    </main>
  );
}
