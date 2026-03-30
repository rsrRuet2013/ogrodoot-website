"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const competitions = [
  { year: "2018", name: "Indian Rover Challenge (IRC)", rank: "Participation", location: "India", upcoming: false },
  { year: "2019", name: "European Rover Challenge (ERC)", rank: "Top 20", location: "Poland", upcoming: false },
  { year: "2023", name: "Int'l Rover Design Challenge (IRDC)", rank: "11th Global, 1st in BD", location: "Virtual", upcoming: false },
  { year: "2025", name: "Int'l Rover Design Challenge (IRDC)", rank: "Global Contender", location: "Virtual", upcoming: false },
  { year: "2025", name: "Indian Rover Challenge (IRC)", rank: "Finalist", location: "India", upcoming: false },
  { year: "2026", name: "University Rover Challenge (URC)", rank: "Target", location: "Utah, USA", upcoming: true },
];

export function CompetitionsTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Progress bar over the horizontal scroll container
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const scaleX = useTransform(scrollXProgress, [0, 1], [0.1, 1]);

  return (
    <section className="relative bg-deep-space py-24 md:py-32 border-b border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-orbitron font-bold text-4xl sm:text-5xl tracking-widest text-star-white">CAMPAIGNS</h2>
            <div className="h-px bg-gradient-to-r from-mars-red to-transparent flex-1" />
          </div>
          <p className="font-space-grotesk text-lg text-muted-foreground max-w-2xl">
            A history of pushing limits. Our competition pedigree spans continents and challenges, evolving with every launch.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="relative w-full group">
        
        {/* Animated timeline line */}
        <div className="absolute top-[88px] left-0 w-full h-0.5 bg-white/10 hidden md:block">
           <motion.div className="h-full bg-mars-red origin-left" style={{ scaleX }} />
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 md:gap-12 overflow-x-auto pb-12 pt-4 px-6 md:px-12 lg:px-24 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none" }}
        >
          {competitions.map((comp, i) => (
            <motion.div
              key={i}
              className="snap-center shrink-0 w-[280px] md:w-[360px] relative flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {/* Timeline dot (desktop) */}
              <div className="hidden md:flex absolute -top-[4px] left-8 w-3 h-3 rounded-full bg-deep-space border-2 border-[var(--color-hud-teal)] z-10 box-content transition-all group-hover:border-[var(--color-mars-red)]" />

              <div className={`mt-0 md:mt-16 p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden bg-[#080B12] ${
                comp.upcoming 
                ? "border-mars-red shadow-[0_0_20px_rgba(193,68,14,0.3)] min-h-[220px]" 
                : "border-white/10 hover:border-hud-teal/50 hover:-translate-y-2 min-h-[220px]"
              }`}>
                
                {/* Upcoming Pulse details */}
                {comp.upcoming && (
                  <>
                    <div className="absolute top-0 left-0 w-full h-1 bg-mars-red" />
                    <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-mars-red/20 text-mars-red font-jetbrains-mono text-[10px] tracking-widest rounded-full animate-pulse-glow">
                      <span className="w-1.5 h-1.5 rounded-full bg-mars-red animate-ping" />
                      UPCOMING
                    </div>
                  </>
                )}

                <div className="font-orbitron text-4xl font-bold text-white/10 absolute -bottom-4 right-2 pointer-events-none select-none">
                  {comp.year}
                </div>
                
                <h3 className="font-exo2 text-2xl font-bold text-star-white mb-2 relative z-10 pr-16">{comp.name}</h3>
                
                <div className="flex flex-col gap-3 mt-6">
                  <div className="flex items-center gap-2">
                    <span className="font-jetbrains-mono text-[10px] text-[#6C7A89] uppercase tracking-widest w-16">Rank</span>
                    <span className={`font-jetbrains-mono text-sm tracking-wide ${comp.upcoming ? "text-mars-red" : "text-hud-teal"}`}>{comp.rank}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-jetbrains-mono text-[10px] text-[#6C7A89] uppercase tracking-widest w-16">Locale</span>
                    <span className="font-jetbrains-mono text-sm text-star-white tracking-wide">{comp.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Spacer for right padding in horizontal scroll */}
          <div className="shrink-0 w-6 md:w-24" />
        </div>
        
        {/* Scroll hint gradient */}
        <div className="absolute right-0 top-0 bottom-12 w-24 bg-gradient-to-l from-deep-space to-transparent pointer-events-none hidden md:block" />
      </div>
    </section>
  );
}
