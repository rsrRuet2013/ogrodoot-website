"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, Menu, ShieldCheck, UserRound, X } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem =
  | { name: string; href: string; links?: never }
  | { name: string; links: { name: string; href: string }[]; href?: never };

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Rover", href: "/rover" },
  { name: "About", links: [
    { name: "Our Story", href: "/about" },
    { name: "Achievements", href: "/achievements" },
    { name: "Media & Press", href: "/media" },
  ] },
  { name: "Team", links: [
    { name: "Current Team", href: "/team" },
    { name: "Alumni", href: "/alumni" },
  ] },
  { name: "Contact", href: "/contact" },
];

type SessionUser = { name: string; profilePicUrl: string; role: "member" | "lead" | "admin" };

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isCurrentPath = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me").then(async (res) => { const data = await res.json(); if (!cancelled) setUser(data.user ?? null); }).catch(() => { if (!cancelled) setUser(null); });
    return () => { cancelled = true; };
  }, [pathname]);

  async function signOut() {
    setUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const hasDropdownLinks = (item: NavItem): item is Extract<NavItem, { links: { name: string; href: string }[] }> => Array.isArray(item.links);
  const dropdownIsActive = (item: Extract<NavItem, { links: unknown[] }>) => item.links.some((link) => isCurrentPath(link.href));

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", isScrolled ? "border-b border-slate-700/60 bg-[#0a0b0e]/90 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.9)] backdrop-blur-xl" : "bg-gradient-to-b from-black/80 via-black/20 to-transparent py-5")}>
        <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
          <Link href="/" aria-label="Ogrodoot home" className="group relative flex items-center gap-3.5">
            <div className="relative h-11 w-11 rounded-full bg-gradient-to-br from-slate-200 via-slate-500 to-slate-800 p-px shadow-md transition-all duration-500 group-hover:from-slate-100 group-hover:to-cyan-500">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#0a0b0e]"><Image src="/logo-white.png" alt="Team Ogrodoot logo" fill sizes="44px" className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110" /></div>
            </div>
            <div className="hidden flex-col sm:flex"><span className="font-orbitron text-lg font-extrabold tracking-widest text-slate-100">OGRODOOT</span><span className="-mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400">Mars Rover Team</span></div>
          </Link>

          <nav aria-label="Primary navigation" onMouseLeave={() => setOpenDropdown(null)} className="relative hidden items-center gap-1 rounded-full border border-slate-700/60 bg-[#12141c]/80 p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl md:flex">
            {navItems.map((item) => hasDropdownLinks(item) ? (
              <div key={item.name} className="relative" onMouseEnter={() => setOpenDropdown(item.name)}>
                <button type="button" aria-haspopup="menu" aria-expanded={openDropdown === item.name} onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)} className={cn("flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all", dropdownIsActive(item) ? "bg-slate-600 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "text-slate-300 hover:bg-slate-700/60 hover:text-white")}>
                  {item.name}<ChevronDown className={cn("h-3.5 w-3.5 transition-transform", openDropdown === item.name && "rotate-180")} />
                </button>
                <AnimatePresence>{openDropdown === item.name && <motion.div role="menu" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="absolute left-1/2 top-full mt-3 w-48 -translate-x-1/2 overflow-hidden rounded-xl border border-slate-600/70 bg-[#10131b]/95 p-1.5 shadow-2xl backdrop-blur-xl">
                  {item.links.map((link) => <Link key={link.name} href={link.href} role="menuitem" onClick={() => setOpenDropdown(null)} className={cn("block rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors", isCurrentPath(link.href) ? "bg-slate-600/60 text-white" : "text-slate-300 hover:bg-slate-700/70 hover:text-white")}>{link.name}</Link>)}
                </motion.div>}</AnimatePresence>
              </div>
            ) : <Link key={item.name} href={item.href} className={cn("rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all", isCurrentPath(item.href) ? "bg-slate-600 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "text-slate-300 hover:bg-slate-700/60 hover:text-white")}>{item.name}</Link>)}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <div className="relative" onMouseLeave={() => setUserMenuOpen(false)}>
                <button type="button" aria-haspopup="menu" aria-expanded={userMenuOpen} onClick={() => setUserMenuOpen((open) => !open)} className={cn("flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 transition-all", userMenuOpen ? "border-cyan-300/70 bg-cyan-400/10" : "border-slate-600/70 bg-[#12141c]/80 hover:border-cyan-400/60")}>
                  <span className="relative h-8 w-8 overflow-hidden rounded-full border border-slate-600 bg-slate-800">
                    {user.profilePicUrl ? <img src={user.profilePicUrl} alt="" className="h-full w-full object-cover" /> : <UserRound size={16} className="absolute inset-0 m-auto text-slate-400" />}
                  </span>
                  <span className="max-w-[9rem] truncate text-xs font-semibold text-slate-100">{user.name}</span>
                  <ChevronDown className={cn("h-3.5 w-3.5 text-slate-400 transition-transform", userMenuOpen && "rotate-180")} />
                </button>
                <AnimatePresence>{userMenuOpen && <motion.div role="menu" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="absolute right-0 top-full mt-3 w-52 overflow-hidden rounded-xl border border-slate-600/70 bg-[#10131b]/95 p-1.5 shadow-2xl backdrop-blur-xl">
                  {user.role === "admin" && <Link href="/admin" role="menuitem" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wide text-slate-200 transition-colors hover:bg-slate-700/70 hover:text-white"><ShieldCheck size={15} className="text-cyan-300" />Admin Console</Link>}
                  <button type="button" role="menuitem" onClick={signOut} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-semibold tracking-wide text-red-300 transition-colors hover:bg-red-950/60 hover:text-red-200"><LogOut size={15} />Sign out</button>
                </motion.div>}</AnimatePresence>
              </div>
            ) : <>
              <Link href="/login" className={cn("rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-wider transition-colors", isCurrentPath("/login") ? "text-cyan-300" : "text-slate-300 hover:text-white")}>Login</Link>
              <Link href="/register" className={cn("rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all", isCurrentPath("/register") ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-cyan-400/70 bg-cyan-400/10 text-cyan-200 hover:border-cyan-200 hover:bg-cyan-400 hover:text-slate-950")}>Join ROSB</Link>
            </>}
          </div>

          <button onClick={() => setIsMobileMenuOpen((open) => !open)} className="relative z-[60] rounded-full border border-slate-700/60 bg-[#12141c]/80 p-2.5 text-slate-200 backdrop-blur-md transition-transform active:scale-95 md:hidden" aria-label="Toggle navigation menu" aria-expanded={isMobileMenuOpen}>{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>

      <AnimatePresence>{isMobileMenuOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[55] flex items-center justify-center overflow-y-auto bg-[#0a0b0e]/95 px-6 py-24 backdrop-blur-xl md:hidden">
        <nav aria-label="Mobile navigation" className="relative flex w-full max-w-xs flex-col items-center gap-6 text-center font-orbitron">
          {user && <div className="flex flex-col items-center gap-2"><span className="relative h-16 w-16 overflow-hidden rounded-full border border-cyan-400/50 bg-slate-800">{user.profilePicUrl ? <img src={user.profilePicUrl} alt="" className="h-full w-full object-cover" /> : <UserRound size={28} className="absolute inset-0 m-auto text-slate-400" />}</span><p className="text-sm font-bold text-slate-100">{user.name}</p></div>}
          {navItems.map((item) => hasDropdownLinks(item) ? <div key={item.name} className="space-y-2"><p className="text-sm font-semibold uppercase tracking-widest text-slate-200">{item.name}</p><div className="flex flex-col gap-2">{item.links.map((link) => <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={cn("text-xs tracking-wider transition-colors", isCurrentPath(link.href) ? "text-white" : "text-slate-500 hover:text-slate-200")}>{link.name}</Link>)}</div></div> : <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn("text-sm font-semibold uppercase tracking-widest transition-colors", isCurrentPath(item.href) ? "text-white" : "text-slate-400 hover:text-slate-100")}>{item.name}</Link>)}
          <div className="mt-2 flex w-full gap-3 border-t border-slate-700 pt-6">
            {user ? <>
              {user.role === "admin" && <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 border border-cyan-400/70 px-3 py-3 text-xs font-bold uppercase tracking-wider text-cyan-200">Admin Console</Link>}
              <button type="button" onClick={signOut} className="flex-1 border border-red-500/60 px-3 py-3 text-xs font-bold uppercase tracking-wider text-red-300">Sign out</button>
            </> : <>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 border border-slate-600 px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-200">Login</Link>
              <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 border border-cyan-400 bg-cyan-400/10 px-3 py-3 text-xs font-bold uppercase tracking-wider text-cyan-200">Join ROSB</Link>
            </>}
          </div>
        </nav>
      </motion.div>}</AnimatePresence>
    </>
  );
}