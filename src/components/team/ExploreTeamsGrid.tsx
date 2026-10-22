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
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 w-full">
      {TEAMS_META.map((team) => {
        const Icon = TEAM_ICONS[team.slug] || Cpu;

        return (
          <Link
            key={team.slug}
            href={`/team/${team.slug}`}
            className="group relative block outline-none w-full min-[460px]:w-[calc(50%-8px)] md:w-[calc(33.333%-14px)] min-[1150px]:w-[calc(20%-16px)] min-[1150px]:flex-1 max-w-sm"
          >
            <div className="relative h-full min-h-[120px] sm:min-h-[140px] rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] via-[#080b12] to-black p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-mars-orange/60 hover:shadow-[0_12px_32px_rgba(193,68,14,0.18)] flex flex-col justify-between overflow-hidden">
              {/* Subtle Ambient Hover Glow */}
              <div className="absolute -right-12 -top-12 w-28 h-28 bg-mars-orange/10 rounded-full blur-2xl group-hover:bg-mars-orange/20 transition-all duration-500 pointer-events-none" />

              {/* Top Row: Division Code & Arrow Indicator */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:border-mars-orange/40 group-hover:text-mars-orange transition-colors">
                  {team.code}
                </span>

                <div className="w-7 h-7 rounded-full border border-white/15 bg-black/60 flex items-center justify-center text-white/60 group-hover:bg-mars-orange group-hover:text-black group-hover:border-mars-orange transition-all duration-300 shrink-0">
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Icon & Clean Team Title */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-mars-orange group-hover:bg-mars-orange/15 group-hover:border-mars-orange/30 transition-colors shrink-0">
                  <Icon size={18} />
                </div>
                <h3 className="font-heading text-sm sm:text-base font-bold text-white group-hover:text-mars-orange transition-colors leading-tight">
                  {team.name}
                </h3>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
