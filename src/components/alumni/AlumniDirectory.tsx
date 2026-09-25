"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Mail, Phone, UserRound, X, Award, GraduationCap } from "lucide-react";

type AlumniMember = {
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

type AlumniSection = {
  subTeam: string;
  members: AlumniMember[];
};

function getSeriesLabel(studentId: string) {
  const clean = (studentId || "").trim();
  if (/^\d{7}$/.test(clean)) {
    return `Series '${clean.slice(0, 2)}`;
  }
  return clean ? `ID: ${clean}` : "";
}

function AlumniCard({
  member,
  onClick,
}: {
  member: AlumniMember;
  onClick: () => void;
}) {
  const seriesLabel = getSeriesLabel(member.studentId);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080b12] text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-mars-orange/60 hover:bg-[#0c101a] hover:shadow-[0_12px_35px_rgba(0,0,0,0.9)] focus:outline-none focus:ring-2 focus:ring-mars-orange/50 cursor-pointer"
    >
      {/* Series / Batch Tag */}
      {seriesLabel && (
        <div className="absolute top-2.5 right-2.5 z-20">
          <span className="inline-block px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md bg-white/10 text-white/90 border border-white/15 shadow-sm">
            {seriesLabel}
          </span>
        </div>
      )}

      {/* Member Profile Image */}
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

      {/* Info Section */}
      <div className="p-3.5 relative z-10 bg-[#080b12]/95 backdrop-blur-sm border-t border-white/5">
        <p className="font-heading text-sm sm:text-base font-bold text-white group-hover:text-mars-orange transition-colors line-clamp-1">
          {member.name}
        </p>

        <div className="flex items-center justify-between gap-1 mt-1">
          <p className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-mars-orange line-clamp-1">
            {member.position || "Alumnus"}
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

export function AlumniDirectory() {
  const [sections, setSections] = useState<AlumniSection[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selected, setSelected] = useState<AlumniMember | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    fetch("/api/alumni")
      .then(async (res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setSections(data.sections || []);
        setTotalCount(data.totalCount || 0);
        setState("ready");
      })
      .catch(() => setState("error"));
  }, []);

  return (
    <section className="relative w-full py-4 text-white">
      {/* Loading State */}
      {state === "loading" && (
        <div className="flex items-center gap-3 border-l-2 border-mars-orange pl-4 py-2 my-8">
          <span className="w-2.5 h-2.5 rounded-full bg-mars-orange animate-ping" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
            Loading alumni directory…
          </p>
        </div>
      )}

      {/* Error State */}
      {state === "error" && (
        <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-sm text-red-200 backdrop-blur-md my-8">
          The alumni roster is temporarily unavailable. Please try again shortly.
        </div>
      )}

      {/* Empty State */}
      {state === "ready" && sections.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 bg-black/30 px-6 py-12 text-center my-8">
          <GraduationCap size={36} className="mx-auto text-white/30 mb-3" />
          <p className="font-heading text-lg text-white/70">Alumni Roster Updating</p>
          <p className="mt-1 text-sm text-white/40 max-w-md mx-auto">
            Graduated members registered as alumni will appear here sorted by series once approved.
          </p>
        </div>
      )}

      {/* Sub-team Lists - Sorted by Student ID, No Mention of Anyone at Top */}
      {state === "ready" && sections.length > 0 && (
        <div className="space-y-12 md:space-y-16">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                Alumni Roster
              </h3>
              <p className="font-mono text-xs text-white/50 uppercase tracking-widest mt-1">
                Sorted by Division & Seniority (Student ID)
              </p>
            </div>
            <span className="font-mono text-xs text-mars-orange font-bold px-3 py-1 rounded-full bg-mars-orange/10 border border-mars-orange/30">
              {totalCount} Verified Alumni
            </span>
          </div>

          {sections.map((section, index) => (
            <div key={section.subTeam}>
              {/* Section Header */}
              <div className="mb-5 flex items-center gap-3">
                <span className="font-mono text-xs text-mars-orange font-bold">
                  0{index + 1}
                </span>
                <h4 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
                  {section.subTeam}
                </h4>
                <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-mars-orange/20 to-transparent" />
                <span className="font-mono text-[11px] text-white/40">
                  {section.members.length} {section.members.length === 1 ? "member" : "members"}
                </span>
              </div>

              {/* Grid of Alumni Cards */}
              <div className="grid gap-3.5 sm:gap-5 grid-cols-2 min-[540px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {section.members.map((member) => (
                  <AlumniCard
                    key={member._id}
                    member={member}
                    onClick={() => setSelected(member)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detailed Alumni Info Modal Popup */}
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

            {/* Modal Profile Image */}
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

            {/* Modal Details */}
            <div className="p-6 sm:p-7 -mt-6 relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-mars-orange/15 border border-mars-orange/40 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-mars-orange">
                  <GraduationCap size={12} />
                  Alumni Network
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-white/80">
                  {selected.subTeam}
                </span>
                {selected.studentId && (
                  <span className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                    {getSeriesLabel(selected.studentId)}
                  </span>
                )}
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                {selected.name}
              </h3>
              <p className="font-mono text-xs text-white/60 mt-1">
                Role / Recorded Position: <span className="text-white">{selected.position}</span>
              </p>

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

export default AlumniDirectory;
