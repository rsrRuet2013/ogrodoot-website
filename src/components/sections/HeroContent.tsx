"use client";

import { motion } from "framer-motion";
import { heroStagger } from "@/lib/animations";

export function HeroContent() {
  const titleText = "TEAM OGRODOOT";

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] w-full pt-16 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 pointer-events-none text-center select-none -translate-y-8 sm:-translate-y-12 md:-translate-y-16">
      
      {/* Central Focal Content Elevated */}
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center justify-center gap-3 sm:gap-4 pointer-events-auto">
        
        {/* Main Title - Responsive & Single-Line Guaranteed */}
        <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 w-full">
          <motion.h1
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            className="font-heading font-black text-[7.5vw] min-[400px]:text-[8vw] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/80 m-0 leading-none drop-shadow-[0_10px_50px_rgba(0,0,0,0.95)] whitespace-nowrap select-none"
          >
            {titleText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { type: "spring", stiffness: 130, damping: 15 }
                  }
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle - RUET ROVER TEAM - Single Line Guaranteed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-2 sm:gap-4 mt-1 sm:mt-2 w-full max-w-2xl px-1"
          >
            <div className="h-px w-4 min-[360px]:w-8 sm:w-16 bg-gradient-to-r from-transparent via-mars-orange/60 to-mars-orange shrink-0" />
            <h2 className="font-heading text-[3.3vw] min-[360px]:text-[3.5vw] sm:text-lg md:text-xl lg:text-2xl text-mars-orange font-extrabold tracking-[0.14em] min-[360px]:tracking-[0.2em] sm:tracking-[0.28em] uppercase drop-shadow-[0_2px_20px_rgba(231,125,17,0.6)] whitespace-nowrap">
              RUET ROVER TEAM
            </h2>
            <div className="h-px w-4 min-[360px]:w-8 sm:w-16 bg-gradient-to-l from-transparent via-mars-orange/60 to-mars-orange shrink-0" />
          </motion.div>
        </div>

        {/* Tagline / Mission Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-sans text-xs sm:text-sm md:text-base text-white/75 max-w-xl mx-auto font-normal leading-relaxed tracking-wide px-4 mt-1"
        >
          Designing next-generation planetary exploration rovers for international aerospace championships.
        </motion.p>
      </div>

      {/* Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-auto translate-y-8 sm:translate-y-12 md:translate-y-16"
      >
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-white/40 uppercase">
          EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-mars-orange" />
        </motion.div>
      </motion.div>

    </div>
  );
}