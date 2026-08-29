"use client";

import { useEffect, useState, useRef, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  UserRound, 
  Camera, 
  Mail, 
  Phone, 
  Shield, 
  Award, 
  Crown, 
  Lock, 
  Check, 
  AlertCircle, 
  Save, 
  ExternalLink,
  ArrowLeft
} from "lucide-react";

type UserProfile = {
  name: string;
  email: string;
  studentId: string;
  mobile: string;
  linkedin: string;
  profilePicUrl: string;
  subTeam: string;
  memberType: string;
  position: string;
  role: string;
  status: string;
};

export function ProfileEditor() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (!data.user) {
          router.push("/login");
          return;
        }
        setProfile(data.user);
        setName(data.user.name || "");
        setMobile(data.user.mobile || "");
        setLinkedin(data.user.linkedin || "");
        setPreviewUrl(data.user.profilePicUrl || null);
        setLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setNotice({ type: "error", text: "Please select a JPG, PNG, or WebP image." });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setNotice({ type: "error", text: "Image must be 2MB or smaller." });
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setNotice(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotice(null);

    if (newPassword && newPassword.length < 8) {
      setNotice({ type: "error", text: "New password must be at least 8 characters." });
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setNotice({ type: "error", text: "New passwords do not match." });
      return;
    }

    if (newPassword && !currentPassword) {
      setNotice({ type: "error", text: "Current password is required to change password." });
      return;
    }

    setSaving(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("mobile", mobile);
    formData.append("linkedin", linkedin);

    if (selectedFile) {
      formData.append("profilePicture", selectedFile);
    }

    if (newPassword) {
      formData.append("currentPassword", currentPassword);
      formData.append("newPassword", newPassword);
    }

    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        body: formData,
      });
      const data = await res.json();
      setSaving(false);

      if (!res.ok) {
        setNotice({ type: "error", text: data.error || "Failed to update profile." });
        return;
      }

      setProfile(data.user);
      setPreviewUrl(data.user.profilePicUrl || null);
      setSelectedFile(null);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setNotice({ type: "success", text: "Your profile has been updated successfully!" });

      // Refresh route so changes reflect globally
      router.refresh();
    } catch (err) {
      setSaving(false);
      setNotice({ type: "error", text: "An error occurred while saving your profile." });
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-8 h-8 rounded-full border-2 border-mars-orange border-t-transparent animate-spin mb-3" />
        <p className="font-mono text-xs uppercase tracking-widest text-white/50">
          Loading your personnel file…
        </p>
      </div>
    );
  }

  if (!profile) return null;

  const isTeamLead = profile.position === "Team Lead";
  const isSubTeamLead = profile.position === "Sub-team Lead";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Profile Summary Card */}
      <div className="rounded-3xl border border-white/10 bg-[#080b12] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-mars-orange/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {/* Avatar with Quick-Upload Trigger */}
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden border-2 border-mars-orange/50 shadow-[0_0_25px_rgba(193,68,14,0.3)] bg-black/80">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-white/40">
                  <UserRound size={48} />
                </div>
              )}

              {/* Hover overlay with camera icon */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1">
                <Camera size={22} className="text-mars-orange" />
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Change</span>
              </div>
            </div>

            <button
              type="button"
              className="absolute bottom-0 right-0 p-2 rounded-full bg-mars-orange text-black font-bold shadow-lg hover:brightness-110 transition-transform active:scale-95"
              aria-label="Upload photo"
            >
              <Camera size={14} />
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleImageChange}
          />

          {/* Identity & Badges */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                isTeamLead 
                  ? "bg-mars-orange/20 border border-mars-orange/50 text-mars-orange"
                  : isSubTeamLead 
                  ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300"
                  : "bg-white/10 border border-white/15 text-white"
              }`}>
                {isTeamLead ? <Crown size={12} /> : isSubTeamLead ? <Award size={12} /> : null}
                {profile.position}
              </span>

              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono uppercase">
                {profile.subTeam}
              </span>

              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                {profile.status}
              </span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
              {profile.name}
            </h2>

            <p className="font-mono text-xs text-white/60 mt-1">
              Student ID: <span className="text-mars-orange font-bold">{profile.studentId}</span> · {profile.email}
            </p>

            <p className="font-sans text-xs text-white/50 mt-2 max-w-md">
              Update your contact details, active mobile number, LinkedIn profile link, or upload an updated member photo.
            </p>
          </div>
        </div>
      </div>

      {/* Notice Banner */}
      {notice && (
        <div className={`p-4 rounded-2xl border flex items-center gap-3 text-sm ${
          notice.type === "success" 
            ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-200" 
            : "border-red-500/40 bg-red-950/30 text-red-200"
        }`}>
          {notice.type === "success" ? <Check size={18} className="text-emerald-400 shrink-0" /> : <AlertCircle size={18} className="text-red-400 shrink-0" />}
          <span>{notice.text}</span>
        </div>
      )}

      {/* Profile Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-3xl border border-white/10 bg-[#080b12] p-6 sm:p-8 shadow-xl space-y-6">
          <h3 className="font-heading text-lg font-bold text-white border-b border-white/10 pb-3">
            Personal & Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-mars-orange focus:ring-1 focus:ring-mars-orange/50"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+880 1700 000000"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-mars-orange focus:ring-1 focus:ring-mars-orange/50"
              />
            </div>

            {/* LinkedIn Profile */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full rounded-xl border border-white/15 bg-black/40 pl-10 pr-3.5 py-2.5 text-sm text-white outline-none transition focus:border-mars-orange focus:ring-1 focus:ring-mars-orange/50"
                />
                <svg
                  className="w-4 h-4 fill-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <p className="text-[11px] text-white/40 mt-1 font-mono">
                Must be a valid profile link on linkedin.com
              </p>
            </div>
          </div>
        </div>

        {/* Academic & Division Information (Read Only) */}
        <div className="rounded-3xl border border-white/10 bg-[#080b12] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-heading text-lg font-bold text-white">
              Academic & Division Identity
            </h3>
            <span className="text-xs text-white/40 flex items-center gap-1 font-mono">
              <Lock size={12} /> Managed by Admin
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-1.5">
                Student ID
              </label>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5 text-sm text-white/80 font-mono flex items-center justify-between">
                <span>{profile.studentId}</span>
                <Lock size={13} className="text-white/30" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-1.5">
                University Email
              </label>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5 text-sm text-white/80 font-mono flex items-center justify-between">
                <span className="truncate">{profile.email}</span>
                <Lock size={13} className="text-white/30" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-1.5">
                Assigned Sub-team
              </label>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5 text-sm text-white/80 font-mono">
                {profile.subTeam}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-1.5">
                Position Designation
              </label>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5 text-sm text-white/80 font-mono">
                {profile.position}
              </div>
            </div>
          </div>
        </div>

        {/* Security & Password (Optional) */}
        <div className="rounded-3xl border border-white/10 bg-[#080b12] p-6 sm:p-8 shadow-xl space-y-6">
          <h3 className="font-heading text-lg font-bold text-white border-b border-white/10 pb-3">
            Change Account Password (Optional)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-mars-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-mars-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-mars-orange"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Team Directory</span>
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-mars-red to-mars-orange hover:from-mars-orange hover:to-mars-red px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl transition active:scale-95 disabled:opacity-60 cursor-pointer"
          >
            <Save size={15} />
            <span>{saving ? "Saving Changes…" : "Save Profile Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
