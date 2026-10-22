"use client";

import { Award, Crown, UserRound } from "lucide-react";
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
        className="group relative w-full overflow-hidden rounded-2xl border border-mars-orange/60 bg-gradient-to-b from-mars-red/20 via-[#0d1017] to-black text-left shadow-[0_12px_32px_rgba(193,68,14,0.22)] transition-all duration-300 hover:-translate-y-1.5 hover:border-mars-orange hover:shadow-[0_16px_40px_rgba(193,68,14,0.35)] focus:outline-none focus:ring-2 focus:ring-mars-orange/50 cursor-pointer"
      >
        {/* Leadership Tag */}
        <div className="absolute top-2.5 right-2.5 z-20">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-md bg-mars-orange text-black shadow-md">
            <Crown size={9} />
            {isCoTeamLead ? "CO-TEAM LEAD" : "TEAM LEAD"}
          </span>
        </div>

        {/* Prominent Image Box */}
        <div className="relative aspect-[4/4.6] w-full overflow-hidden bg-black/60">
          {member.profilePicUrl ? (
            <img
              src={member.profilePicUrl}
              alt={member.name}
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-900/90 text-slate-500">
              <UserRound size={48} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-black/20 to-transparent opacity-95 group-hover:opacity-75 transition-opacity duration-300" />
        </div>

        {/* Member Info */}
        <div className="p-4 relative z-10 bg-[#080b12]/95 backdrop-blur-sm border-t border-white/5 space-y-1 text-center">
          <p className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-mars-orange transition-colors line-clamp-1">
            {member.name}
          </p>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-mars-orange">
            {member.position}
          </p>
          {showSubTeam && member.subTeam && (
            <p className="font-mono text-[10px] text-white/40 truncate">
              {member.subTeam}
            </p>
          )}
        </div>
      </button>
    );
  }

  // 2. Sub-Team Leadership Card (prominent on individual /team/[slug] page)
  if (subteamLead || (isSubTeamLead && !featured)) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group relative w-full overflow-hidden rounded-2xl border border-emerald-500/40 bg-[#081210] text-left shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400 hover:bg-[#0a1814] hover:shadow-[0_12px_32px_rgba(16,185,129,0.22)] focus:outline-none focus:ring-2 focus:ring-emerald-400/50 cursor-pointer"
      >
        {/* Subtle Green Sub-Team Lead Tag */}
        <div className="absolute top-2.5 right-2.5 z-20">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-md bg-emerald-500 text-black shadow-md">
            <Award size={9} />
            SUB-TEAM LEAD
          </span>
        </div>

        {/* Image Box */}
        <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-black/60">
          {member.profilePicUrl ? (
            <img
              src={member.profilePicUrl}
              alt={member.name}
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-900/90 text-slate-500">
              <UserRound size={42} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#081210] via-black/25 to-transparent opacity-95 group-hover:opacity-75 transition-opacity duration-300" />
        </div>

        {/* Member Info */}
        <div className="p-3.5 relative z-10 bg-[#081210]/95 backdrop-blur-sm border-t border-emerald-500/10 space-y-1 text-center">
          <p className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
            {member.name}
          </p>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Sub-team Lead
          </p>
          {member.studentId && (
            <p className="font-mono text-[10px] text-white/40">
              ID: {member.studentId}
            </p>
          )}
        </div>
      </button>
    );
  }

  // 3. Compact Member Card (optimized for 4 cards per row on mobile)
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-xl border text-center transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-1 focus:ring-mars-orange/50 cursor-pointer ${
        isTeamLead
          ? "border-mars-orange/50 bg-[#0d0f17] hover:border-mars-orange"
          : isCoTeamLead
          ? "border-amber-400/40 bg-[#0d121c] hover:border-amber-400"
          : isSubTeamLead
          ? "border-emerald-500/40 bg-[#081210] hover:border-emerald-400"
          : "border-white/10 bg-[#080b12] hover:border-white/25 hover:bg-[#0c101a]"
      }`}
    >
      {/* Compact Leadership Accent Indicator */}
      {(isTeamLead || isCoTeamLead || isSubTeamLead) && (
        <div className="absolute top-1 right-1 z-20">
          <span
            className={`inline-block w-2 h-2 rounded-full ring-2 ring-black ${
              isTeamLead
                ? "bg-mars-orange"
                : isCoTeamLead
                ? "bg-amber-400"
                : "bg-emerald-400"
            }`}
            title={member.position}
          />
        </div>
      )}

      {/* Compact Image Box: 1:1 Aspect Ratio */}
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-transparent to-transparent opacity-60" />
      </div>

      {/* Compact Member Info */}
      <div className="p-1.5 sm:p-2 bg-[#080b12] border-t border-white/5 space-y-0.5">
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
