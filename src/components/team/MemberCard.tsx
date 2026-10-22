"use client";

import { UserRound } from "lucide-react";
import type { ModalMember } from "./MemberModal";

export function MemberCard({
  member,
  featured = false,
  subteamLead = false,
  showSubTeam = false,
  onClick,
}: {
  member: ModalMember;
  featured?: boolean;
  subteamLead?: boolean;
  showSubTeam?: boolean;
  onClick: () => void;
}) {
  const isTeamLead = member.position === "Team Lead";
  const isCoTeamLead = member.position === "Co-Team Lead";
  const isSubTeamLead = member.position === "Sub-team Lead" || subteamLead;

  // 1. Featured Overall Team Leadership Card (prominent on main /team page)
  if (featured) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group relative w-full overflow-hidden rounded-xl sm:rounded-2xl border border-mars-orange/60 bg-[#0d1017] text-left shadow-[0_8px_24px_rgba(193,68,14,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-mars-orange hover:shadow-[0_12px_28px_rgba(193,68,14,0.3)] focus:outline-none focus:ring-1 focus:ring-mars-orange/50 cursor-pointer flex flex-col"
      >
        {/* Proportional Square Photo - Unobstructed & Crisp */}
        <div className="relative aspect-square w-full overflow-hidden bg-black/60">
          {member.profilePicUrl ? (
            <img
              src={member.profilePicUrl}
              alt={member.name}
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-900/90 text-slate-500">
              <UserRound size={32} className="sm:scale-125" />
            </div>
          )}
        </div>

        {/* Member Info - Clean, Minimal & Compact */}
        <div className="p-1.5 sm:p-2 relative z-10 bg-[#080b12] border-t border-white/5 space-y-0.5 text-center flex-1 flex flex-col justify-center">
          <p className="font-heading font-bold text-xs sm:text-[13px] text-white group-hover:text-mars-orange transition-colors line-clamp-1 leading-tight">
            {member.name}
          </p>
          <p className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-mars-orange leading-tight">
            {member.position}
          </p>
        </div>
      </button>
    );
  }

  // 2. Sub-Team Leadership Card (clean & proportional on individual /team/[slug] page)
  if (subteamLead) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group relative w-full overflow-hidden rounded-xl border border-emerald-500/50 bg-[#081210] text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400 hover:bg-[#0a1814] hover:shadow-[0_8px_20px_rgba(16,185,129,0.18)] focus:outline-none focus:ring-1 focus:ring-emerald-400/50 cursor-pointer flex flex-col"
      >
        {/* Proportional Square Photo - Unobstructed & Crisp */}
        <div className="relative aspect-square w-full overflow-hidden bg-black/60">
          {member.profilePicUrl ? (
            <img
              src={member.profilePicUrl}
              alt={member.name}
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-900/90 text-slate-500">
              <UserRound size={26} className="sm:scale-110" />
            </div>
          )}
        </div>

        {/* Member Info - Clean, Minimal & Compact */}
        <div className="p-1.5 sm:p-2 relative z-10 bg-[#081210] border-t border-emerald-500/15 text-center space-y-0.5 flex-1 flex flex-col justify-center">
          <p className="font-heading font-bold text-[11px] sm:text-xs text-white group-hover:text-emerald-300 transition-colors line-clamp-1 leading-tight">
            {member.name}
          </p>
          <p className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-emerald-400 leading-tight">
            Sub-team Lead
          </p>
        </div>
      </button>
    );
  }

  // 3. Compact Member Card (optimized for 4 cards per row on mobile)
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-xl border text-center transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-1 focus:ring-mars-orange/50 cursor-pointer flex flex-col ${
        isTeamLead
          ? "border-mars-orange/50 bg-[#0d0f17] hover:border-mars-orange"
          : isCoTeamLead
          ? "border-amber-400/40 bg-[#0d121c] hover:border-amber-400"
          : isSubTeamLead
          ? "border-emerald-500/40 bg-[#081210] hover:border-emerald-400"
          : "border-white/10 bg-[#080b12] hover:border-white/25 hover:bg-[#0c101a]"
      }`}
    >
      {/* Compact Image Box: 1:1 Aspect Ratio - Clean & Unobstructed */}
      <div className="relative aspect-square w-full overflow-hidden bg-black/60">
        {member.profilePicUrl ? (
          <img
            src={member.profilePicUrl}
            alt={member.name}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-900/90 text-slate-500">
            <UserRound size={22} className="sm:scale-125" />
          </div>
        )}
      </div>

      {/* Compact Member Info - Minimal Wasted Space */}
      <div className="p-1 sm:p-1.5 bg-[#080b12] border-t border-white/5 space-y-0.5 text-center flex-1 flex flex-col justify-center">
        <p className="font-heading font-semibold text-[10px] sm:text-xs text-white group-hover:text-mars-orange transition-colors line-clamp-1 leading-tight">
          {member.name}
        </p>

        <p
          className={`font-mono text-[8px] sm:text-[9px] uppercase tracking-wider line-clamp-1 leading-tight ${
            isTeamLead
              ? "text-mars-orange font-bold"
              : isCoTeamLead
              ? "text-amber-300 font-bold"
              : isSubTeamLead
              ? "text-emerald-400 font-bold"
              : "text-white/50"
          }`}
        >
          {isTeamLead ? "Team Lead" : isCoTeamLead ? "Co-Lead" : isSubTeamLead ? "Sub-Lead" : "Member"}
        </p>

        {showSubTeam && member.subTeam && (
          <p className="font-mono text-[8px] text-white/35 truncate leading-tight">
            {member.subTeam.replace(" & ", "/")}
          </p>
        )}
      </div>
    </button>
  );
}
