"use client";

import { motion } from "framer-motion";
import { heroStagger } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export function HeroContent() {
  const titleText = "TEAM OGRODOOT";

  return (
    <div className="relative z-10 flex flex-col items-center justify-start min-h-[100dvh] pt-32 sm:pt-40 md:pt-44 pb-16 px-4 sm:px-6 lg:px-8 pointer-events-none text-center">
      
      {/* Upper Hero Block - Positioned higher to keep the rover visible */}
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center justify-start gap-4 sm:gap-6 pointer-events-auto">
        
        {/* Main Title - Single Line & Scaled Responsively */}
        <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
          <motion.h1
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            className="font-orbitron font-black text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-wider text-star-white m-0 leading-tight whitespace-nowrap select-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
          >
            {titleText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { type: "spring", stiffness: 120, damping: 14 }
                  }
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col items-center gap-1 max-w-2xl mx-auto px-2"
          >
            <h2 className=" text-xs min-[380px]:text-sm sm:text-lg md:text-xl lg:text-2xl text-white font-semibold tracking-wide drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
              RUET ROVER TEAM
            </h2>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2 sm:mt-4 w-full justify-center"
        >
          {/* Primary Action Button */}
          <Button
            asChild
            size="lg"
            className="group relative rounded-full bg-gradient-to-r from-mars-red to-mars-orange hover:from-mars-orange hover:to-mars-red text-white text-xs sm:text-sm font-bold tracking-widest uppercase pl-6 sm:pl-8 pr-3 sm:pr-4 py-5 sm:py-6 shadow-[0_0_25px_rgba(193,68,14,0.4)] hover:shadow-[0_0_35px_rgba(231,125,17,0.6)] transition-all duration-300 border border-white/20 active:scale-[0.98]"
            data-cta="true"
          >
            <Link href="/rover" className="flex items-center gap-2 sm:gap-3">
              <span>EXPLORE THE ROVER</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/20 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={15} />
              </span>
            </Link>
          </Button>

          {/* Secondary Action Button */}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group rounded-full border border-white/20 hover:border-white/50 bg-black/40 hover:bg-white/10 backdrop-blur-md text-star-white text-xs sm:text-sm font-semibold tracking-widest uppercase px-6 sm:px-8 py-5 sm:py-6 transition-all duration-300 active:scale-[0.98]"
            data-cta="true"
          >
            <Link href="/sponsor">
              SPONSOR US
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-auto"
      >
        <span className="font-jetbrains-mono text-[10px] tracking-widest text-white/50 uppercase">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="text-white/60" size={18} />
        </motion.div>
      </motion.div>

    </div>
  );
}