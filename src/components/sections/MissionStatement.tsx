"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export function MissionStatement() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // SVG line drawing animation based on scroll
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#030303] py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Decorative left border accent */}
      <div className="absolute top-0 bottom-0 left-0 w-1 md:w-2 bg-[var(--color-mars-red)] shadow-[0_0_20px_rgba(193,68,14,0.5)]" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Eyebrow */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-fit mb-8 border border-white/10 rounded-full px-4 py-1.5 text-xs font-jetbrains-mono text-[var(--color-hud-teal)] tracking-[0.2em] uppercase bg-white/5"
        >
          Our Core Directives
        </motion.div>

        {/* Headline */}
        <motion.h2 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="font-exo2 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-16 max-w-4xl"
        >
          Inspiring <span className="text-[var(--color-mars-red)] italic font-light">Innovation.</span><br/>
          Building the Future.
        </motion.h2>

        {/* Two Column Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative">
          
          {/* Animated SVG Divider between columns (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <motion.line 
                x1="0" y1="0" x2="0" y2="100%" 
                stroke="rgba(255,255,255,0.15)" 
                strokeWidth="1"
                style={{ pathLength }}
              />
            </svg>
          </div>

          {/* Left Column: Mission */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-6"
          >
            <h3 className="font-orbitron text-2xl text-[var(--color-mars-orange)] tracking-wider">01. MISSION</h3>
            <p className="font-space-grotesk text-lg text-muted-foreground leading-relaxed">
              To design, manufacture, and operate state-of-the-art Mars rovers capable of traversing analog extraterrestrial terrains. We aim to represent Bangladesh on global stages while pushing the boundaries of robotics and space exploration technologies among undergraduates.
            </p>
          </motion.div>

          {/* Right Column: Vision */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
             <h3 className="font-orbitron text-2xl text-[var(--color-mars-orange)] tracking-wider">02. VISION</h3>
             <p className="font-space-grotesk text-lg text-muted-foreground leading-relaxed">
               Establishing a self-sustaining ecosystem of aerospace engineering within our university. We envision Team Ogrodoot as not just a competition team, but an incubator for the next generation of engineers who will actively contribute to humanity's journey to the stars.
             </p>
          </motion.div>
        
        </div>
      </div>
    </section>
  );
}
