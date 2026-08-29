"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Mail, Phone, UserRound, X, Award, MapPin } from "lucide-react";

type Member = {
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

type Section = { subTeam: string; members: Member[] };

function MemberCard({
  member,
  featured = false,
  onClick,
}: {
  member: Member;
  featured?: boolean;
  onClick: () => void;
}) {
  const isSubTeamLead = member.position === "Sub-team Lead";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-mars-orange/50 cursor-pointer ${
        featured
          ? "border-mars-orange/70 bg-gradient-to-b from-mars-red/25 via-[#0d1017] to-black shadow-[0_12px_35px_rgba(193,68,14,0.3)] hover:border-mars-orange"
          : isSubTeamLead
          ? "border-cyan-400/40 bg-[#080d18] hover:border-cyan-400 hover:bg-[#0c1424] shadow-lg"
          : "border-white/10 bg-[#080b12] hover:border-mars-orange/50 hover:bg-[#0c101a] hover:shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
      }`}
    >
      {/* Leadership Tag */}
      {(featured || isSubTeamLead) && (
        <div className="absolute top-2.5 right-2.5 z-20">
          <span className={`inline-block px-2 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${
            featured 
              ? "bg-mars-orange/90 text-black font-extrabold" 
              : "bg-cyan-500/85 text-black font-extrabold"
          }`}>
            {featured ? "TEAM LEAD" : "LEAD"}
          </span>
        </div>
      )}

      {/* Compact Image Box */}
      <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-black/60">
        {member.profilePicUrl ? (
          <img
            src={member.profilePicUrl}
            alt={member.name}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-900 text-slate-600">
            <UserRound size={40} />
          </div>
        )}
        
        {/* Bottom Image Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-black/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-300" />
      </div>

      {/* Member Info Banner */}
      <div className="p-3.5 relative z-10 bg-[#080b12]/95 backdrop-blur-sm border-t border-white/5">
        <p className="font-heading text-sm sm:text-base font-bold text-white group-hover:text-mars-orange transition-colors line-clamp-1">
          {member.name}
        </p>
        <div className="flex items-center justify-between gap-1 mt-0.5">
          <p className={`font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider line-clamp-1 ${
            isSubTeamLead ? "text-cyan-300" : "text-mars-orange"
          }`}>
            {member.position}
          </p>
          {member.studentId && (
            <span className="font-mono text-[10px] text-white/40 shrink-0">
              {member.studentId}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export function TeamDirectory() {
  const [sections, setSections] = useState<Section[]>([]);
  const [teamLead, setTeamLead] = useState<Member | null>(null);
  const [teamLeads, setTeamLeads] = useState<Member[]>([]);
  const [selected, setSelected] = useState<Member | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    fetch("/api/team")
      .then(async (res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setSections(data.sections || []);
        setTeamLead(data.teamLead || null);
        setTeamLeads(data.teamLeads || (data.teamLead ? [data.teamLead] : []));
        setState("ready");
      })
      .catch(() => setState("error"));
  }, []);

  const displayLeads = teamLeads.length > 0 ? teamLeads : (teamLead ? [teamLead] : []);

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10 text-white">
      
      {/* Loading State */}
      {state === "loading" && (
        <div className="flex items-center gap-3 border-l-2 border-mars-orange pl-4 py-2">
          <span className="w-2.5 h-2.5 rounded-full bg-mars-orange animate-ping" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
            Loading team roster…
          </p>
        </div>
      )}

      {/* Error State */}
      {state === "error" && (
        <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-sm text-red-200 backdrop-blur-md">
          The team directory is temporarily unavailable. Please try again shortly.
        </div>
      )}

      {/* Empty State */}
      {state === "ready" && displayLeads.length === 0 && sections.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 bg-black/30 px-6 py-12 text-center">
          <p className="font-heading text-lg text-white/70">Roster Incoming</p>
          <p className="mt-1 text-sm text-white/40">
            Approved team members will appear here soon.
          </p>
        </div>
      )}

      {/* Team Lead Section - Upper Middle Top of the Page */}
      {displayLeads.length > 0 && (
        <div className="mb-14 md:mb-20 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-mars-orange/10 border border-mars-orange/30 text-mars-orange text-[11px] font-mono uppercase tracking-[0.25em] mb-3">
            <span className="flex h-2 w-2 rounded-full bg-mars-orange animate-pulse" />
            Mission Command
          </div>
          
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white m-0">
            TEAM LEADERSHIP
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-mars-orange to-transparent my-4" />

          {/* Centered Upper-Middle Team Lead Card(s) */}
          <div className="flex flex-wrap justify-center items-center gap-6 w-full mt-2">
            {displayLeads.map((lead) => (
              <div key={lead._id} className="w-56 sm:w-64 md:w-72">
                <MemberCard member={lead} featured onClick={() => setSelected(lead)} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub Teams Sections */}
      <div className="space-y-12 md:space-y-16">
        {sections.map((section, index) => (
          <div key={section.subTeam}>
            {/* Section Header */}
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-xs text-mars-orange font-bold">
                0{index + 1}
              </span>
              <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-white">
                {section.subTeam}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-mars-orange/20 to-transparent" />
            </div>

            {/* Responsive Member Cards Grid - Sorted by Position Hierarchy & Ascending Student ID */}
            <div className="grid gap-3.5 sm:gap-5 grid-cols-2 min-[540px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {section.members.map((member) => (
                <MemberCard
                  key={member._id}
                  member={member}
                  onClick={() => setSelected(member)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Member Info Modal Popup */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-[#0d1017] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-3.5 top-3.5 z-20 rounded-full bg-black/70 p-2 text-white/80 hover:text-white hover:bg-black transition-all border border-white/20 cursor-pointer"
              aria-label="Close details dialog"
            >
              <X size={18} />
            </button>

            {/* Modal Profile Image Header */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              {selected.profilePicUrl ? (
                <img
                  src={selected.profilePicUrl}
                  alt={selected.name}
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
                <span className="inline-flex items-center gap-1 rounded-full bg-mars-orange/15 border border-mars-orange/40 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-mars-orange">
                  <Award size={12} />
                  {selected.position}
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-white/80">
                  {selected.subTeam}
                </span>
                <span className="inline-flex items-center rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-blue-300">
                  {selected.memberType}
                </span>
              </div>

              {/* Name & Title */}
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                {selected.name}
              </h3>

              {/* Detailed Contact List */}
              <div className="mt-5 space-y-3 border-t border-white/10 pt-4 text-xs sm:text-sm text-white/80">
                {selected.email && (
                  <div className="flex items-center justify-between gap-3 rounded-xl bg-black/40 border border-white/10 p-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Mail size={16} className="text-mars-orange shrink-0" />
                      <span className="truncate font-medium">{selected.email}</span>
                    </div>
                    <a
                      href={`mailto:${selected.email}`}
                      className="rounded-lg bg-mars-red/20 border border-mars-orange/50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-mars-orange hover:bg-mars-red hover:text-white transition shrink-0"
                    >
                      Email
                    </a>
                  </div>
                )}

                {selected.mobile && (
                  <div className="flex items-center justify-between gap-3 rounded-xl bg-black/40 border border-white/10 p-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Phone size={16} className="text-mars-orange shrink-0" />
                      <span className="truncate font-medium">{selected.mobile}</span>
                    </div>
                    <a
                      href={`tel:${selected.mobile}`}
                      className="rounded-lg bg-mars-red/20 border border-mars-orange/50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-mars-orange hover:bg-mars-red hover:text-white transition shrink-0"
                    >
                      Call
                    </a>
                  </div>
                )}

                {selected.linkedin && (
                  <a
                    href={selected.linkedin}
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
      )}
    </section>
  );
}

export default TeamDirectory;