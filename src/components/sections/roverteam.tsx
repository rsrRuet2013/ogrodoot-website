"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function RoverTeam() {
  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-black flex flex-col items-center justify-between py-8 sm:py-12 px-4">
      
      {/* Top Bold White Header - Fully Responsive Text & Spacing */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 text-center pt-2 sm:pt-6 max-w-7xl mx-auto pointer-events-none"
      >
        <h1 className="font-orbitron font-black text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white tracking-wider uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
          TEAM OGRODOOT
        </h1>
        <p className="font-exo2 font-bold text-xs min-[380px]:text-sm sm:text-lg md:text-xl lg:text-2xl text-white/90 tracking-[0.25em] uppercase mt-1 sm:mt-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
          RUET
        </p>
      </motion.div>

      {/* Smooth Scroll Animated Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 w-full h-full z-10"
      >
        <Image
          src="/photots/team.jpg"
          alt="Team Ogrodoot"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft Contrast Overlay for Readability */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      </motion.div>

    </section>
  );
}

export default RoverTeam;