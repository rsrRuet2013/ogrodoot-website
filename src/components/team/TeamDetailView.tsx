"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Users, Award } from "lucide-react";
import { MemberCard } from "./MemberCard";
import { MemberModal, type ModalMember } from "./MemberModal";
import { TEAMS_META, type TeamMeta } from "@/lib/subteams";

export function TeamDetailView({ teamMeta }: { teamMeta: TeamMeta }) {
  const [leaders, setLeaders] = useState<ModalMember[]>([]);
  const [members, setMembers] = useState<ModalMember[]>([]);
  const [selected, setSelected] = useState<ModalMember | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    fetch(`/api/team?slug=${teamMeta.slug}`)
      .then(async (res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data.team) {
          setLeaders(data.team.leaders || []);
          setMembers(data.team.members || []);
        }
        setState("ready");
      })
      .catch(() => setState("error"));
  }, [teamMeta.slug]);

  const otherTeams = TEAMS_META.filter((t) => t.slug !== teamMeta.slug);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-white/50">
        <Link href="/" className="hover:text-mars-orange transition-colors">
          Home
        </Link>
        <ChevronRight size={12} className="text-white/30" />
        <Link href="/team" className="hover:text-mars-orange transition-colors">
          Current Team
        </Link>
        <ChevronRight size={12} className="text-white/30" />
        <span className="text-mars-orange font-semibold">{teamMeta.name}</span>
      </div>

      {/* Clean Minimal Team Header */}
      <section className="border-b border-white/10 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-mars-orange block mb-1">
              {teamMeta.code}
            </span>
            <h1 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
              {teamMeta.name}
            </h1>
          </div>

          <Link
            href="/team"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white transition-colors self-start sm:self-auto"
          >
            <ArrowLeft size={13} />
            <span>All Teams</span>
          </Link>
        </div>
      </section>

      {/* Loading State */}
      {state === "loading" && (
        <div className="flex items-center gap-3 border-l-2 border-mars-orange pl-4 py-2 my-8">
          <span className="w-2 h-2 rounded-full bg-mars-orange animate-ping" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
            Loading {teamMeta.name}…
          </p>
        </div>
      )}

      {/* Error State */}
      {state === "error" && (
        <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-xs text-red-200 backdrop-blur-md my-8">
          Unable to load division personnel. Please try again shortly.
        </div>
      )}

      {state === "ready" && (
        <>
          {/* SECTION A: Team Leadership (Sub-Team Leads centered at the top) */}
          <section className="relative text-center">
            <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-white mb-6">
              Team Leadership
            </h2>

            {leaders.length > 0 ? (
              <div className="flex flex-wrap justify-center items-stretch gap-6 max-w-3xl mx-auto">
                {leaders.map((leader) => (
                  <div key={leader._id} className="w-full sm:w-72 md:w-80 max-w-xs">
                    <MemberCard
                      member={leader}
                      subteamLead
                      onClick={() => setSelected(leader)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/10 bg-black/20 p-6 text-center max-w-sm mx-auto">
                <Award size={24} className="mx-auto text-white/30 mb-1.5" />
                <p className="font-mono text-xs text-white/40">
                  Sub-team leadership designation in progress.
                </p>
              </div>
            )}
          </section>

          {/* SECTION B: Team Members (Compact 4-per-row grid on mobile) */}
          <section className="relative pt-6 border-t border-white/10">
            <div className="flex items-center justify-between gap-4 mb-5">
              <h2 className="font-heading text-base sm:text-lg font-bold uppercase tracking-wider text-white">
                Team Members
              </h2>
              <span className="font-mono text-[11px] text-white/40">
                {members.length} {members.length === 1 ? "Member" : "Members"}
              </span>
            </div>

            {members.length > 0 ? (
              <div className="grid grid-cols-2 min-[340px]:grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-2.5 md:gap-3">
                {members.map((member) => (
                  <MemberCard
                    key={member._id}
                    member={member}
                    onClick={() => setSelected(member)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/10 bg-black/20 p-6 text-center">
                <Users size={24} className="mx-auto text-white/30 mb-1.5" />
                <p className="font-mono text-xs text-white/40">
                  Approved student engineers for this division will appear here.
                </p>
              </div>
            )}
          </section>
        </>
      )}

      {/* Navigation Pills: Explore Other Teams */}
      <section className="pt-6 border-t border-white/10">
        <div className="flex flex-wrap gap-2">
          {otherTeams.map((other) => (
            <Link
              key={other.slug}
              href={`/team/${other.slug}`}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-mars-orange/50 text-[11px] font-mono uppercase tracking-wider text-white/70 hover:text-white transition-all"
            >
              {other.name} →
            </Link>
          ))}
        </div>
      </section>

      {/* Profile Modal */}
      <MemberModal member={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
