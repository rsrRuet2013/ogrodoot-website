"use client";

import { useEffect, useState } from "react";
import { SUB_TEAMS } from "@/lib/subteams";
import { POSITIONS } from "@/lib/member-options";
import { UserRound, Check, X, Trash2, AlertCircle, Crown, Shield, UserCheck, Award } from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  studentId: string;
  mobile: string;
  subTeam: string;
  position: string;
  role: string;
  status: string;
  profilePicUrl?: string;
};

const statuses = ["pending", "approved", "rejected"];

export function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("pending");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/users?status=${filter}`);
    const data = await res.json();
    setUsers(data.users ?? []);
    setNotice(res.ok ? "" : data.error);
    setLoading(false);
  };

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/admin/users?status=${filter}`)
      .then(async (res) => ({ res, data: await res.json() }))
      .then(({ res, data }) => {
        if (!cancelled) {
          setUsers(data.users ?? []);
          setNotice(res.ok ? "" : data.error);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setNotice("Unable to load members.");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [filter]);

  async function patch(id: string, update: Record<string, string>) {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });
    const data = await res.json();
    setNotice(data.message || data.error || "Member updated.");
    if (res.ok) load();
  }

  async function setPosition(id: string, newPosition: string) {
    const role = newPosition === "Team Lead" || newPosition === "Sub-team Lead" ? "lead" : "member";
    await patch(id, { position: newPosition, role });
  }

  async function remove(id: string) {
    if (!window.confirm("Remove this member from the database?")) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    setNotice(data.message || data.error);
    if (res.ok) load();
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-xl px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                filter === status
                  ? "bg-mars-orange/15 border border-mars-orange/50 text-mars-orange font-bold shadow-sm"
                  : "border border-white/10 text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {status} ({filter === status ? users.length : ""})
            </button>
          ))}
        </div>

        <span className="font-mono text-xs text-white/40">
          Showing {users.length} {filter} records
        </span>
      </div>

      {/* Notice Banner */}
      {notice && (
        <div className="flex items-center gap-2 rounded-xl border border-mars-orange/30 bg-mars-orange/10 p-3.5 text-xs text-white/90">
          <AlertCircle size={15} className="text-mars-orange shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Main Table or Loading/Empty State */}
      {loading ? (
        <div className="py-12 text-center text-xs font-mono uppercase tracking-widest text-white/40">
          Loading roster data…
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-black/30 p-12 text-center">
          <p className="font-heading text-lg text-white/70">No {filter} registrations found</p>
          <p className="mt-1 text-xs text-white/40">
            When new submissions arrive, they will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#080b12] shadow-xl">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-black/60 font-mono text-[10px] uppercase tracking-widest text-white/50 border-b border-white/10">
              <tr>
                <th className="p-4">Member Info & Student ID</th>
                <th className="p-4">Sub-team Assignment</th>
                <th className="p-4">Leadership & Position</th>
                <th className="p-4">System Role</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => {
                const isTeamLead = user.position === "Team Lead";
                const isSubTeamLead = user.position === "Sub-team Lead";

                return (
                  <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Member Info */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/15 bg-black/60 shrink-0">
                          {user.profilePicUrl ? (
                            <img
                              src={user.profilePicUrl}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <UserRound size={20} className="absolute inset-0 m-auto text-white/40" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-heading font-bold text-white text-sm">{user.name}</p>
                            {isTeamLead && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-mars-orange/20 border border-mars-orange/50 text-mars-orange text-[9px] font-mono font-extrabold uppercase">
                                <Crown size={10} />
                                Lead
                              </span>
                            )}
                            {isSubTeamLead && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[9px] font-mono font-extrabold uppercase">
                                <Award size={10} />
                                Sub-Lead
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-white/60 font-mono mt-0.5">
                            ID: <span className="text-mars-orange font-bold">{user.studentId}</span> · {user.email}
                          </p>
                          <p className="text-[11px] text-white/40 font-mono">{user.mobile}</p>
                        </div>
                      </div>
                    </td>

                    {/* Sub-team selector */}
                    <td className="p-4">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                        Division
                      </label>
                      <select
                        value={user.subTeam}
                        onChange={(e) => patch(user._id, { subTeam: e.target.value })}
                        className="w-full max-w-[200px] rounded-lg border border-white/15 bg-black/60 px-2.5 py-1.5 text-xs text-white outline-none focus:border-mars-orange cursor-pointer"
                      >
                        {SUB_TEAMS.map((team) => (
                          <option key={team} value={team} className="bg-slate-900">
                            {team}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Leadership & Position Converter */}
                    <td className="p-4 space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40">
                        Leadership Level
                      </label>
                      <select
                        value={user.position}
                        onChange={(e) => setPosition(user._id, e.target.value)}
                        className={`w-full max-w-[190px] rounded-lg border px-2.5 py-1.5 text-xs font-semibold outline-none cursor-pointer ${
                          isTeamLead 
                            ? "border-mars-orange/60 bg-mars-orange/15 text-mars-orange"
                            : isSubTeamLead 
                            ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-300"
                            : "border-white/15 bg-black/60 text-white focus:border-mars-orange"
                        }`}
                      >
                        <option value="Member" className="bg-slate-900 text-white">General Member</option>
                        <option value="Sub-team Lead" className="bg-slate-900 text-cyan-300">Sub-team Lead</option>
                        <option value="Team Lead" className="bg-slate-900 text-mars-orange font-bold">Team Lead (Top Display)</option>
                      </select>
                    </td>

                    {/* System Role */}
                    <td className="p-4">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                        Access Role
                      </label>
                      <select
                        value={user.role}
                        onChange={(e) => patch(user._id, { role: e.target.value })}
                        className="rounded-lg border border-white/15 bg-black/60 px-2.5 py-1.5 text-xs text-white outline-none focus:border-mars-orange cursor-pointer"
                      >
                        <option value="member" className="bg-slate-900">member</option>
                        <option value="lead" className="bg-slate-900">lead</option>
                        <option value="admin" className="bg-slate-900">admin</option>
                      </select>
                    </td>

                    {/* Actions: Approve / Reject / Delete */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.status === "pending" && (
                          <>
                            <button
                              onClick={() => patch(user._id, { status: "approved" })}
                              className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/50 bg-emerald-500/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300 hover:bg-emerald-500/25 transition cursor-pointer"
                              title="Approve Member"
                            >
                              <Check size={12} />
                              Approve
                            </button>
                            <button
                              onClick={() => patch(user._id, { status: "rejected" })}
                              className="inline-flex items-center gap-1 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-300 hover:bg-red-500/20 transition cursor-pointer"
                              title="Reject Member"
                            >
                              <X size={12} />
                              Reject
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => remove(user._id)}
                          className="p-2 rounded-lg border border-white/10 text-white/50 hover:text-red-400 hover:border-red-500/30 hover:bg-red-950/30 transition cursor-pointer"
                          aria-label="Remove member"
                          title="Remove member"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
