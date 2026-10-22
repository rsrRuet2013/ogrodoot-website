"use client";

import Link from "next/link";
import { ArrowUpRight, Cpu, Zap, Microscope, Cog, Megaphone } from "lucide-react";
import { TEAMS_META } from "@/lib/subteams";

const TEAM_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  software: Cpu,
  electrical: Zap,
  science: Microscope,
  mechanical: Cog,
  "business-media": Megaphone,
};

export function ExploreTeamsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 md:gap-4.5 w-full max-w-6xl mx-auto">
      {TEAMS_META.map((team, index) => {
        const Icon = TEAM_ICONS[team.slug] || Cpu;

        return (
          <Link
            key={team.slug}
            href={`/team/${team.slug}`}
            className={`group relative block outline-none ${
              index === 4 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <div className="relative h-full min-h-[105px] sm:min-h-[120px] md:min-h-[130px] rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] via-[#090c14] to-black p-3.5 sm:p-4 md:p-4.5 transition-all duration-300 hover:-translate-y-1.5 hover:border-mars-orange hover:from-mars-orange/[0.1] hover:via-[#0e1320] hover:to-black hover:shadow-[0_12px_32px_rgba(193,68,14,0.25)] flex flex-col justify-between overflow-hidden cursor-pointer active:scale-[0.98]">
              {/* Ambient Hover Glow */}
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-mars-orange/10 rounded-full blur-2xl group-hover:bg-mars-orange/30 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

              {/* Top Row: Icon & Arrow Indicator */}
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 text-mars-orange group-hover:bg-mars-orange group-hover:text-black group-hover:border-mars-orange group-hover:scale-105 transition-all duration-300 shrink-0">
                  <Icon size={18} />
                </div>

                <div className="w-7 h-7 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-white/40 group-hover:bg-mars-orange group-hover:text-black group-hover:border-mars-orange transition-all duration-300 shrink-0">
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Just Team Name */}
              <h3 className="font-heading text-xs sm:text-sm md:text-base font-bold text-white group-hover:text-mars-orange transition-colors leading-snug tracking-tight relative z-10">
                {team.name}
              </h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
