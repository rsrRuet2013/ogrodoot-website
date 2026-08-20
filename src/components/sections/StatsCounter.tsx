"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Compass, Flag, Zap } from "lucide-react";

function CountUp({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      let animationFrame: number;

      const animate = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / (duration * 1000), 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        
        setCount(Math.floor(ease * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const statsData = [
  { value: 8, suffix: "+", label: "Years of Active R&D", code: "EXP-08", icon: Zap, detail: "EST. 2017 AT RUET" },
  { value: 5, suffix: "", label: "Global Expeditions", code: "CAM-05", icon: Compass, detail: "URC, ERC, IRC & IRDC" },
  { value: 11, suffix: "", prefix: "#", label: "Global Ranking", code: "RNK-11", icon: Award, detail: "IRDC / URC ARENA" },
  { value: 1, prefix: "#", suffix: "", label: "Champion in Bangladesh", code: "DOM-01", icon: Flag, detail: "IRDC 2023 NATIONAL #1" },
];

export function StatsCounter() {
  return (
    <section className="py-24 px-4 sm:px-6 md:px-8 border-y border-white/10 relative z-10 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-mars-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative p-1.5 rounded-[1.75rem] bg-white/[0.03] border border-white/10 hover:border-mars-orange/60 transition-all duration-500 double-bezel"
              >
                <div className="relative p-6 sm:p-8 rounded-[calc(1.75rem-0.375rem)] bg-gradient-to-b from-black/80 to-[#0d0603]/90 backdrop-blur-xl border border-white/5 flex flex-col justify-between h-full overflow-hidden">
                  
                  {/* Top HUD Line */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <span className="font-jetbrains-mono text-[10px] uppercase tracking-[0.2em] text-hud-teal">
                      {stat.code}
                    </span>
                    <Icon size={16} className="text-mars-orange group-hover:rotate-12 transition-transform duration-300" />
                  </div>

                  {/* Stat Value */}
                  <div className="my-6 text-center">
                    <div className="font-orbitron font-black text-5xl lg:text-6xl text-star-white mars-glow-text leading-tight">
                      {stat.prefix}
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="font-exo2 font-semibold text-sm uppercase tracking-wider text-star-white/90 mt-2">
                      {stat.label}
                    </div>
                  </div>

                  {/* Bottom Telemetry Detail */}
                  <div className="pt-3 border-t border-white/5 text-center font-jetbrains-mono text-[10px] tracking-widest text-[#6C7A89]">
                    {stat.detail}
                  </div>

                  {/* HUD Corner Accents */}
                  <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-mars-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-hud-teal opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
