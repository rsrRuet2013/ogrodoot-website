"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MEMBER_TYPES, POSITIONS } from "@/lib/member-options";
import { SUB_TEAMS } from "@/lib/subteams";

const fieldClass = "mt-1.5 w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-mars-orange focus:ring-1 focus:ring-mars-orange/50";

export function RegisterForm() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      return setMessage("Passwords do not match.");
    }
    const studentId = String(formData.get("studentId") ?? "").trim();
    if (!/^\d{7}$/.test(studentId)) {
      return setMessage("Student ID must be exactly a 7-digit number (e.g. 1908001).");
    }
    setPending(true);
    setMessage("");
    const response = await fetch("/api/auth/register", { method: "POST", body: formData });
    const data = await response.json();
    setPending(false);
    setMessage(data.message || data.error);
    setDone(response.ok);
  }

  if (done) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-6 sm:p-8">
        <h3 className="font-heading text-xl font-bold text-emerald-300">Registration Submitted</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">{message}</p>
        <Link
          href="/login"
          className="mt-6 inline-flex items-center rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-emerald-500"
        >
          Proceed to Sign In →
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      {message && (
        <p className="sm:col-span-2 rounded-xl border border-red-500/40 bg-red-950/30 p-3.5 text-sm text-red-200">
          {message}
        </p>
      )}
      <Field label="Full name" name="name" placeholder="e.g. Shihab Ahmed" required />
      <Field 
        label="Student ID (7 digits)" 
        name="studentId" 
        type="text" 
        inputMode="numeric" 
        pattern="[0-9]{7}" 
        minLength={7} 
        maxLength={7} 
        placeholder="e.g. 1908001" 
        title="Student ID must be exactly a 7-digit number" 
        required 
      />
      <Field label="University email" name="email" type="email" placeholder="student@dept.ruet.ac.bd" required />
      <Field label="Mobile number" name="mobile" type="tel" placeholder="+880 1700 000000" required />
      
      <label className="sm:col-span-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
        Profile picture
        <input
          name="profilePicture"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required
          className={`${fieldClass} file:mr-3 file:border-0 file:rounded-md file:bg-mars-red/20 file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-mars-orange`}
        />
        <span className="mt-1 block text-[11px] text-slate-400">JPG, PNG, or WebP · maximum 2 MB</span>
      </label>
      
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
        Student / Alumni Status
        <select name="memberType" required defaultValue="" className={fieldClass}>
          <option value="" disabled className="bg-slate-900">Select Status (Current Student or Alumni)</option>
          {MEMBER_TYPES.map((type) => (
            <option key={type} className="bg-slate-900">{type}</option>
          ))}
        </select>
      </label>
      
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
        Sub-team
        <select name="subTeam" required defaultValue="" className={fieldClass}>
          <option value="" disabled className="bg-slate-900">Select your team</option>
          {SUB_TEAMS.map((team) => (
            <option key={team} className="bg-slate-900">{team}</option>
          ))}
        </select>
      </label>
      
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
        Position Role
        <select name="position" required defaultValue="Member" className={fieldClass}>
          {POSITIONS.map((position) => (
            <option key={position} className="bg-slate-900">{position}</option>
          ))}
        </select>
      </label>
      
      <Field label="LinkedIn URL (optional)" name="linkedin" type="url" />
      <Field label="Password" name="password" type="password" minLength={8} required />
      <Field label="Confirm password" name="confirmPassword" type="password" minLength={8} required />
      
      <button
        disabled={pending}
        className="sm:col-span-2 mt-3 rounded-xl bg-gradient-to-r from-mars-red to-mars-orange hover:from-mars-orange hover:to-mars-red px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-white transition shadow-lg active:scale-[0.99] disabled:opacity-60"
      >
        {pending ? "Submitting Registration…" : "Submit Registration"}
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
