"use client";

import { motion } from "framer-motion";
import { fadeUp, slideInLeft } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export function RoverPreview() {
  const specs = [
    { label: "MODEL", value: "MK-IV OG-24" },
    { label: "DRIVE", value: "6-WHEEL ROCKER BOGIE" },
    { label: "COMMS", value: "5.8GHz / 900MHz (9km range)" },
    { label: "ARM", value: "6-DOF WITH CUSTOM END EFFECTOR" },
    { label: "POWER", value: "24V 20Ah LIPO" },
    { label: "MASS", value: "48.5 kg" },
  ];

  return (
    <section className="relative min-h-[80vh] bg-[#02050A] py-24 overflow-hidden border-b border-[var(--color-crater-gray)]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-[70%] -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--color-mars-red)] opacity-5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10 h-full">
        
        {/* Left Content (Text & Specs) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="flex flex-col gap-10 w-full lg:w-5/12 max-w-xl"
        >
          <motion.div variants={slideInLeft} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-hud-teal" />
              <span className="font-jetbrains-mono text-hud-teal text-xs tracking-[0.3em] uppercase">Current Iteration</span>
            </div>
            <h2 className="font-orbitron font-bold text-4xl sm:text-5xl lg:text-6xl text-star-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              OGRODOOT <span className="text-transparent bg-clip-text bg-gradient-to-r from-mars-red to-mars-orange">MK-IV</span>
            </h2>
          </motion.div>

          {/* HUD Data Grid */}
          <motion.div variants={fadeUp} className="flex flex-col gap-px bg-white/10 p-px rounded-xl border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-sm overflow-hidden">
            {specs.map((spec, i) => (
              <div key={i} className="flex flex-row justify-between items-center px-4 py-3 bg-[var(--color-deep-space)]/90 hover:bg-white/5 transition-colors">
                <span className="font-jetbrains-mono text-xs tracking-widest text-[#6C7A89]">{spec.label}</span>
                <span className="font-jetbrains-mono text-sm tracking-wide text-star-white">{spec.value}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}>
            <Button
              asChild
              className="group relative rounded-full bg-transparent border border-white/20 hover:border-mars-red text-star-white hover:text-mars-red font-medium px-8 py-6 h-auto tracking-widest text-sm transition-all overflow-hidden"
              data-cta="true"
            >
              <Link href="/rover">
                <span className="relative z-10 flex items-center gap-4">
                  FULL ROVER SHOWCASE
                  <MoveRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-white/5 -translate-x-[150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Content (3D Placeholder wireframe UI) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-7/12 aspect-square max-h-[600px] relative mt-12 lg:mt-0 lg:ml-auto"
        >
          {/* Wireframe placeholder for Rover */}
          <div className="absolute inset-0 border border-hud-teal/20 rounded-full flex flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--color-crater-gray)_0%,_transparent_70%)] opacity-80 backdrop-blur-md overflow-hidden relative group">
            
            {/* Crosshairs */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-hud-teal/20 group-hover:bg-hud-teal/40 transition-colors" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-hud-teal/20 group-hover:bg-hud-teal/40 transition-colors" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-hud-teal/50 rounded-full group-hover:scale-110 transition-transform duration-700" />
            
            {/* Spinning Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border-t border-b border-mars-red/30 rounded-full animate-orbit-spin" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-l border-r border-[#6C7A89]/30 rounded-full animate-orbit-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />

            <div className="relative z-10 text-center flex flex-col items-center gap-6 mix-blend-screen">
              <svg className="w-32 h-32 md:w-48 md:h-48 text-hud-teal/40 animate-pulse-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="0.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1 2 1M4 7l2 1 2-1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
              <div className="font-jetbrains-mono text-hud-teal tracking-[0.2em] text-sm bg-black/50 px-4 py-2 border border-hud-teal/30">
                AWAITING_TELEMETRY_DATA
                <span className="w-2 h-4 bg-hud-teal inline-block ml-2 animate-blink-cursor" />
              </div>
            </div>
            
            {/* Edge ticks */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 font-jetbrains-mono text-[10px] text-hud-teal/50">000</div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-jetbrains-mono text-[10px] text-hud-teal/50">180</div>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 font-jetbrains-mono text-[10px] text-hud-teal/50">270</div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 font-jetbrains-mono text-[10px] text-hud-teal/50">090</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
