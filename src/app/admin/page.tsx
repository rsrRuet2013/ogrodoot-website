import { AdminDashboard } from "@/components/admin/AdminDashboard";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white px-4 sm:px-6 lg:px-8 pb-20 pt-28">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-mars-red/15 via-mars-orange/5 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <section className="mx-auto max-w-7xl relative z-10 pt-8">
        <div className="flex items-center gap-2 mb-6 text-xs text-white/50">
          <Link href="/" className="hover:text-mars-orange transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="text-white/30" />
          <span className="text-mars-orange font-semibold">Admin Console</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-mars-orange/10 border border-mars-orange/30 text-mars-orange text-[11px] font-mono uppercase tracking-[0.25em] mb-4">
          <ShieldCheck size={13} className="text-mars-orange" />
          Command Console
        </div>

        <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
          Member Approvals & Roster
        </h1>
        <p className="mt-2 text-sm text-white/70 max-w-2xl font-normal leading-relaxed">
          Review student registrations, assign sub-team leadership roles, and maintain the verified team roster.
        </p>

        <div className="mt-10">
          <AdminDashboard />
        </div>
      </section>
    </main>
  );
}
