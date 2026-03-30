"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export function SponsorshipCTA() {
  const packages = [
    { title: "SILVER", amount: "$500+", color: "zinc", icon: "🪙" },
    { title: "GOLD", amount: "$1500+", color: "amber", icon: "🥇" },
    { title: "PLATINUM", amount: "$3000+", color: "indigo", icon: "💎" },
  ];

  return (
    <section className="bg-deep-space py-24 md:py-32 relative overflow-hidden">
      {/* Decorative background orbits */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 opacity-30 animate-orbit-spin pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border border-[var(--color-mars-red)] opacity-5 animate-orbit-spin pointer-events-none" style={{ animationDuration: '40s', animationDirection: 'reverse'}} />

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        
        {/* Headache */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="flex flex-col items-center gap-6 mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-block relative">
            <span className="font-orbitron font-extrabold text-5xl md:text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-star-white to-[#6C7A89] inline-block">
              JOIN THE MISSION
            </span>
            <div className="absolute -inset-4 bg-[var(--color-mars-red)] opacity-10 blur-xl rounded-full" />
          </div>
          
          <p className="font-space-grotesk text-lg text-muted-foreground">
            Partner with Bangladesh's leading Mars rover team and gain unparalleled global visibility among the next generation of engineers and space enthusiasts.
          </p>
        </motion.div>

        {/* Tiers Preview */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
        >
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`group flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-300 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110 drop-shadow-lg">{pkg.icon}</div>
              
              <div className="flex flex-col gap-1 items-center mt-2">
                <h3 className="font-orbitron font-bold tracking-widest text-star-white">{pkg.title}</h3>
                <span className="font-jetbrains-mono text-sm tracking-wide text-[var(--color-hud-teal)]">{pkg.amount}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
        >
          <Button
            asChild
            size="lg"
            className="rounded-full bg-[var(--color-mars-red)] hover:bg-[var(--color-mars-orange)] text-white text-sm font-bold tracking-widest px-10 py-8 shadow-[0_4px_30px_rgba(193,68,14,0.3)] hover:shadow-[0_4px_50px_rgba(193,68,14,0.5)] transition-all group overflow-hidden"
            data-cta="true"
          >
            <Link href="/sponsor">
              <span className="relative z-10 flex items-center gap-3">
                VIEW SPONSORSHIP PACKAGES
                <MoveRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-white/20 -translate-x-[150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
