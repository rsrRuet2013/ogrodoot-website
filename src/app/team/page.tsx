import { TeamDirectory } from "@/components/team/TeamDirectory";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function TeamPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white pt-28 pb-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-mars-red/15 via-mars-orange/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="mars-grid-pattern absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative z-10">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-10">
          <div className="flex items-center gap-2 mb-6 text-xs text-white/50">
            <Link href="/" className="hover:text-mars-orange transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-white/30" />
            <span className="text-mars-orange font-semibold">Team Roster</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-mars-orange/10 border border-mars-orange/30 text-mars-orange text-[11px] font-mono uppercase tracking-[0.25em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-mars-orange animate-pulse" />
            Personnel Directory
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-tight">
            Current Team
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/70 font-normal leading-relaxed">
            The interdisciplinary researchers, designers, and engineers developing Team Ogrodoot&apos;s next-generation Mars exploration rover.
          </p>
        </section>

        <TeamDirectory />
      </div>
    </main>
  );
}
