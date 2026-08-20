"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Mail, Phone, UserRound, X } from "lucide-react";

type Member = {
  _id: string;
  name: string;
  email: string;
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
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-xl border text-left transition-all duration-300 hover:-translate-y-1 ${
        featured
          ? "border-orange-500/50 bg-gradient-to-b from-orange-950/20 to-black hover:border-orange-500 hover:shadow-[0_8px_20px_rgba(234,88,12,0.2)]"
          : "border-white/10 bg-neutral-900/60 hover:border-orange-500/50 hover:bg-neutral-900 hover:shadow-[0_6px_20px_rgba(0,0,0,0.8)]"
      }`}
    >
      {/* Compact Image Box */}
      <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-neutral-950">
        {member.profilePicUrl ? (
          <img
            src={member.profilePicUrl}
            alt={member.name}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-neutral-600">
            <UserRound size={36} />
          </div>
        )}
        
        {/* Bottom Image Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
      </div>

      {/* Compact Member Info */}
      <div className="p-3 sm:p-3.5 relative z-10 bg-black/40 backdrop-blur-sm border-t border-white/5">
        <p className="font-orbitron text-xs sm:text-sm font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
          {member.name}
        </p>
        <p className="mt-0.5 font-jetbrains-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-orange-500 line-clamp-1">
          {member.position}
        </p>
      </div>
    </button>
  );
}

export function TeamDirectory() {
  const [sections, setSections] = useState<Section[]>([]);
  const [teamLead, setTeamLead] = useState<Member | null>(null);
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
        setState("ready");
      })
      .catch(() => setState("error"));
  }, []);

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-14 text-white">
      
      {/* Loading State */}
      {state === "loading" && (
        <div className="flex items-center gap-3 border-l-2 border-orange-500 pl-4 py-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
          <p className="font-jetbrains-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
            Establishing team uplink…
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
      {state === "ready" && !teamLead && sections.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 bg-neutral-900/30 px-6 py-12 text-center">
          <p className="font-orbitron text-lg text-neutral-300">Roster Incoming</p>
          <p className="mt-1 text-sm text-neutral-500">
            Approved team members will appear here soon.
          </p>
        </div>
      )}

      {/* Team Lead Section */}
      {teamLead && (
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <h2 className="font-jetbrains-mono text-xs uppercase tracking-[0.25em] text-orange-500 font-bold">
              Team Lead
            </h2>
          </div>
          <div className="w-44 sm:w-52 md:w-56">
            <MemberCard member={teamLead} featured onClick={() => setSelected(teamLead)} />
          </div>
        </div>
      )}

      {/* Sub Teams Sections */}
      <div className="space-y-12 md:space-y-16">
        {sections.map((section, index) => (
          <div key={section.subTeam}>
            {/* Section Header */}
            <div className="mb-5 flex items-center gap-3">
              <span className="font-jetbrains-mono text-xs text-orange-500 font-bold">
                0{index + 1}
              </span>
              <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-white">
                {section.subTeam}
              </h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 via-orange-500/20 to-transparent" />
            </div>

            {/* Compact Responsive Grid (Shows 2 to 6 cards depending on screen size) */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 min-[540px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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

      {/* Detailed Modal Popup */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 z-20 rounded-full bg-black/60 p-2 text-white/80 hover:text-white hover:bg-black transition-all border border-white/10"
            >
              <X size={16} />
            </button>

            {/* Modal Image Header */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
              {selected.profilePicUrl ? (
                <img
                  src={selected.profilePicUrl}
                  alt={selected.name}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-neutral-600">
                  <UserRound size={48} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
            </div>

            {/* Modal Body Info */}
            <div className="p-5 sm:p-6 -mt-5 relative z-10">
              <span className="inline-block rounded-full bg-orange-500/10 border border-orange-500/30 px-2.5 py-0.5 font-jetbrains-mono text-[10px] font-bold uppercase tracking-wider text-orange-400 mb-2">
                {selected.subTeam} • {selected.memberType}
              </span>

              <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white">
                {selected.name}
              </h3>
              <p className="mt-0.5 text-xs sm:text-sm font-semibold text-neutral-300">
                {selected.position}
              </p>

              {/* Contact Links */}
              <div className="mt-4 flex flex-col gap-2.5 border-t border-white/10 pt-4 text-xs sm:text-sm text-neutral-300 font-exo2">
                {selected.email && (
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center gap-2.5 hover:text-orange-400 transition-colors"
                  >
                    <Mail size={15} className="text-orange-500 shrink-0" />
                    <span>{selected.email}</span>
                  </a>
                )}
                {selected.mobile && (
                  <a
                    href={`tel:${selected.mobile}`}
                    className="flex items-center gap-2.5 hover:text-orange-400 transition-colors"
                  >
                    <Phone size={15} className="text-orange-500 shrink-0" />
                    <span>{selected.mobile}</span>
                  </a>
                )}
                {selected.linkedin && (
                  <a
                    href={selected.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 hover:text-orange-400 transition-colors pt-0.5"
                  >
                    <ExternalLink size={15} className="text-orange-500 shrink-0" />
                    <span>LinkedIn Profile</span>
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