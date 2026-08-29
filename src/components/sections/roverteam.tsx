"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, ArrowUpRight } from "lucide-react";

export function RoverTeam() {
  return (
    <section className="relative w-full overflow-hidden bg-[#050505] flex flex-col items-center justify-center py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      
      {/* Background Subtle Mars Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(193,68,14,0.12)_0%,rgba(5,5,5,0)_70%)] pointer-events-none" />

      {/* Section Title & Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 text-center mb-8 sm:mb-12 max-w-4xl mx-auto flex flex-col items-center justify-center gap-3 w-full"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-mars-orange/10 border border-mars-orange/30 text-mars-orange text-[11px] font-mono uppercase tracking-[0.25em]">
          <Users size={12} className="text-mars-orange" />
          The Crew
        </div>

        <h2 className="font-heading font-black text-3xl min-[360px]:text-4xl min-[410px]:text-5xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-tight m-0 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
          TEAM OGRODOOT
        </h2>
        
        <div className="flex items-center justify-center gap-3 mt-1">
          <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-mars-orange/60" />
          <p className="font-heading font-bold text-xs min-[360px]:text-sm sm:text-base text-mars-orange tracking-[0.2em] sm:tracking-[0.3em] uppercase">
            RUET ROVER TEAM
          </p>
          <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-mars-orange/60" />
        </div>
      </motion.div>

      {/* Full Team Photo Showcase Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 25 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="relative z-10 w-full max-w-7xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-[#080b12] shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-1.5 sm:p-2.5 group"
      >
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xl sm:rounded-2xl bg-black">
          <Image
            src="/photots/team.jpg"
            alt="Team Ogrodoot - Full Team Roster"
            fill
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1280px"
            className="object-cover object-center w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </div>

        {/* Clean transparent info caption below photo - keeps image completely unblocked */}
        <div className="mt-3.5 px-2 sm:px-4 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-transparent">
          <div className="flex flex-col">
            <span className="font-heading text-sm sm:text-base font-bold text-white">
              Multidisciplinary Engineering Squadron
            </span>
            <span className="font-sans text-xs text-white/70">
              Over 50 student researchers across Mechanical, Avionics, Autonomous AI & Science.
            </span>
          </div>
          
          <Link
            href="/team"
            className="inline-flex items-center gap-2 rounded-xl bg-white/[0.08] hover:bg-mars-orange hover:text-black border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 shrink-0"
          >
            <span>Explore Full Roster</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </motion.div>

    </section>
  );
}

export default RoverTeam;