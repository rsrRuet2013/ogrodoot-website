"use client";

import { useEffect, useState } from "react";
import { MemberCard } from "./MemberCard";
import { MemberModal, type ModalMember } from "./MemberModal";
import { ExploreTeamsGrid } from "./ExploreTeamsGrid";

export function CurrentTeamView() {
  const [overallLeads, setOverallLeads] = useState<ModalMember[]>([]);
  const [selected, setSelected] = useState<ModalMember | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    fetch("/api/team")
      .then(async (res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        const leads: ModalMember[] =
          data.overallLeads || data.teamLeads || (data.teamLead ? [data.teamLead] : []);
        setOverallLeads(leads);
        setState("ready");
      })
      .catch(() => setState("error"));
  }, []);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Loading State */}
      {state === "loading" && (
        <div className="flex items-center gap-3 border-l-2 border-mars-orange pl-4 py-2 my-8">
          <span className="w-2 h-2 rounded-full bg-mars-orange animate-ping" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
            Loading team…
          </p>
        </div>
      )}

      {/* Error State */}
      {state === "error" && (
        <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-xs text-red-200 backdrop-blur-md my-8">
          Unable to load team personnel. Please try again shortly.
        </div>
      )}

      {state === "ready" && (
        <>
          {/* SECTION 1: Team Leadership (Overall Team Lead & Co-Team Lead) */}
          <section className="relative text-center">
            <h2 className="font-heading text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-5">
              Team Leadership
            </h2>

            {overallLeads.length > 0 ? (
              <div className="flex flex-wrap justify-center items-stretch gap-2.5 sm:gap-6 max-w-xs min-[400px]:max-w-sm sm:max-w-lg md:max-w-xl mx-auto">
                {overallLeads.map((lead) => (
                  <div
                    key={lead._id}
                    className={`${
                      overallLeads.length === 1
                        ? "w-40 min-[400px]:w-44 sm:w-56 md:w-60"
                        : "w-[calc(50%-5px)] sm:w-56 md:w-60 max-w-[240px]"
                    } flex`}
                  >
                    <MemberCard
                      member={lead}
                      featured
                      onClick={() => setSelected(lead)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/10 bg-black/20 p-6 text-center max-w-sm mx-auto">
                <p className="text-xs text-white/40 font-mono">Leadership assignment in progress.</p>
              </div>
            )}
          </section>

          {/* SECTION 2: Five Team Cards */}
          <section className="relative pt-4 border-t border-white/10">
            <h2 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-white text-center mb-6">
              Our Teams
            </h2>

            {/* Exactly Five Team Cards with Balanced Responsive Alignment */}
            <ExploreTeamsGrid />
          </section>
        </>
      )}

      {/* Member Profile Modal Popup */}
      <MemberModal member={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
