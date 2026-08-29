"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, Trophy, MapPin, Calendar } from "lucide-react";

const competitions = [
  { year: "2018", name: "Indian Rover Challenge (IRC)", rank: "Participation", location: "India", upcoming: false, badge: "INAUGURAL" },
  { year: "2019", name: "European Rover Challenge (ERC)", rank: "Top 20 Global", location: "Poland", upcoming: false, badge: "TOP 20" },
  { year: "2023", name: "Int'l Rover Design Challenge (IRDC)", rank: "11th Global · 1st in BD", location: "Virtual", upcoming: false, badge: "NATIONAL #1" },
  { year: "2025", name: "Int'l Rover Design Challenge (IRDC)", rank: "Global Contender", location: "Virtual", upcoming: false, badge: "FINALIST" },
  { year: "2025", name: "Indian Rover Challenge (IRC)", rank: "Finalist", location: "India", upcoming: false, badge: "FINALIST" },
  { year: "2026", name: "University Rover Challenge (URC)", rank: "Target: Global Podium", location: "Utah, USA", upcoming: true, badge: "ACTIVE TARGET" },
];

export function CompetitionsTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const scaleX = useTransform(scrollXProgress, [0, 1], [0.1, 1]);

  return (
    <section className="relative py-24 md:py-36 border-b border-white/10 overflow-hidden z-10 bg-[#050505]">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-[20%] w-[600px] h-[600px] bg-mars-red/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-2 border border-mars-orange/30 rounded-full px-3.5 py-1 text-[11px] font-mono text-mars-orange tracking-[0.25em] uppercase bg-mars-red/10 backdrop-blur-md mb-4">
            <Compass size={12} className="text-mars-orange" />
            Global Expeditions
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-tight m-0">
                MISSION ARCHIVES
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-white/75 max-w-xl font-normal leading-relaxed">
              A proven track record of engineering excellence across continents, evolving with every generation of Martian exploration rovers.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="relative w-full group">
        
        {/* Animated timeline line */}
        <div className="absolute top-[88px] left-0 w-full h-0.5 bg-white/10 hidden md:block">
           <motion.div className="h-full bg-gradient-to-r from-mars-red via-mars-orange to-cyan-400 origin-left" style={{ scaleX }} />
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-5 sm:gap-6 md:gap-8 overflow-x-auto pb-12 pt-4 px-4 sm:px-6 md:px-12 lg:px-20 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none" }}
        >
          {competitions.map((comp, i) => (
            <motion.div
              key={i}
              className="snap-center shrink-0 w-[280px] sm:w-[320px] md:w-[360px] relative flex flex-col"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {/* Timeline dot (desktop) */}
              <div className={`hidden md:flex absolute -top-[3px] left-8 w-3 h-3 rounded-full border-2 z-10 box-content transition-all ${
                comp.upcoming 
                ? "bg-mars-orange border-white shadow-[0_0_15px_rgba(231,125,17,0.8)]" 
                : "bg-black border-cyan-400 group-hover:border-mars-orange"
              }`} />

              <div className="mt-0 md:mt-14 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-mars-orange/60 transition-all duration-300 shadow-xl h-full">
                <div className={`p-6 sm:p-7 rounded-xl flex flex-col justify-between h-full relative overflow-hidden backdrop-blur-xl ${
                  comp.upcoming 
                  ? "bg-gradient-to-br from-[#1a0c06] via-[#0d1017] to-[#04060a] border border-mars-orange/30 shadow-[0_0_30px_rgba(193,68,14,0.2)]" 
                  : "bg-gradient-to-b from-[#0e121a] to-[#07090f] border border-white/5"
                }`}>
                  
                  {/* Badge */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/5 border border-white/10 text-white">
                      <Calendar size={10} className="text-mars-orange" />
                      {comp.year}
                    </span>

                    <span className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] tracking-widest font-bold uppercase ${
                      comp.upcoming 
                      ? "bg-mars-red/20 text-mars-orange border border-mars-orange/40 animate-pulse" 
                      : "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                    }`}>
                      {comp.badge}
                    </span>
                  </div>

                  {/* Campaign Name */}
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-4 leading-snug">{comp.name}</h3>
                  
                  {/* Metadata */}
                  <div className="flex flex-col gap-2.5 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                        <Trophy size={12} className="text-mars-orange" />
                        Standing:
                      </span>
                      <span className={`font-semibold tracking-wide ${comp.upcoming ? "text-mars-orange" : "text-cyan-300"}`}>
                        {comp.rank}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin size={12} className="text-white/50" />
                        Arena:
                      </span>
                      <span className="text-white/80">{comp.location}</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="shrink-0 w-6 md:w-20" />
        </div>
      </div>
    </section>
  );
}
