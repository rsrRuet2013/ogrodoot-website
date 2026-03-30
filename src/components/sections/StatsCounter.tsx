"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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
        
        // easeOutQuart
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
  { value: 8, suffix: "+", label: "Years of Innovation" },
  { value: 5, suffix: "", label: "International Competitions" },
  { value: 11, suffix: "", prefix: "#", label: "Global Rank URC 2023" },
  { value: 1, prefix: "#", suffix: "", label: "In BD IRDC 2023" },
];

export function StatsCounter() {
  return (
    <section className="bg-deep-space py-20 px-4 md:px-8 border-y border-white/5 relative z-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {statsData.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 hover:border-[var(--color-mars-red)] transition-all duration-300 shadow-none hover:shadow-[0_10px_40px_rgba(193,68,14,0.15)] overflow-hidden"
            >
              {/* Scanline background effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20 group-hover:opacity-40 transition-opacity" />
              
              {/* HUD corner brackets on hover */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-transparent group-hover:border-[var(--color-mars-red)] transition-colors opacity-0 group-hover:opacity-100" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-transparent group-hover:border-[var(--color-mars-red)] transition-colors opacity-0 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-transparent group-hover:border-[var(--color-mars-red)] transition-colors opacity-0 group-hover:opacity-100" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-transparent group-hover:border-[var(--color-mars-red)] transition-colors opacity-0 group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col items-center justify-center text-center gap-2">
                <div className="font-orbitron font-bold tracking-tighter text-5xl lg:text-6xl text-star-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  {stat.prefix}
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-jetbrains-mono text-sm uppercase tracking-widest text-[var(--color-hud-teal)] mt-4">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
