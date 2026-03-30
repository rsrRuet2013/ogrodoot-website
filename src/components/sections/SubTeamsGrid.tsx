"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const subTeams = [
  {
    id: "mechanical",
    name: "Mechanical Design & Fabrication",
    role: "Chassis, suspension & robotic arm engineering",
    image: "/photots/mechanical_team.JPG",
  },
  {
    id: "electrical",
    name: "Electrical",
    role: "Power distribution, custom PCBs & circuitry",
    image: "/photots/electrical_team.JPG",
  },
  {
    id: "software",
    name: "Software & Autonomous",
    role: "Navigation, computer vision & rover telemetry",
    image: "/photots/softwate_aitonomous_team.JPG", // Using exact typo from public folder
  },
  {
    id: "science",
    name: "Science",
    role: "Soil sample analysis & astrobiology protocols",
    image: "/photots/science_team.JPG",
  },
  {
    id: "communication",
    name: "Communication",
    role: "Antenna design & long-range data transmission",
    // We don't have a comms photo yet, using leads as placeholder
    image: "/photots/leads_only.JPG", 
  },
  {
    id: "media",
    name: "Media & Logistics",
    role: "Sponsorships, PR & mission operations",
    // Placeholder using cover photo
    image: "/photots/Team_Ogrodoot_Cover.png",
  },
];

export function SubTeamsGrid() {
  return (
    <section className="bg-[#02050A] py-24 md:py-32 relative border-b border-white/5">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
               <span className="w-8 h-px bg-[var(--color-mars-orange)]" />
               <span className="font-jetbrains-mono text-[var(--color-mars-orange)] text-xs tracking-[0.3em] uppercase">Departments</span>
            </div>
            <h2 className="font-orbitron font-bold text-4xl sm:text-5xl lg:text-6xl text-star-white">THE CREW</h2>
          </div>
          
          <Link 
            href="/team" 
            className="group flex items-center gap-2 font-jetbrains-mono text-xs tracking-widest text-[#6C7A89] hover:text-white transition-colors"
          >
            VIEW FULL ROSTER
            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowUpRight size={12} />
            </div>
          </Link>
        </motion.div>

        {/* 3x2 Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {subTeams.map((team) => (
            <motion.div key={team.id} variants={fadeUp}>
              <Link href={`/team#${team.id}`} className="block h-full outline-none">
                <div className="group relative h-[320px] rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-colors pointer-events-auto">
                  
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={team.image}
                      alt={team.name}
                      fill
                      className="object-cover transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:filter group-hover:brightness-110 filter brightness-[0.6] grayscale-[20%]"
                    />
                  </div>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02050A] via-[#02050A]/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

                  {/* Red highlight bottom border */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-mars-red)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] z-20" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                    <h3 className="font-exo2 text-2xl font-bold text-white mb-2 group-hover:-translate-y-2 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      {team.name}
                    </h3>
                    <div className="overflow-hidden">
                      <p className="font-space-grotesk text-sm text-[var(--color-hud-teal)] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-[cubic-bezier(0.32,0.72,0,1)]">
                        {team.role}
                      </p>
                    </div>

                    {/* HUD Bracket Decor */}
                    <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-white/30 group-hover:border-mars-red transition-colors" />
                    <div className="absolute bottom-8 right-8 text-white/20 group-hover:text-white transition-colors">
                      <ArrowUpRight size={20} className="-translate-x-4 translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
