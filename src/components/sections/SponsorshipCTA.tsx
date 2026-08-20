"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, Rocket, ShieldCheck, Sparkles } from "lucide-react";

export function SponsorshipCTA() {
  const packages = [
    { title: "SILVER PARTNER", amount: "$500+", badge: "SUPPORT DIVISION", icon: "🪙", color: "from-zinc-500/20" },
    { title: "GOLD PARTNER", amount: "$1500+", badge: "EXPEDITION TIER", icon: "🥇", color: "from-amber-500/20" },
    { title: "PLATINUM TITLE", amount: "$3000+", badge: "MISSION TITLE SPONSOR", icon: "💎", color: "from-blue-500/20" },
  ];

  return (
    <section className="py-28 md:py-40 relative overflow-hidden z-10 border-t border-white/10">
      {/* Planetary orbital rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/5 opacity-30 animate-orbit-spin pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[1300px] rounded-full border border-mars-orange/15 opacity-40 animate-orbit-spin pointer-events-none" style={{ animationDuration: '50s', animationDirection: 'reverse'}} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-mars-red/20 via-mars-orange/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl relative z-10 text-center">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="flex flex-col items-center gap-6 mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 border border-mars-orange/30 rounded-full px-3.5 py-1 text-[11px] font-jetbrains-mono text-mars-orange tracking-[0.25em] uppercase bg-mars-red/10 backdrop-blur-md">
            <Rocket size={12} className="text-mars-orange animate-pulse" />
            Launch Partnership
          </div>

          <div className="inline-block relative">
            <h2 className="font-orbitron font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-star-white mars-glow-text leading-tight">
              JOIN THE MISSION
            </h2>
          </div>
          
          <p className="font-space-grotesk text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-2xl">
            Empower Bangladesh's premier Mars rover engineers on the global stage. Partner with Team Ogrodoot for high-impact brand visibility at international aerospace championships.
          </p>
        </motion.div>

        {/* Tiers Preview */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16"
        >
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group p-1.5 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-mars-orange/60 transition-all duration-500 double-bezel"
            >
              <div className="p-8 rounded-[calc(2rem-0.375rem)] bg-gradient-to-b from-black/80 to-[#0c0503]/90 backdrop-blur-xl border border-white/5 flex flex-col items-center gap-4 relative overflow-hidden h-full">
                <div className="text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 drop-shadow-md">{pkg.icon}</div>
                
                <span className="font-jetbrains-mono text-[9px] uppercase tracking-[0.25em] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-hud-teal">
                  {pkg.badge}
                </span>

                <div className="flex flex-col items-center mt-2">
                  <h3 className="font-orbitron font-bold text-lg text-star-white tracking-wider">{pkg.title}</h3>
                  <span className="font-jetbrains-mono text-2xl font-black tracking-wide text-mars-orange mt-1">{pkg.amount}</span>
                </div>

                <div className="w-full pt-4 mt-2 border-t border-white/5 text-[11px] font-jetbrains-mono text-[#6C7A89]">
                  GLOBAL LOGO · MEDIA REACH · TECH VISIBILITY
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="flex justify-center"
        >
          <Button
            asChild
            size="lg"
            className="group relative rounded-full bg-gradient-to-r from-mars-red to-mars-orange hover:from-mars-orange hover:to-mars-red text-white text-xs sm:text-sm font-bold tracking-[0.2em] uppercase pl-10 pr-4 py-7 shadow-[0_0_35px_rgba(193,68,14,0.5)] hover:shadow-[0_0_50px_rgba(231,125,17,0.7)] transition-all duration-500 border border-white/20 active:scale-[0.98]"
            data-cta="true"
          >
            <Link href="/sponsor" className="flex items-center gap-4">
              <span>EXPLORE SPONSORSHIP DOSSIER</span>
              <span className="w-8 h-8 rounded-full bg-black/20 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
