"use client";

import { motion } from "framer-motion";
import { heroStagger, fadeUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function HeroContent() {
  const titleText = "TEAM OGRODOOT";

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] pt-20 pb-10 px-4 wrapper pointer-events-none">
      {/* Container for content structure */}
      <div className="max-w-[1280px] w-full mx-auto flex flex-col items-center text-center gap-8 md:gap-12 mt-auto mb-auto pointer-events-auto">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-black/40 backdrop-blur-sm border border-hud-teal/30 text-hud-teal px-4 py-1.5 rounded-full font-jetbrains-mono text-xs tracking-[0.2em] relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            [RUET ROVER TEAM · EST. 2017]
            <span className="w-1.5 h-3 bg-hud-teal animate-blink-cursor inline-block" />
          </span>
        </motion.div>

        {/* Headline block */}
        <div className="flex flex-col items-center gap-2">
          {/* Letter by letter stagger for Title */}
          <motion.h1
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            className="font-orbitron font-extrabold text-5xl sm:text-7xl md:text-[6rem] lg:text-[7rem] tracking-tight text-star-white m-0 leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            {titleText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { type: "spring", stiffness: 100, damping: 15 }
                  }
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col gap-4 mt-4"
          >
            <h2 className="font-exo2 text-xl sm:text-2xl text-muted-foreground font-medium">
              Rajshahi University of Engineering &amp; Technology
            </h2>
            <p className="font-space-grotesk text-lg sm:text-xl text-star-white italic max-w-2xl mx-auto">
              "Designing the Future of Mars Exploration — from Bangladesh to the Universe"
            </p>
          </motion.div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full bg-mars-red hover:bg-mars-orange text-white text-sm font-bold tracking-widest px-8 py-6 w-full sm:w-auto overflow-hidden group shadow-[0_0_15px_rgba(193,68,14,0.4)]"
            data-cta="true"
          >
            <Link href="/rover">
              [ EXPLORE THE ROVER ]
              <span className="absolute inset-0 bg-white/20 -translate-x-[150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-2 border-white/20 hover:border-white/50 bg-black/20 hover:bg-white/5 backdrop-blur-sm text-white text-sm font-bold tracking-widest px-8 py-6 w-full sm:w-auto group"
            data-cta="true"
          >
            <Link href="/sponsor">
              [ BECOME A SPONSOR ]
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto"
      >
        <span className="font-jetbrains-mono text-[10px] tracking-widest text-hud-teal uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="text-hud-teal opacity-70" size={16} />
        </motion.div>
      </motion.div>

      {/* HUD Corner Decor */}
      <div className="absolute inset-8 border border-white/5 pointer-events-none rounded-[2rem] max-md:hidden">
         {/* Top Left */}
         <div className="absolute top-[-1px] left-[-1px] w-8 h-8 border-t-2 border-l-2 border-mars-red" />
         {/* Top Right */}
         <div className="absolute top-[-1px] right-[-1px] w-8 h-8 border-t-2 border-r-2 border-mars-red" />
         {/* Bottom Left */}
         <div className="absolute bottom-[-1px] left-[-1px] w-8 h-8 border-b-2 border-l-2 border-mars-red" />
         {/* Bottom Right */}
         <div className="absolute bottom-[-1px] right-[-1px] w-8 h-8 border-b-2 border-r-2 border-mars-red" />
      </div>

    </div>
  );
}
