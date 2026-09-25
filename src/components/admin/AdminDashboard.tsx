"use client";

import { useEffect, useState, useRef } from "react";
import { SUB_TEAMS } from "@/lib/subteams";
import { POSITIONS } from "@/lib/member-options";
import { 
  UserRound, Check, X, Trash2, AlertCircle, Crown, Shield, UserCheck, 
  Award, Calendar, Newspaper, Upload, Plus, ExternalLink, Image as ImageIcon,
  CheckCircle2, Clock, Trophy
} from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  studentId: string;
  mobile: string;
  subTeam: string;
  memberType?: string;
  position: string;
  role: string;
  status: string;
  profilePicUrl?: string;
};

type CompetitionItem = {
  _id: string;
  title: string;
  organizer?: string;
  location: string;
  year: string;
  category: "International" | "National";
  result?: string;
  roverVersion?: string;
  coverPhoto: string;
  description?: string;
  status: "upcoming" | "completed";
};

type EventItem = {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  status: "upcoming" | "completed";
  coverPhoto: string;
  registrationLink?: string;
  caption?: string;
  category?: string;
};

type MediaItem = {
  _id: string;
  title?: string;
  caption?: string;
  imageUrl: string;
  source?: string;
  date?: string;
  category?: string;
};

const memberStatuses = ["pending", "approved", "rejected"];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"members" | "competitions" | "events" | "media">("members");
  
  // Member State
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("pending");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);

  // Events State
  const [events, setEvents] = useState<EventItem[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventSubmitting, setEventSubmitting] = useState(false);
  const eventFormRef = useRef<HTMLFormElement>(null);

  // Media State
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSubmitting, setMediaSubmitting] = useState(false);
  const mediaFormRef = useRef<HTMLFormElement>(null);

  // Competitions State
  const [competitions, setCompetitions] = useState<CompetitionItem[]>([]);
  const [competitionsLoading, setCompetitionsLoading] = useState(false);
  const [competitionSubmitting, setCompetitionSubmitting] = useState(false);
  const competitionFormRef = useRef<HTMLFormElement>(null);

  // Load Members
  const loadMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?status=${filter}`);
      const data = await res.json();
      setUsers(data.users ?? []);
      setNotice(res.ok ? "" : data.error);
    } catch {
      setNotice("Unable to load members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "members") {
      loadMembers();
    }
  }, [filter, activeTab]);

  // Load Events
  const loadEvents = async () => {
    setEventsLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      const all: EventItem[] = [];
      if (data.upcoming && data.upcoming._id) all.push(data.upcoming);
      if (Array.isArray(data.completed)) all.push(...data.completed);
      setEvents(all);
    } catch {
      setNotice("Unable to load events.");
    } finally {
      setEventsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "events") {
      loadEvents();
    }
  }, [activeTab]);

  // Load Media
  const loadMedia = async () => {
    setMediaLoading(true);
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      setMediaItems(data.items ?? []);
    } catch {
      setNotice("Unable to load media items.");
    } finally {
      setMediaLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "media") {
      loadMedia();
    }
  }, [activeTab]);

  // Member Action Handlers
  async function patchUser(id: string, update: Record<string, string>) {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });
    const data = await res.json();
    setNotice(data.message || data.error || "Member updated.");
    if (res.ok) loadMembers();
  }

  async function setPosition(id: string, newPosition: string) {
    const role = newPosition === "Team Lead" || newPosition === "Sub-team Lead" ? "lead" : "member";
    await patchUser(id, { position: newPosition, role });
  }

  async function removeUser(id: string) {
    if (!window.confirm("Remove this member from the database?")) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    setNotice(data.message || data.error);
    if (res.ok) loadMembers();
  }

  // Event Action Handlers
  async function handleCreateEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEventSubmitting(true);
    setNotice("");
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create event");
      setNotice("Event created successfully!");
      if (eventFormRef.current) eventFormRef.current.reset();
      loadEvents();
    } catch (err: any) {
      setNotice(err.message || "Failed to create event.");
    } finally {
      setEventSubmitting(false);
    }
  }

  async function toggleEventStatus(event: EventItem) {
    const newStatus = event.status === "upcoming" ? "completed" : "upcoming";
    try {
      const res = await fetch(`/api/events/${event._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setNotice(`Event status changed to ${newStatus}.`);
        loadEvents();
      } else {
        const data = await res.json();
        setNotice(data.error || "Could not update status.");
      }
    } catch {
      setNotice("Status update failed.");
    }
  }

  async function removeEvent(id: string) {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      const data = await res.json();
      setNotice(data.message || data.error);
      if (res.ok) loadEvents();
    } catch {
      setNotice("Delete failed.");
    }
  }

  // Media Action Handlers
  async function handleUploadMedia(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMediaSubmitting(true);
    setNotice("");
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload media clipping");
      setNotice("Media clipping uploaded successfully!");
      if (mediaFormRef.current) mediaFormRef.current.reset();
      loadMedia();
    } catch (err: any) {
      setNotice(err.message || "Failed to upload media clipping.");
    } finally {
      setMediaSubmitting(false);
    }
  }

  async function removeMedia(id: string) {
    if (!window.confirm("Delete this media clipping from the website?")) return;
    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      const data = await res.json();
      setNotice(data.message || data.error);
      if (res.ok) loadMedia();
    } catch {
      setNotice("Delete failed.");
    }
  }

  // Competitions Handlers
  const loadCompetitions = async () => {
    setCompetitionsLoading(true);
    try {
      const res = await fetch("/api/competitions");
      const data = await res.json();
      setCompetitions(data.items ?? []);
    } catch {
      setNotice("Unable to load competitions.");
    } finally {
      setCompetitionsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "competitions") {
      loadCompetitions();
    }
  }, [activeTab]);

  async function handleCreateCompetition(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCompetitionSubmitting(true);
    setNotice("");
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/competitions", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add competition");
      setNotice("Competition published successfully! It now appears on the /competitions page.");
      if (competitionFormRef.current) competitionFormRef.current.reset();
      loadCompetitions();
    } catch (err: any) {
      setNotice(err.message || "Failed to add competition.");
    } finally {
      setCompetitionSubmitting(false);
    }
  }

  async function removeCompetition(id: string) {
    if (!window.confirm("Delete this competition from the website?")) return;
    try {
      const res = await fetch(`/api/competitions/${id}`, { method: "DELETE" });
      const data = await res.json();
      setNotice(data.message || data.error);
      if (res.ok) loadCompetitions();
    } catch {
      setNotice("Delete failed.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Main Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("members")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === "members"
              ? "bg-gradient-to-r from-mars-red to-mars-orange text-white font-bold shadow-lg"
              : "border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.08]"
          }`}
        >
          <UserCheck size={14} />
          <span>Members Roster</span>
        </button>

        <button
          onClick={() => setActiveTab("competitions")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === "competitions"
              ? "bg-gradient-to-r from-mars-red to-mars-orange text-white font-bold shadow-lg"
              : "border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.08]"
          }`}
        >
          <Trophy size={14} />
          <span>Competitions Manager</span>
        </button>

        <button
          onClick={() => setActiveTab("events")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === "events"
              ? "bg-gradient-to-r from-mars-red to-mars-orange text-white font-bold shadow-lg"
              : "border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.08]"
          }`}
        >
          <Calendar size={14} />
          <span>Events Manager</span>
        </button>

        <button
          onClick={() => setActiveTab("media")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === "media"
              ? "bg-gradient-to-r from-mars-red to-mars-orange text-white font-bold shadow-lg"
              : "border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.08]"
          }`}
        >
          <Newspaper size={14} />
          <span>Media & Press Manager</span>
        </button>
      </div>

      {/* Notice Banner */}
      {notice && (
        <div className="flex items-center justify-between gap-2 rounded-xl border border-mars-orange/30 bg-mars-orange/10 p-3.5 text-xs text-white/90">
          <div className="flex items-center gap-2">
            <AlertCircle size={15} className="text-mars-orange shrink-0" />
            <span>{notice}</span>
          </div>
          <button onClick={() => setNotice("")} className="text-white/50 hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* TAB 1: MEMBERS DIRECTORY */}
      {activeTab === "members" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex flex-wrap gap-2">
              {memberStatuses.map((status) => (
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

          {loading ? (
            <div className="py-12 text-center text-xs font-mono uppercase tracking-widest text-white/40">
              Loading roster data…
            </div>
          ) : users.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-black/30 p-12 text-center">
              <p className="font-heading text-lg text-white/70">No {filter} registrations found</p>
              <p className="mt-1 text-xs text-white/40">When new submissions arrive, they will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#080b12] shadow-xl">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="bg-black/60 font-mono text-[10px] uppercase tracking-widest text-white/50 border-b border-white/10">
                  <tr>
                    <th className="p-4">Member Info & Student ID</th>
                    <th className="p-4">Sub-team Assignment</th>
                    <th className="p-4">Leadership & Position</th>
                    <th className="p-4">Roster Shift</th>
                    <th className="p-4">System Role</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((user) => {
                    const isTeamLead = user.position === "Team Lead";
                    const isSubTeamLead = user.position === "Sub-team Lead";
                    const isAlumni = user.memberType === "Alumni";

                    return (
                      <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/15 bg-black/60 shrink-0">
                              {user.profilePicUrl ? (
                                <img src={user.profilePicUrl} alt="" className="h-full w-full object-cover" />
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
                                {isAlumni && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[9px] font-mono font-bold uppercase">
                                    Alumni
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

                        <td className="p-4">
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                            Division
                          </label>
                          <select
                            value={user.subTeam}
                            onChange={(e) => patchUser(user._id, { subTeam: e.target.value })}
                            className="w-full max-w-[200px] rounded-lg border border-white/15 bg-black/60 px-2.5 py-1.5 text-xs text-white outline-none focus:border-mars-orange cursor-pointer"
                          >
                            {SUB_TEAMS.map((team) => (
                              <option key={team} value={team} className="bg-slate-900">
                                {team}
                              </option>
                            ))}
                          </select>
                        </td>

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

                        {/* Member Roster Shift (Current Student vs Alumni) */}
                        <td className="p-4">
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                            Roster Page
                          </label>
                          <select
                            value={user.memberType || "Current Student"}
                            onChange={(e) => patchUser(user._id, { memberType: e.target.value })}
                            className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold outline-none cursor-pointer ${
                              isAlumni
                                ? "border-purple-500/50 bg-purple-950/40 text-purple-300"
                                : "border-emerald-500/40 bg-emerald-950/30 text-emerald-300"
                            }`}
                          >
                            <option value="Current Student" className="bg-slate-900 text-emerald-300 font-medium">
                              Current Team Page
                            </option>
                            <option value="Alumni" className="bg-slate-900 text-purple-300 font-medium">
                              Shift to Alumni Page
                            </option>
                          </select>
                        </td>

                        <td className="p-4">
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">
                            Access Role
                          </label>
                          <select
                            value={user.role}
                            onChange={(e) => patchUser(user._id, { role: e.target.value })}
                            className="rounded-lg border border-white/15 bg-black/60 px-2.5 py-1.5 text-xs text-white outline-none focus:border-mars-orange cursor-pointer"
                          >
                            <option value="member" className="bg-slate-900">member</option>
                            <option value="lead" className="bg-slate-900">lead</option>
                            <option value="admin" className="bg-slate-900">admin</option>
                          </select>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {user.status === "pending" && (
                              <>
                                <button
                                  onClick={() => patchUser(user._id, { status: "approved" })}
                                  className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/50 bg-emerald-500/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300 hover:bg-emerald-500/25 transition cursor-pointer"
                                  title="Approve Member"
                                >
                                  <Check size={12} />
                                  Approve
                                </button>
                                <button
                                  onClick={() => patchUser(user._id, { status: "rejected" })}
                                  className="inline-flex items-center gap-1 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-300 hover:bg-red-500/20 transition cursor-pointer"
                                  title="Reject Member"
                                >
                                  <X size={12} />
                                  Reject
                                </button>
                              </>
                            )}

                            <button
                              onClick={() => removeUser(user._id)}
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
      )}

      {/* TAB 2: COMPETITIONS MANAGER */}
      {activeTab === "competitions" && (
        <div className="space-y-8">
          {/* Create New Competition Form */}
          <div className="rounded-2xl border border-white/15 bg-[#080b12] p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={18} className="text-mars-orange" />
              <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                Create New Rover Competition
              </h3>
            </div>
            <p className="text-xs text-white/50 mb-6">
              When created, this competition entry will appear directly on the <strong className="text-mars-orange">/competitions</strong> page.
            </p>

            <form ref={competitionFormRef} onSubmit={handleCreateCompetition} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Competition Title *</label>
                  <input
                    name="title"
                    required
                    placeholder="e.g. University Rover Challenge (URC)"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Category *</label>
                  <select
                    name="category"
                    defaultValue="International"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange cursor-pointer"
                  >
                    <option value="International" className="bg-slate-900 text-white">
                      International (URC, ARC, ERC, IRDC, IRC)
                    </option>
                    <option value="National" className="bg-slate-900 text-white">
                      National (National Tech Fest, IUT Robofest, BUET Fest)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Year / Season *</label>
                  <input
                    name="year"
                    required
                    placeholder="e.g. 2025 or 2024–2026"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Location / Venue *</label>
                  <input
                    name="location"
                    required
                    placeholder="e.g. Utah, USA or Rajshahi, Bangladesh"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Result / Award Standing</label>
                  <input
                    name="result"
                    placeholder="e.g. 1st in Bangladesh · 11th Worldwide"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Rover Model / Iteration</label>
                  <input
                    name="roverVersion"
                    placeholder="e.g. Ogrodoot MKI4"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Host / Organizing Body</label>
                  <input
                    name="organizer"
                    placeholder="e.g. The Mars Society / UKET"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Status</label>
                  <select
                    name="status"
                    defaultValue="completed"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange cursor-pointer"
                  >
                    <option value="completed" className="bg-slate-900 text-white">Completed Campaign</option>
                    <option value="upcoming" className="bg-slate-900 text-mars-orange">Upcoming Challenge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Cover Image (JPG, PNG, WebP) *</label>
                  <input
                    type="file"
                    name="coverPhoto"
                    accept="image/png,image/jpeg,image/webp"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white/80 file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-mars-orange file:text-white hover:file:bg-mars-red cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5">Brief Summary</label>
                <textarea
                  name="description"
                  rows={2}
                  placeholder="Short, crisp summary of the competition campaign..."
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={competitionSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-mars-red to-mars-orange px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:shadow-mars-orange/20 transition disabled:opacity-50 cursor-pointer"
                >
                  <Plus size={15} />
                  <span>{competitionSubmitting ? "Uploading..." : "Publish Competition"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Existing Competitions List */}
          <div className="rounded-2xl border border-white/15 bg-[#080b12] p-6 shadow-xl">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white/80 mb-4">
              Published Competitions ({competitions.length})
            </h4>

            {competitionsLoading ? (
              <p className="text-xs text-white/50 py-8 text-center font-mono">Loading competitions...</p>
            ) : competitions.length === 0 ? (
              <p className="text-xs text-white/40 py-8 text-center font-mono">No competitions published yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {competitions.map((comp) => (
                  <div
                    key={comp._id}
                    className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 relative group"
                  >
                    <div className="space-y-2.5">
                      <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-black">
                        <img
                          src={comp.coverPhoto}
                          alt={comp.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 rounded-md bg-black/70 backdrop-blur-sm px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                          {comp.category}
                        </span>
                        <span className="absolute top-2 right-2 rounded-md bg-black/70 backdrop-blur-sm px-2 py-0.5 font-mono text-[9px] text-white/80">
                          {comp.year}
                        </span>
                      </div>

                      <div>
                        <h5 className="font-heading font-bold text-sm text-white line-clamp-1">
                          {comp.title}
                        </h5>
                        <p className="text-[11px] text-white/50 line-clamp-1">{comp.location}</p>
                      </div>

                      {comp.result && (
                        <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-mars-orange bg-mars-orange/10 px-2 py-0.5 rounded border border-mars-orange/20">
                          <Trophy size={10} />
                          <span>{comp.result}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                      <span className="font-mono text-[10px] text-white/40">{comp.roverVersion || "Rover"}</span>
                      <button
                        onClick={() => removeCompetition(comp._id)}
                        className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-medium cursor-pointer"
                        title="Delete competition"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: EVENTS MANAGER */}
      {activeTab === "events" && (
        <div className="space-y-8">
          {/* Create New Event Form */}
          <div className="rounded-2xl border border-white/15 bg-[#080b12] p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={18} className="text-mars-orange" />
              <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                Create New Event (Seminar / Workshop / Outreach)
              </h3>
            </div>
            <p className="text-xs text-white/50 mb-6">
              When created, this event will appear directly on the <strong className="text-mars-orange">/events</strong> page.
            </p>

            <form ref={eventFormRef} onSubmit={handleCreateEvent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Event Title *</label>
                  <input
                    name="title"
                    required
                    placeholder="e.g. Mars Rover Engineering Seminar & Recruitment Workshop"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Event Status *</label>
                  <select
                    name="status"
                    defaultValue="upcoming"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange cursor-pointer"
                  >
                    <option value="upcoming" className="bg-slate-900 text-mars-orange font-bold">
                      Upcoming (Featured at Top)
                    </option>
                    <option value="completed" className="bg-slate-900 text-white">
                      Completed (Past Events Grid)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Date *</label>
                  <input
                    name="date"
                    required
                    placeholder="e.g. October 18–20, 2026"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Location *</label>
                  <input
                    name="location"
                    required
                    placeholder="e.g. RUET Mars Analog Field, Rajshahi"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Registration Link</label>
                  <input
                    name="registrationLink"
                    placeholder="e.g. https://forms.gle/..."
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Category</label>
                  <input
                    name="category"
                    defaultValue="Field Camp"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5">Description *</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  placeholder="Detailed description of the workshop, competition, or field trial..."
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5">Short Caption (optional)</label>
                <input
                  name="caption"
                  placeholder="Brief 1-line caption for grids and cards"
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">
                    Cover Photo Upload (ImageKit)
                  </label>
                  <input
                    name="coverPhoto"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white/80 file:mr-3 file:rounded-lg file:border-0 file:bg-mars-orange/20 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-mars-orange cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">
                    Or Cover Photo Path / URL
                  </label>
                  <input
                    name="coverPhotoUrl"
                    placeholder="e.g. /photots/mars_rover.jpg"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={eventSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-mars-red to-mars-orange px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:brightness-110 transition disabled:opacity-50 cursor-pointer"
                >
                  <Upload size={14} />
                  <span>{eventSubmitting ? "Uploading & Saving..." : "Publish Event"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Existing Events List */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
              Published Events ({events.length})
            </h3>

            {eventsLoading ? (
              <div className="py-8 text-center text-xs font-mono text-white/40">Loading events...</div>
            ) : events.length === 0 ? (
              <p className="text-xs text-white/40">No events found in database.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {events.map((ev) => (
                  <div
                    key={ev._id}
                    className="rounded-2xl border border-white/10 bg-[#080b12] p-4 flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black mb-3">
                        <img src={ev.coverPhoto} alt="" className="h-full w-full object-cover" />
                        <span
                          className={`absolute top-2 left-2 rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                            ev.status === "upcoming"
                              ? "bg-mars-orange text-black font-extrabold"
                              : "bg-white/20 text-white backdrop-blur-md"
                          }`}
                        >
                          {ev.status}
                        </span>
                      </div>

                      <h4 className="font-heading font-bold text-sm text-white line-clamp-1">{ev.title}</h4>
                      <p className="text-xs font-mono text-mars-orange mt-0.5">{ev.date}</p>
                      <p className="text-xs text-white/60 line-clamp-2 mt-1">{ev.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => toggleEventStatus(ev)}
                        className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                      >
                        Set to {ev.status === "upcoming" ? "completed" : "upcoming"}
                      </button>

                      <button
                        onClick={() => removeEvent(ev._id)}
                        className="p-1.5 rounded-lg text-white/40 hover:text-red-400 transition cursor-pointer"
                        title="Delete event"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: MEDIA & PRESS MANAGER */}
      {activeTab === "media" && (
        <div className="space-y-8">
          {/* Upload Newspaper Clipping Form */}
          <div className="rounded-2xl border border-white/15 bg-[#080b12] p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Upload size={18} className="text-mars-orange" />
              <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                Upload Real Newspaper Clipping or Press Feature
              </h3>
            </div>

            <form ref={mediaFormRef} onSubmit={handleUploadMedia} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Article Title / Headline</label>
                  <input
                    name="title"
                    placeholder="e.g. RUET Rover Team Ogrodoot Wins IRDC"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Source / Newspaper Name</label>
                  <input
                    name="source"
                    placeholder="e.g. The Daily Star, Prothom Alo, Dhaka Tribune"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Publication Date</label>
                  <input
                    name="date"
                    placeholder="e.g. November 2024"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5">
                  Small, Optional Caption below Image
                </label>
                <input
                  name="caption"
                  placeholder="e.g. Front-page coverage on youth robotics engineering at RUET"
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">
                    Image File Upload (Newspaper scan / Photo via ImageKit) *
                  </label>
                  <input
                    name="image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white/80 file:mr-3 file:rounded-lg file:border-0 file:bg-mars-orange/20 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-mars-orange cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">
                    Or Direct Image URL / Path
                  </label>
                  <input
                    name="imageUrl"
                    placeholder="e.g. /photots/Team_Ogrodoot_Cover.png"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white outline-none focus:border-mars-orange"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={mediaSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-mars-red to-mars-orange px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:brightness-110 transition disabled:opacity-50 cursor-pointer"
                >
                  <Upload size={14} />
                  <span>{mediaSubmitting ? "Uploading..." : "Upload Clipping to Website"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Existing Media Items */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
              Current Media Clippings ({mediaItems.length})
            </h3>

            {mediaLoading ? (
              <div className="py-8 text-center text-xs font-mono text-white/40">Loading media items...</div>
            ) : mediaItems.length === 0 ? (
              <p className="text-xs text-white/40">No media clippings found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {mediaItems.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-2xl border border-white/10 bg-[#080b12] p-3 flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black mb-2.5">
                        <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                      </div>
                      {item.source && (
                        <p className="font-mono text-[10px] text-mars-orange font-bold uppercase">{item.source}</p>
                      )}
                      <h4 className="font-heading font-bold text-xs text-white line-clamp-1 mt-0.5">{item.title}</h4>
                      {item.caption && (
                        <p className="text-[11px] text-white/60 line-clamp-2 mt-1">{item.caption}</p>
                      )}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] text-white/40">{item.date}</span>
                      <button
                        onClick={() => removeMedia(item._id)}
                        className="p-1 text-white/40 hover:text-red-400 transition cursor-pointer"
                        title="Delete clipping"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
