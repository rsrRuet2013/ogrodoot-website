import { CurrentTeamView } from "@/components/team/CurrentTeamView";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Current Team | Team Ogrodoot",
  description:
    "Leadership and engineering divisions of Team Ogrodoot at RUET.",
};

export default function TeamPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white pt-28 pb-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-mars-red/15 via-transparent to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="mars-grid-pattern absolute inset-0 opacity-25 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-6 text-xs text-white/50">
          <Link href="/" className="hover:text-mars-orange transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="text-white/30" />
          <span className="text-mars-orange font-semibold">Current Team</span>
        </div>

        {/* Minimal Page Header */}
        <div className="mb-8 border-b border-white/10 pb-6">
          <h1 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
            Current Team
          </h1>
        </div>

        {/* Section 1: Team Leadership & Section 2: Five Team Cards */}
        <CurrentTeamView />
      </div>
    </main>
  );
}
