"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, Rocket, Shield, Award, Crown, Sparkles } from "lucide-react";

export function SponsorshipCTA() {
  const packages = [
    {
      title: "SILVER PARTNER",
      amount: "$500+",
      badge: "SUPPORT DIVISION",
      icon: Shield,
      iconColor: "text-slate-300",
      bgGlow: "from-slate-500/10",
      benefits: "Official logo on rover chassis · Social media mentions · Access to recruitment network",
    },
    {
      title: "GOLD PARTNER",
      amount: "$1,500+",
      badge: "EXPEDITION TIER",
      icon: Award,
      iconColor: "text-amber-400",
      bgGlow: "from-amber-500/15",
      benefits: "Prominent rover branding · Team jersey placement · Campus exhibition showcase",
    },
    {
      title: "PLATINUM TITLE",
      amount: "$3,000+",
      badge: "MISSION TITLE SPONSOR",
      icon: Crown,
      iconColor: "text-cyan-400",
      bgGlow: "from-cyan-500/15",
      benefits: "Title partner credit at URC / IRDC · Keynote speaker slot · Dedicated tech demo video",
    },
  ];

  return (
    <section className="py-24 md:py-36 relative overflow-hidden z-10 border-t border-white/10 bg-[#050505]">
      {/* Planetary orbital rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/5 opacity-20 animate-orbit-spin pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[1300px] rounded-full border border-mars-orange/15 opacity-30 animate-orbit-spin pointer-events-none" style={{ animationDuration: '50s', animationDirection: 'reverse'}} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-mars-red/15 via-mars-orange/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 max-w-6xl relative z-10 text-center">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="flex flex-col items-center gap-4 sm:gap-5 mb-14 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 border border-mars-orange/30 rounded-full px-3.5 py-1 text-[11px] font-mono text-mars-orange tracking-[0.25em] uppercase bg-mars-red/10 backdrop-blur-md">
            <Rocket size={12} className="text-mars-orange animate-pulse" />
            Launch Partnership
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] leading-tight m-0">
            JOIN THE MISSION
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-white/75 font-normal leading-relaxed max-w-2xl">
            Empower Bangladesh&apos;s premier Mars rover engineers on the global stage. Partner with Team Ogrodoot for high-impact brand visibility at international aerospace championships.
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-14 text-left"
        >
          {packages.map((pkg, i) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-mars-orange/60 transition-all duration-300 shadow-xl"
              >
                <div className="p-6 sm:p-7 rounded-xl bg-gradient-to-b from-[#0e121a] to-[#07090f] backdrop-blur-xl border border-white/5 flex flex-col justify-between gap-5 relative overflow-hidden h-full">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${pkg.iconColor}`}>
                      <Icon size={24} />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                      {pkg.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-black text-lg text-white tracking-wide">{pkg.title}</h3>
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tight text-mars-orange mt-1 block">
                      {pkg.amount}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-white/10 text-xs text-white/60 leading-relaxed">
                    {pkg.benefits}
                  </div>
                </div>
              </motion.div>
            );
          })}
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
            className="group relative rounded-full bg-gradient-to-r from-mars-red to-mars-orange hover:from-mars-orange hover:to-mars-red text-white text-xs sm:text-sm font-bold tracking-[0.2em] uppercase pl-8 sm:pl-10 pr-4 py-6 sm:py-7 shadow-[0_0_35px_rgba(193,68,14,0.4)] hover:shadow-[0_0_50px_rgba(231,125,17,0.6)] transition-all duration-300 border border-white/20 active:scale-[0.98]"
            data-cta="true"
          >
            <Link href="/contact" className="flex items-center gap-3">
              <span>EXPLORE SPONSORSHIP PARTNERSHIP</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/20 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={15} />
              </span>
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
