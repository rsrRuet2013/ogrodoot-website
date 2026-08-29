"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUpRight, 
  Trophy, 
  ChevronUp, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#06080d] text-white border-t border-white/[0.08] overflow-hidden select-none">
      {/* Subtle Mars Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-mars-red/10 via-mars-orange/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Top Accent Horizon Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-mars-orange/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-14">
          
          {/* Column 1: Brand & Bio (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link href="/" className="group flex items-center gap-3 w-fit">
              <div className="relative h-12 w-12 rounded-full p-[1px] bg-gradient-to-br from-mars-orange via-mars-red to-white/20">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#07090e]">
                  <Image
                    src="/logo-white.png"
                    alt="Team Ogrodoot"
                    fill
                    sizes="48px"
                    className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-black tracking-wider text-white group-hover:text-mars-orange transition-colors">
                  TEAM OGRODOOT
                </span>
                <span className="-mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                  RUET MARS ROVER TEAM
                </span>
              </div>
            </Link>

            <p className="font-sans text-sm text-white/70 leading-relaxed max-w-sm">
              Designing the future of Mars exploration — from Bangladesh to the Universe. Official rover engineering team of Rajshahi University of Engineering & Technology (RUET).
            </p>

            {/* Authentic Social Media Links */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/team.ogrodoot"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/70 hover:text-white hover:border-mars-orange hover:bg-mars-orange/10 transition-all duration-300 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/team.ogrodoot"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/70 hover:text-white hover:border-mars-orange hover:bg-mars-orange/10 transition-all duration-300 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/ogrodoot/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/70 hover:text-white hover:border-mars-orange hover:bg-mars-orange/10 transition-all duration-300 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@team_ogrodoot"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/70 hover:text-white hover:border-mars-orange hover:bg-mars-orange/10 transition-all duration-300 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 cols on lg) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-mars-orange">
              Navigation
            </h3>
            <nav className="flex flex-col gap-2.5 text-sm">
              <Link href="/" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit">
                Home
              </Link>
              <Link href="/rover" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit">
                Rover Showcase
              </Link>
              <Link href="/about" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit">
                Our Story
              </Link>
              <Link href="/achievements" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit">
                Achievements
              </Link>
              <Link href="/team" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit">
                Current Crew
              </Link>
              <Link href="/alumni" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit">
                Alumni Network
              </Link>
              <Link href="/media" className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit">
                Media & Press
              </Link>
            </nav>
          </div>

          {/* Column 3: Contact & Headquarters (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-mars-orange">
              Headquarters
            </h3>
            <div className="flex flex-col gap-3.5 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-mars-orange shrink-0 mt-1" />
                <span className="text-xs leading-relaxed">
                  Rajshahi University of Engineering & Technology (RUET)<br />
                  Kazla, Rajshahi 6204, Bangladesh
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} className="text-mars-orange shrink-0" />
                <a
                  href="mailto:teamogrodoot.ruet.bd@gmail.com"
                  className="text-xs text-white/80 hover:text-mars-orange transition-colors truncate"
                >
                  teamogrodoot.ruet.bd@gmail.com
                </a>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-200"
                >
                  <span>Inquire / Collaborate</span>
                  <ArrowUpRight size={13} className="text-mars-orange" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, University Badge & Back to Top */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Team Ogrodoot.</span>
            <span className="hidden sm:inline">·</span>
            <span>All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-white/70">Engineered at RUET, Bangladesh.</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:text-white transition-all text-[11px] font-mono uppercase tracking-wider"
          >
            <span>Back to Top</span>
            <ChevronUp size={14} className="text-mars-orange" />
          </button>
        </div>
      </div>
    </footer>
  );
}
