"use client";

import { useEffect } from "react";
import { ExternalLink, Mail, Phone, UserRound, X } from "lucide-react";

export type ModalMember = {
  _id: string;
  name: string;
  email: string;
  studentId: string;
  mobile: string;
  profilePicUrl: string;
  subTeam: string;
  memberType: string;
  position: string;
  linkedin?: string;
};

function getSeriesLabel(studentId: string) {
  const clean = (studentId || "").trim();
  if (/^\d{7}$/.test(clean)) {
    return `Series '${clean.slice(0, 2)}`;
  }
  return clean ? `ID: ${clean}` : "";
}

export function MemberModal({
  member,
  onClose,
}: {
  member: ModalMember | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!member) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [member, onClose]);

  if (!member) return null;

  const isTeamLead = member.position === "Team Lead";
  const isCoTeamLead = member.position === "Co-Team Lead";
  const isSubTeamLead = member.position === "Sub-team Lead";
  const seriesLabel = getSeriesLabel(member.studentId);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-[#0e1320] via-[#080b12] to-black shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-6 sm:p-7 text-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 z-20 rounded-full bg-white/5 hover:bg-white/15 p-1.5 text-white/60 hover:text-white transition-all border border-white/10 cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={16} />
        </button>

        {/* Crisp, Centered, Unobstructed Portrait Photo */}
        <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-mars-orange/60 shadow-[0_8px_24px_rgba(193,68,14,0.3)] bg-black/80 shrink-0">
          {member.profilePicUrl ? (
            <img
              src={member.profilePicUrl}
              alt={member.name}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-900 text-slate-500">
              <UserRound size={44} />
            </div>
          )}
        </div>

        {/* Member Name */}
        <h3 className="font-heading text-lg sm:text-xl font-extrabold text-white mt-4 tracking-tight leading-snug">
          {member.name}
        </h3>

        {/* Minimal Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
          <span
            className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${
              isTeamLead
                ? "bg-mars-orange text-black font-extrabold"
                : isCoTeamLead
                ? "bg-amber-400 text-black font-extrabold"
                : isSubTeamLead
                ? "bg-emerald-500 text-black font-extrabold"
                : "bg-white/10 text-white/80"
            }`}
          >
            {member.position || "Member"}
          </span>

          {member.subTeam && (
            <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] text-white/70 bg-white/5 border border-white/10">
              {member.subTeam}
            </span>
          )}

          {seriesLabel && (
            <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] text-white/50 bg-white/5 border border-white/10">
              {seriesLabel}
            </span>
          )}
        </div>

        {/* Minimal Clean Contact Links */}
        {(member.email || member.mobile || member.linkedin) && (
          <div className="mt-5 pt-4 border-t border-white/10 space-y-2 text-left">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white transition-all group"
              >
                <Mail size={14} className="text-mars-orange shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate text-xs font-mono flex-1">{member.email}</span>
              </a>
            )}

            {member.mobile && (
              <a
                href={`tel:${member.mobile}`}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white transition-all group"
              >
                <Phone size={14} className="text-mars-orange shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate text-xs font-mono flex-1">{member.mobile}</span>
              </a>
            )}

            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <ExternalLink size={14} className="text-mars-orange shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate text-xs font-mono">LinkedIn Profile</span>
                </div>
                <span className="text-[10px] text-white/40 group-hover:text-mars-orange transition-colors">
                  Visit →
                </span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
