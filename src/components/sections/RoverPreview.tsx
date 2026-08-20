"use client";

import { motion } from "framer-motion";
import { fadeUp, slideInLeft } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, Cpu, Radio, BatteryCharging, Crosshair, Wrench, Gauge } from "lucide-react";

export function RoverPreview() {
  const specs = [
    { label: "CHASSIS ARCHITECTURE", value: "6-WHEEL ROCKER BOGIE", icon: Gauge },
    { label: "DEEP SPACE COMMS", value: "5.8GHz / 900MHz (9KM RANGE)", icon: Radio },
    { label: "ROBOTIC MANIPULATOR", value: "6-DOF CUSTOM END EFFECTOR", icon: Wrench },
    { label: "AUTONOMOUS STACK", value: "ROS2 · STEREO VSLAM · LIDAR", icon: Cpu },
    { label: "POWER MATRIX", value: "24V 20Ah HIGH-DISCHARGE LIPO", icon: BatteryCharging },
    { label: "DRY MASS / ENCLOSURE", value: "48.5 KG · IP65 ANALOG SEAL", icon: Crosshair },
  ];

  return (
    <section className="relative py-28 md:py-36 overflow-hidden border-b border-white/10 z-10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[650px] h-[650px] bg-mars-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] bg-mars-orange/10 rounded-full blur-[160px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Content (Text & Specs) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="flex flex-col gap-8 w-full lg:w-1/2 max-w-xl"
        >
          <motion.div variants={slideInLeft} className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 border border-mars-orange/30 rounded-full px-3.5 py-1 text-[11px] font-jetbrains-mono text-mars-orange tracking-[0.25em] uppercase bg-mars-red/10 backdrop-blur-md w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-mars-orange animate-ping" />
              FLAGSHIP ITERATION
            </div>
            <h2 className="font-orbitron font-black text-4xl sm:text-5xl lg:text-6xl text-star-white mars-glow-text leading-none mt-2">
              OGRODOOT <span className="text-transparent bg-clip-text bg-gradient-to-r from-mars-orange to-mars-red">MK-IV</span>
            </h2>
            <p className="font-space-grotesk text-base text-white/80 font-light leading-relaxed">
              Engineered from the ground up for extreme rugged terrain navigation, scientific soil analysis, and high-precision autonomous payload delivery.
            </p>
          </motion.div>

          {/* Double-Bezel HUD Data Grid */}
          <motion.div variants={fadeUp} className="p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 double-bezel">
            <div className="rounded-xl bg-gradient-to-b from-black/80 to-[#0c0503]/90 backdrop-blur-xl border border-white/5 divide-y divide-white/5 overflow-hidden">
              {specs.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-2.5">
                      <Icon size={14} className="text-mars-orange/70 group-hover:text-mars-orange transition-colors" />
                      <span className="font-jetbrains-mono text-[11px] tracking-wider text-[#6C7A89]">{spec.label}</span>
                    </div>
                    <span className="font-jetbrains-mono text-xs font-semibold tracking-wide text-star-white text-right">{spec.value}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Button
              asChild
              size="lg"
              className="group relative rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-mars-orange text-star-white font-bold pl-8 pr-3 py-6 h-auto tracking-[0.2em] text-xs uppercase transition-all duration-300 active:scale-[0.98] double-bezel"
              data-cta="true"
            >
              <Link href="/rover" className="flex items-center gap-4">
                <span>FULL ROVER SPECIFICATIONS</span>
                <span className="w-8 h-8 rounded-full bg-mars-red/20 group-hover:bg-mars-orange group-hover:text-black flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-mars-orange">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Content (Interactive HUD Tactical Scanner) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 aspect-square max-w-[540px] relative mt-8 lg:mt-0"
        >
          {/* Outer Ring & HUD Grid */}
          <div className="relative w-full h-full rounded-[2.5rem] p-2 bg-white/[0.03] border border-white/10 double-bezel overflow-hidden flex items-center justify-center">
            <div className="w-full h-full rounded-[calc(2.5rem-0.5rem)] bg-gradient-to-br from-black/90 via-[#0a0402]/90 to-[#02050a]/90 backdrop-blur-2xl border border-white/5 flex flex-col items-center justify-center p-8 relative overflow-hidden">
              
              {/* Tactical Radar Grid Background */}
              <div className="absolute inset-0 mars-grid-pattern opacity-30" />
              
              {/* Radar Target Rings */}
              <div className="absolute inset-8 rounded-full border border-mars-orange/20 animate-pulse" />
              <div className="absolute inset-20 rounded-full border border-dashed border-hud-teal/25 animate-orbit-spin" style={{ animationDuration: "35s" }} />
              <div className="absolute inset-32 rounded-full border border-white/10" />

              {/* Crosshair Lines */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10" />
              <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />

              {/* Center Hologram Rover Icon */}
              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="relative flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-mars-red/10 border border-mars-red/40 flex items-center justify-center shadow-[0_0_40px_rgba(193,68,14,0.3)]">
                    <Crosshair size={42} className="text-mars-orange animate-spin" style={{ animationDuration: "12s" }} />
                  </div>
                  {/* Ping effect */}
                  <div className="absolute w-36 h-36 rounded-full border border-mars-orange/30 animate-ping" style={{ animationDuration: "3s" }} />
                </div>

                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-hud-teal/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-hud-teal animate-pulse" />
                    <span className="font-jetbrains-mono text-[10px] tracking-[0.25em] text-hud-teal uppercase">
                      TELEMETRY LOCK // MK-IV ACTIVE
                    </span>
                  </div>
                  <p className="font-jetbrains-mono text-xs text-white/60">
                    ANALOG SITE: JEZERO CORRIDOR · LAT 18.38°N
                  </p>
                </div>
              </div>

              {/* HUD Compass / Coordinate Edge Ticks */}
              <div className="absolute top-4 left-6 font-jetbrains-mono text-[10px] text-mars-orange/80 tracking-widest">[N 000°]</div>
              <div className="absolute top-4 right-6 font-jetbrains-mono text-[10px] text-hud-teal/80 tracking-widest">[SYS: OPTIMAL]</div>
              <div className="absolute bottom-4 left-6 font-jetbrains-mono text-[10px] text-[#6C7A89] tracking-widest">FREQ: 5.8 GHz</div>
              <div className="absolute bottom-4 right-6 font-jetbrains-mono text-[10px] text-[#6C7A89] tracking-widest">FPS: 60.0</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
