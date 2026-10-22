"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, X, Users, UserRound } from "lucide-react";
import { MemberModal, type ModalMember } from "@/components/team/MemberModal";

export type AlumniMember = ModalMember;

function getLeadershipRank(pos: string) {
  const p = (pos || "").trim().toLowerCase();
  if (p === "team lead") return 1;
  if (p === "co-team lead" || p === "co team lead") return 2;
  if (p === "sub-team lead" || p === "sub team lead" || p === "subteam lead") return 3;
  if (p.includes("lead") || p.includes("head") || p.includes("director")) return 4;
  return 5;
}

export function CompactAlumniCard({
  member,
  onClick,
}: {
  member: AlumniMember;
  onClick: () => void;
}) {
  const isTeamLead = member.position === "Team Lead";
  const isCoTeamLead = member.position === "Co-Team Lead";
  const isSubTeamLead = member.position === "Sub-team Lead";

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
      {/* Proportional Square Photo - Unobstructed & Clear */}
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

      {/* Info Section - Minimal & Clean */}
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

        {member.subTeam && (
          <p className="font-mono text-[8px] text-white/35 truncate leading-tight">
            {member.subTeam.replace(" & ", "/")}
          </p>
        )}
      </div>
    </button>
  );
}

export function AlumniDirectory() {
  const [alumni, setAlumni] = useState<AlumniMember[]>([]);
  const [selected, setSelected] = useState<AlumniMember | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<"all" | "leads" | "subleads" | "members">("all");

  useEffect(() => {
    fetch("/api/alumni")
      .then(async (res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        let list: AlumniMember[] = [];
        if (Array.isArray(data.alumni)) {
          list = data.alumni;
        } else if (Array.isArray(data.sections)) {
          list = data.sections.flatMap((s: { members: AlumniMember[] }) => s.members);
        }

        // Hierarchical sort: Team Leads -> Sub-Team Leads -> Members, then by series/studentId
        list.sort((a, b) => {
          const rankA = getLeadershipRank(a.position);
          const rankB = getLeadershipRank(b.position);
          if (rankA !== rankB) return rankA - rankB;

          const idA = parseInt(a.studentId, 10) || 0;
          const idB = parseInt(b.studentId, 10) || 0;
          if (idA !== idB) return idA - idB;

          return (
            (a.studentId || "").localeCompare(b.studentId || "", undefined, { numeric: true }) ||
            a.name.localeCompare(b.name)
          );
        });

        setAlumni(list);
        setState("ready");
      })
      .catch(() => setState("error"));
  }, []);

  const filteredAlumni = useMemo(() => {
    return alumni.filter((member) => {
      if (roleFilter === "leads") {
        if (member.position !== "Team Lead" && member.position !== "Co-Team Lead") return false;
      } else if (roleFilter === "subleads") {
        if (member.position !== "Sub-team Lead") return false;
      } else if (roleFilter === "members") {
        if (member.position === "Team Lead" || member.position === "Co-Team Lead" || member.position === "Sub-team Lead") return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesName = member.name.toLowerCase().includes(query);
        const matchesId = (member.studentId || "").toLowerCase().includes(query);
        const matchesTeam = (member.subTeam || "").toLowerCase().includes(query);
        if (!matchesName && !matchesId && !matchesTeam) return false;
      }

      return true;
    });
  }, [alumni, roleFilter, searchQuery]);

  return (
    <section className="relative w-full text-white">
      {/* Loading State */}
      {state === "loading" && (
        <div className="flex items-center gap-3 border-l-2 border-mars-orange pl-4 py-2 my-8">
          <span className="w-2 rounded-full h-2 bg-mars-orange animate-ping" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
            Loading alumni…
          </p>
        </div>
      )}

      {/* Error State */}
      {state === "error" && (
        <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-xs text-red-200 backdrop-blur-md my-8">
          Unable to load alumni. Please try again shortly.
        </div>
      )}

      {/* Minimal Directory Body */}
      {state === "ready" && (
        <div className="space-y-6">
          {/* Minimal Controls Bar: Compact Search & Role Filter Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search alumni..."
                className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-mars-orange transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Role Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setRoleFilter("all")}
                className={`px-2.5 py-1 rounded-md font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                  roleFilter === "all"
                    ? "bg-mars-orange text-black font-extrabold"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                All ({alumni.length})
              </button>
              <button
                type="button"
                onClick={() => setRoleFilter("leads")}
                className={`px-2.5 py-1 rounded-md font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                  roleFilter === "leads"
                    ? "bg-mars-orange text-black font-extrabold"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                Team Leads
              </button>
              <button
                type="button"
                onClick={() => setRoleFilter("subleads")}
                className={`px-2.5 py-1 rounded-md font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                  roleFilter === "subleads"
                    ? "bg-emerald-500 text-black font-extrabold"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                Sub-Leads
              </button>
              <button
                type="button"
                onClick={() => setRoleFilter("members")}
                className={`px-2.5 py-1 rounded-md font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                  roleFilter === "members"
                    ? "bg-white/20 text-white font-extrabold"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                Members
              </button>
            </div>
          </div>

          {/* Empty State / No Match */}
          {filteredAlumni.length === 0 && (
            <div className="rounded-xl border border-dashed border-white/10 bg-black/20 p-8 text-center my-6">
              <Users size={28} className="mx-auto text-white/30 mb-2" />
              <p className="font-heading text-xs text-white/70">No matching alumni found</p>
              <p className="text-[11px] text-white/40 mt-0.5">Try adjusting your search query or role filter.</p>
            </div>
          )}

          {/* 4 Cards Per Row on Mobile: Unified Alumni Cards Grid */}
          {filteredAlumni.length > 0 && (
            <div className="grid grid-cols-2 min-[340px]:grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-2.5 md:gap-3">
              {filteredAlumni.map((member) => (
                <CompactAlumniCard
                  key={member._id}
                  member={member}
                  onClick={() => setSelected(member)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Member Profile Modal Popup */}
      <MemberModal member={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

export default AlumniDirectory;
