"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, Menu, ShieldCheck, UserRound, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem =
  | { name: string; href: string; links?: never }
  | { name: string; links: { name: string; href: string; description?: string }[]; href?: never };

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Rover", href: "/rover" },
  {
    name: "About",
    links: [
      { name: "Our Story", href: "/about", description: "The legacy and mission behind Team Ogrodoot" },
      { name: "Achievements", href: "/achievements", description: "Global rankings and podium finishes" },
      { name: "Media & Press", href: "/media", description: "News, press releases & publications" },
    ],
  },
  {
    name: "Team",
    links: [
      { name: "Current Team", href: "/team", description: "Active interdisciplinary engineers" },
      { name: "Alumni Network", href: "/alumni", description: "Graduated founders & mentors" },
    ],
  },
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

  const isCurrentPath = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then(async (res) => {
        const data = await res.json();
        if (!cancelled) setUser(data.user ?? null);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  async function signOut() {
    setUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const hasDropdownLinks = (item: NavItem): item is Extract<NavItem, { links: { name: string; href: string; description?: string }[] }> =>
    Array.isArray(item.links);
  const dropdownIsActive = (item: Extract<NavItem, { links: unknown[] }>) =>
    item.links.some((link) => isCurrentPath((link as { href: string }).href));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isScrolled
            ? "py-3 bg-[#06080d]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
            : "py-5 bg-gradient-to-b from-black/80 via-black/25 to-transparent"
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Brand Logo & Name */}
          <Link href="/" aria-label="Ogrodoot Home" className="group flex items-center gap-3">
            <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full p-[1px] bg-gradient-to-br from-mars-orange via-mars-red/60 to-white/20 transition-transform duration-300 group-hover:scale-105">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#07090e]">
                <Image
                  src="/logo-white.png"
                  alt="Team Ogrodoot"
                  fill
                  sizes="44px"
                  className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-base sm:text-lg font-black tracking-wider text-white group-hover:text-mars-orange transition-colors">
                OGRODOOT
              </span>
              <span className="-mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-white/50 group-hover:text-white/80 transition-colors">
                RUET ROVER TEAM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary navigation"
            onMouseLeave={() => setOpenDropdown(null)}
            className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-[#0b0e17]/70 p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl"
          >
            {navItems.map((item) =>
              hasDropdownLinks(item) ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.name)}
                >
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={openDropdown === item.name}
                    onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200",
                      dropdownIsActive(item)
                        ? "bg-gradient-to-r from-mars-red/20 to-mars-orange/20 text-mars-orange border border-mars-orange/30 shadow-[0_0_15px_rgba(231,125,17,0.15)]"
                        : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                    )}
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200 text-white/50",
                        openDropdown === item.name && "rotate-180 text-mars-orange"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <motion.div
                        role="menu"
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d14]/95 p-2 shadow-2xl backdrop-blur-2xl"
                      >
                        <div className="space-y-1">
                          {item.links.map((link) => (
                            <Link
                              key={link.name}
                              href={link.href}
                              role="menuitem"
                              onClick={() => setOpenDropdown(null)}
                              className={cn(
                                "flex flex-col rounded-xl px-3.5 py-2.5 transition-all duration-200",
                                isCurrentPath(link.href)
                                  ? "bg-mars-orange/15 border border-mars-orange/30 text-white"
                                  : "text-white/80 hover:bg-white/[0.07] hover:text-mars-orange"
                              )}
                            >
                              <span className="text-xs font-bold tracking-wide">{link.name}</span>
                              {link.description && (
                                <span className="text-[10px] text-white/40 mt-0.5 line-clamp-1">
                                  {link.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200",
                    isCurrentPath(item.href)
                      ? "bg-gradient-to-r from-mars-red/20 to-mars-orange/20 text-mars-orange border border-mars-orange/30 shadow-[0_0_15px_rgba(231,125,17,0.15)]"
                      : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                  )}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Desktop Right Actions (Auth) */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" onMouseLeave={() => setUserMenuOpen(false)}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                  onClick={() => setUserMenuOpen((open) => !open)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 transition-all duration-200",
                    userMenuOpen
                      ? "border-mars-orange/70 bg-mars-orange/10"
                      : "border-white/10 bg-[#0b0e17]/70 hover:border-mars-orange/50"
                  )}
                >
                  <span className="relative h-7 w-7 overflow-hidden rounded-full border border-white/20 bg-slate-800">
                    {user.profilePicUrl ? (
                      <img src={user.profilePicUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <UserRound size={14} className="absolute inset-0 m-auto text-slate-400" />
                    )}
                  </span>
                  <span className="max-w-[8rem] truncate text-xs font-semibold text-white">
                    {user.name}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-white/50 transition-transform duration-200",
                      userMenuOpen && "rotate-180 text-mars-orange"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d14]/95 p-1.5 shadow-2xl backdrop-blur-2xl"
                    >
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          role="menuitem"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold tracking-wide text-white/90 transition-colors hover:bg-white/[0.08] hover:text-mars-orange"
                        >
                          <ShieldCheck size={15} className="text-mars-orange" />
                          Admin Console
                        </Link>
                      )}
                      <button
                        type="button"
                        role="menuitem"
                        onClick={signOut}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold tracking-wide text-red-400 transition-colors hover:bg-red-950/40 hover:text-red-300"
                      >
                        <LogOut size={15} />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/75 hover:text-white transition-colors duration-200",
                    isCurrentPath("/login") && "text-mars-orange font-bold"
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="relative group overflow-hidden rounded-full bg-gradient-to-r from-mars-red to-mars-orange px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(193,68,14,0.3)] hover:shadow-[0_0_25px_rgba(231,125,17,0.5)] transition-all duration-300 active:scale-95 border border-white/20"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Join Team
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            {user && (
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0b0e17]/80 py-1 pl-1 pr-3 backdrop-blur-md">
                <span className="relative h-6 w-6 overflow-hidden rounded-full border border-white/20 bg-slate-800 shrink-0">
                  {user.profilePicUrl ? (
                    <img src={user.profilePicUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <UserRound size={12} className="absolute inset-0 m-auto text-slate-400" />
                  )}
                </span>
                <span className="max-w-[4.5rem] truncate text-[11px] font-semibold text-white">
                  {user.name}
                </span>
              </div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="relative z-[60] rounded-full border border-white/10 bg-[#0b0e17]/80 p-2.5 text-white backdrop-blur-md transition-transform active:scale-95"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer / Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] flex flex-col justify-between overflow-y-auto bg-[#06080d]/98 px-6 pt-28 pb-10 backdrop-blur-2xl md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-6 text-center w-full max-w-sm mx-auto">
              {user && (
                <div className="flex flex-col items-center gap-2 pb-4 border-b border-white/10 w-full">
                  <span className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-mars-orange/60 bg-slate-800 shadow-[0_0_20px_rgba(231,125,17,0.3)]">
                    {user.profilePicUrl ? (
                      <img src={user.profilePicUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <UserRound size={28} className="absolute inset-0 m-auto text-slate-400" />
                    )}
                  </span>
                  <p className="text-sm font-bold text-white">{user.name}</p>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-mars-orange">
                    {user.role}
                  </span>
                </div>
              )}

              {navItems.map((item) =>
                hasDropdownLinks(item) ? (
                  <div key={item.name} className="w-full space-y-2.5">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-mars-orange">
                      {item.name}
                    </p>
                    <div className="flex flex-col gap-2">
                      {item.links.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "py-1 text-sm font-medium tracking-wide transition-colors",
                            isCurrentPath(link.href)
                              ? "text-mars-orange font-bold"
                              : "text-white/80 hover:text-white"
                          )}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-base font-bold uppercase tracking-widest transition-colors",
                      isCurrentPath(item.href) ? "text-mars-orange" : "text-white/90 hover:text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>

            <div className="mt-8 flex flex-col gap-3 w-full max-w-sm mx-auto border-t border-white/10 pt-6">
              {user ? (
                <>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-xl border border-mars-orange/60 bg-mars-orange/10 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-mars-orange"
                    >
                      Admin Console
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={signOut}
                    className="rounded-xl border border-red-500/40 bg-red-950/20 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-red-300"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-xl bg-gradient-to-r from-mars-red to-mars-orange px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white shadow-lg"
                  >
                    Join Team
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}