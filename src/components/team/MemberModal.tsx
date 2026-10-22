"use client";

import { useEffect } from "react";
import { ExternalLink, Mail, Phone, UserRound, X, Award, Crown, GraduationCap } from "lucide-react";

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
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-[#0d1017] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 z-20 rounded-full bg-black/70 p-2 text-white/80 hover:text-white hover:bg-black transition-all border border-white/20 cursor-pointer"
          aria-label="Close details dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Profile Image Header */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
          {member.profilePicUrl ? (
            <img
              src={member.profilePicUrl}
              alt={member.name}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-600">
              <UserRound size={56} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017] via-transparent to-transparent" />
        </div>

        {/* Modal Detailed Info Body */}
        <div className="p-6 sm:p-7 -mt-6 relative z-10">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider ${
                isTeamLead
                  ? "bg-mars-orange/15 border border-mars-orange/40 text-mars-orange"
                  : isCoTeamLead
                  ? "bg-amber-400/15 border border-amber-400/40 text-amber-300"
                  : isSubTeamLead
                  ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-300"
                  : "bg-white/10 border border-white/15 text-white/80"
              }`}
            >
              {isTeamLead || isCoTeamLead ? <Crown size={12} /> : <Award size={12} />}
              {member.position}
            </span>

            <span className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-white/80">
              {member.subTeam}
            </span>

            {member.memberType === "Alumni" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/15 border border-purple-500/30 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-purple-300">
                <GraduationCap size={12} />
                Alumni
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-blue-300">
                Current Member
              </span>
            )}

            {seriesLabel && (
              <span className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                {seriesLabel}
              </span>
            )}
          </div>

          {/* Name & Title */}
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            {member.name}
          </h3>

          {/* Detailed Contact List */}
          <div className="mt-5 space-y-3 border-t border-white/10 pt-4 text-xs sm:text-sm text-white/80">
            {member.email && (
              <div className="flex items-center justify-between gap-3 rounded-xl bg-black/40 border border-white/10 p-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail size={16} className="text-mars-orange shrink-0" />
                  <span className="truncate font-medium">{member.email}</span>
                </div>
                <a
                  href={`mailto:${member.email}`}
                  className="rounded-lg bg-mars-red/20 border border-mars-orange/50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-mars-orange hover:bg-mars-red hover:text-white transition shrink-0"
                >
                  Email
                </a>
              </div>
            )}

            {member.mobile && (
              <div className="flex items-center justify-between gap-3 rounded-xl bg-black/40 border border-white/10 p-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Phone size={16} className="text-mars-orange shrink-0" />
                  <span className="truncate font-medium">{member.mobile}</span>
                </div>
                <a
                  href={`tel:${member.mobile}`}
                  className="rounded-lg bg-mars-red/20 border border-mars-orange/50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-mars-orange hover:bg-mars-red hover:text-white transition shrink-0"
                >
                  Call
                </a>
              </div>
            )}

            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-xl bg-black/40 border border-white/10 p-3 hover:border-mars-orange/60 transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ExternalLink size={16} className="text-mars-orange shrink-0" />
                  <span className="truncate font-medium text-white/90 group-hover:text-mars-orange transition-colors">
                    LinkedIn Profile
                  </span>
                </div>
                <span className="text-xs text-white/40 group-hover:text-white transition">Visit →</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
