"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function RoverTeam() {
  return (
    <section className="relative w-full overflow-hidden bg-[#050505] flex flex-col items-center justify-center py-8 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Subtle Mars Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(193,68,14,0.08)_0%,rgba(5,5,5,0)_75%)] pointer-events-none" />

      {/* Full Team Photo Showcase - Pristine, cinematic scroll entry animation */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="relative z-10 w-full max-w-7xl mx-auto"
      >
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-2xl sm:rounded-3xl bg-[#080b12] shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
          <Image
            src="/photots/team.jpg"
            alt="Team Ogrodoot"
            fill
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1280px"
            className="object-cover object-center w-full h-full transition-transform duration-700 ease-out hover:scale-[1.01]"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default RoverTeam;
