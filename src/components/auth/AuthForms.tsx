"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MEMBER_TYPES, POSITIONS } from "@/lib/member-options";
import { SUB_TEAMS } from "@/lib/subteams";
import { AlertCircle, CheckCircle2, Upload, Loader2, ArrowRight } from "lucide-react";

const fieldClass = "mt-1.5 w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-slate-100 outline-none transition focus:border-mars-orange focus:ring-1 focus:ring-mars-orange/50 disabled:opacity-50 disabled:cursor-not-allowed";

export function RegisterForm() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImageError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setImagePreview(null);
      setImageFile(null);
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setImageError("Please select a valid JPG, PNG, or WebP image.");
      setImagePreview(null);
      setImageFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setImageError(`Image size is ${sizeMb} MB. Maximum allowed size is 10 MB.`);
      setImagePreview(null);
      setImageFile(null);
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    if (!name || name.length < 2) {
      return setMessage("Please enter your full name (minimum 2 characters).");
    }

    const studentId = String(formData.get("studentId") ?? "").trim();
    if (!/^\d{7}$/.test(studentId)) {
      return setMessage("Student ID must be exactly a 7-digit university roll number (e.g. 1908001).");
    }

    const email = String(formData.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setMessage("Please enter a valid university email address.");
    }

    const mobile = String(formData.get("mobile") ?? "").trim();
    if (mobile.length < 7 || mobile.length > 25) {
      return setMessage("Please enter a valid contact phone number (7 to 25 digits).");
    }

    if (!imageFile && (!formData.get("profilePicture") || (formData.get("profilePicture") as File).size === 0)) {
      return setMessage("Please select and upload a profile picture.");
    }

    if (imageFile && imageFile.size > 10 * 1024 * 1024) {
      const sizeMb = (imageFile.size / (1024 * 1024)).toFixed(1);
      return setMessage(`Profile picture is ${sizeMb} MB. Maximum size is 10 MB.`);
    }

    const memberType = String(formData.get("memberType") ?? "");
    if (!memberType) {
      return setMessage("Please select whether you are a Current Student or Alumni.");
    }

    const subTeam = String(formData.get("subTeam") ?? "");
    if (!subTeam) {
      return setMessage("Please select your sub-team division.");
    }

    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password.length < 8) {
      return setMessage("Password must be at least 8 characters long.");
    }

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match. Please re-enter both password fields.");
    }

    // Attach verified image file
    if (imageFile) {
      formData.set("profilePicture", imageFile);
    }

    setPending(true);

    try {
      const response = await fetch("/api/auth/register", { 
        method: "POST", 
        body: formData 
      });
      
      const data = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        const errorText = data.error || data.message || `Server returned error (${response.status}: ${response.statusText}).`;
        setMessage(errorText);
        setPending(false);
        return;
      }

      setMessage(data.message || "Registration received. Your account is pending admin approval.");
      setDone(true);
    } catch (err: unknown) {
      console.error("Registration error:", err);
      const networkMsg = err instanceof Error ? err.message : "Connection failed";
      setMessage(`Network error: ${networkMsg}. Please check your internet connection and try again.`);
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-6 sm:p-8 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center gap-3 text-emerald-400 mb-2">
          <CheckCircle2 size={24} />
          <h3 className="font-heading text-xl font-bold text-emerald-300">Registration Submitted Successfully</h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">{message}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:brightness-110 active:scale-95"
          >
            <span>Proceed to Sign In</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-xs font-mono uppercase tracking-wider text-slate-300 transition hover:bg-white/10"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      {/* Exact Error Alert Box */}
      {message && !done && (
        <div className="sm:col-span-2 rounded-xl border border-red-500/50 bg-red-950/40 p-4 text-sm text-red-200 flex items-start gap-3 backdrop-blur-sm shadow-xl shadow-red-950/40 animate-in fade-in slide-in-from-top-2 duration-200">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold text-red-300 text-xs uppercase tracking-wider block mb-1">
              Registration Incomplete
            </span>
            <p className="text-xs sm:text-sm text-red-100 leading-relaxed font-sans">{message}</p>
          </div>
        </div>
      )}

      {/* Loading Progress Banner */}
      {pending && (
        <div className="sm:col-span-2 rounded-2xl border border-mars-orange/40 bg-mars-orange/10 backdrop-blur-md p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top-1 duration-300">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
            <div className="absolute h-full w-full rounded-full border-2 border-mars-orange/30 animate-ping opacity-60" />
            <div className="h-6 w-6 rounded-full border-2 border-mars-orange border-t-transparent animate-spin" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Transmitting Registration Details…
            </p>
            <p className="text-[11px] text-slate-300/80 font-mono mt-0.5">
              Uploading profile image to ImageKit CDN & verifying credentials
            </p>
          </div>
        </div>
      )}

      {/* Form Fields without Placeholders */}
      <Field 
        label="Full Name" 
        name="name" 
        required 
        disabled={pending} 
      />
      
      <Field 
        label="Student ID (7 digits)" 
        name="studentId" 
        type="text" 
        inputMode="numeric" 
        pattern="[0-9]{7}" 
        minLength={7} 
        maxLength={7} 
        title="Student ID must be exactly a 7-digit number" 
        required 
        disabled={pending} 
      />
      
      <Field 
        label="University Email" 
        name="email" 
        type="email" 
        required 
        disabled={pending} 
      />
      
      <Field 
        label="Mobile Number" 
        name="mobile" 
        type="tel" 
        required 
        disabled={pending} 
      />

      {/* Profile Picture with Preview & 10MB limit */}
      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
          Profile Picture
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-white/15 bg-black/40 p-4">
          {imagePreview ? (
            <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden border-2 border-mars-orange shadow-md">
              <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400">
              <Upload size={22} />
            </div>
          )}
          <div className="flex-1 w-full">
            <input
              ref={fileInputRef}
              name="profilePicture"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              disabled={pending}
              required={!imageFile}
              className="block w-full text-xs text-slate-300 file:mr-3 file:border-0 file:rounded-lg file:bg-mars-orange/20 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-mars-orange hover:file:bg-mars-orange/30 file:cursor-pointer cursor-pointer"
            />
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
              <span>JPG, PNG, or WebP</span>
              <span className="font-mono text-mars-orange font-semibold">Maximum file size: 10 MB</span>
            </div>
            {imageFile && (
              <p className="mt-1 text-[11px] font-mono text-emerald-400">
                ✓ Ready: {imageFile.name} ({(imageFile.size / (1024 * 1024)).toFixed(2)} MB)
              </p>
            )}
            {imageError && (
              <p className="mt-1 text-xs text-red-300 font-medium flex items-center gap-1.5">
                <AlertCircle size={14} className="text-red-400 shrink-0" />
                {imageError}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Student / Alumni Status */}
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
        Student / Alumni Status
        <select 
          name="memberType" 
          required 
          defaultValue="" 
          disabled={pending} 
          className={fieldClass}
        >
          <option value="" disabled className="bg-slate-900">Select Status</option>
          {MEMBER_TYPES.map((type) => (
            <option key={type} value={type} className="bg-slate-900">{type}</option>
          ))}
        </select>
      </label>
      
      {/* Sub-team */}
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
        Sub-team
        <select 
          name="subTeam" 
          required 
          defaultValue="" 
          disabled={pending} 
          className={fieldClass}
        >
          <option value="" disabled className="bg-slate-900">Select Team Division</option>
          {SUB_TEAMS.map((team) => (
            <option key={team} value={team} className="bg-slate-900">{team}</option>
          ))}
        </select>
      </label>
      
      {/* Position Role */}
      <label className="sm:col-span-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
        Position Designation
        <select 
          name="position" 
          required 
          defaultValue="Member" 
          disabled={pending} 
          className={fieldClass}
        >
          {POSITIONS.map((position) => (
            <option key={position} value={position} className="bg-slate-900">{position}</option>
          ))}
        </select>
      </label>
      
      {/* LinkedIn URL */}
      <div className="sm:col-span-2">
        <Field 
          label="LinkedIn Profile URL (Optional)" 
          name="linkedin" 
          type="url" 
          disabled={pending} 
        />
      </div>
      
      {/* Passwords */}
      <Field 
        label="Password" 
        name="password" 
        type="password" 
        minLength={8} 
        required 
        disabled={pending} 
      />
      
      <Field 
        label="Confirm Password" 
        name="confirmPassword" 
        type="password" 
        minLength={8} 
        required 
        disabled={pending} 
      />
      
      {/* Submit Button with Animated Loader */}
      <button
        type="submit"
        disabled={pending}
        className="sm:col-span-2 relative mt-3 flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-mars-red to-mars-orange hover:from-mars-orange hover:to-mars-red px-6 py-4 font-sans text-xs font-bold uppercase tracking-wider text-white transition shadow-xl active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        {pending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white shrink-0" />
            <span>Submitting Registration & Uploading Photo…</span>
          </>
        ) : (
          <>
            <span>Submit Registration</span>
            <ArrowRight size={14} />
          </>
        )}
      </button>
      
      <p className="sm:col-span-2 text-center text-sm text-slate-400">
        Already registered?{" "}
        <Link href="/login" className="font-semibold text-mars-orange hover:text-white hover:underline transition">
          Sign In
        </Link>
      </p>
    </form>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });
    const data = await response.json();
    setPending(false);
    if (!response.ok) return setMessage(data.error);
    router.push(data.user.role === "admin" ? "/admin" : "/team");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {message && (
        <p className="rounded-xl border border-red-500/40 bg-red-950/30 p-3.5 text-sm text-red-200">
          {message}
        </p>
      )}
      <Field label="Email address" name="email" type="email" required />
      <Field label="Password" name="password" type="password" required />
      
      <button
        disabled={pending}
        className="mt-2 w-full rounded-xl bg-gradient-to-r from-mars-red to-mars-orange hover:from-mars-orange hover:to-mars-red px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-white transition shadow-lg active:scale-[0.99] disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign In"}
      </button>
      
      <p className="text-center text-sm text-slate-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-mars-orange hover:text-white hover:underline transition">
          Register Here
        </Link>
      </p>
    </form>
  );
}

function Field({ label, className = "", ...props }: React.ComponentProps<"input"> & { label: string }) {
  return (
    <label className={`${className} block text-xs font-semibold uppercase tracking-wider text-slate-300`}>
      {label}
      <input {...props} className={fieldClass} />
    </label>
  );
}
