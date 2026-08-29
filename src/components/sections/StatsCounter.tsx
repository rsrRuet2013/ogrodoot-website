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
  { value: 1, prefix: "#", suffix: "", label: "Champion in Bangladesh", code: "DOM-01", icon: Flag, detail: "IRDC NATIONAL #1" },
];

export function StatsCounter() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-8 border-y border-white/10 relative z-10 overflow-hidden bg-[#050505]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-mars-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {statsData.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-mars-orange/60 transition-all duration-300 shadow-xl"
              >
                <div className="relative p-6 sm:p-7 rounded-xl bg-gradient-to-b from-[#0e121a] to-[#07090f] backdrop-blur-xl border border-white/5 flex flex-col justify-between h-full overflow-hidden">
                  
                  {/* Top HUD Line */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-bold">
                      {stat.code}
                    </span>
                    <Icon size={16} className="text-mars-orange group-hover:rotate-12 transition-transform duration-300" />
                  </div>

                  {/* Stat Value */}
                  <div className="my-5 text-center">
                    <div className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                      {stat.prefix}
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider text-white/90 mt-2">
                      {stat.label}
                    </div>
                  </div>

                  {/* Bottom Telemetry Detail */}
                  <div className="pt-3 border-t border-white/10 text-center font-mono text-[10px] tracking-widest text-white/50">
                    {stat.detail}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
