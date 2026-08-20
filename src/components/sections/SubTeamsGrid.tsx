"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";

const subTeams = [
  {
    id: "mechanical",
    code: "DIV-01",
    name: "Mechanical & Fabrication",
    role: "Chassis, rocker-bogie suspension & 6-DOF robotic arm",
    image: "/photots/mechanical_team.JPG",
  },
  {
    id: "electrical",
    code: "DIV-02",
    name: "Power & Avionics",
    role: "Power distribution, custom BMS PCBs & high-power motor drivers",
    image: "/photots/electrical_team.JPG",
  },
  {
    id: "software",
    code: "DIV-03",
    name: "Software & AI Autonomy",
    role: "ROS2 navigation, stereo VSLAM, path planning & telemetry HUD",
    image: "/photots/softwate_aitonomous_team.JPG",
  },
  {
    id: "science",
    code: "DIV-04",
    name: "Astrobiology & Science",
    role: "Onboard soil spectrometry, Raman sensor analysis & bio-assays",
    image: "/photots/science_team.JPG",
  },
  {
    id: "communication",
    code: "DIV-05",
    name: "Deep Space Comms",
    role: "9km UHF/5.8GHz transmission, antenna tracking & mesh nodes",
    image: "/photots/leads_only.JPG", 
  },
  {
    id: "media",
    code: "DIV-06",
    name: "Mission Ops & Media",
    role: "Sponsorship management, public outreach & campaign logistics",
    image: "/photots/Team_Ogrodoot_Cover.png",
  },
];

export function SubTeamsGrid() {
  return (
    <section className="py-28 md:py-36 relative border-b border-white/10 overflow-hidden z-10">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-mars-orange/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 border border-mars-orange/30 rounded-full px-3.5 py-1 text-[11px] font-jetbrains-mono text-mars-orange tracking-[0.25em] uppercase bg-mars-red/10 backdrop-blur-md mb-4">
              <Users size={12} className="text-mars-orange" />
              Specialized Divisions
            </div>
            <h2 className="font-orbitron font-black text-4xl sm:text-5xl lg:text-6xl text-star-white mars-glow-text">
              ENGINEERING ROSTER
            </h2>
          </div>
          
          <Link 
            href="/team" 
            className="group flex items-center gap-3 font-jetbrains-mono text-xs tracking-widest text-star-white/70 hover:text-star-white transition-colors"
          >
            <span>VIEW FULL CREW</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowUpRight size={14} />
            </div>
          </Link>
        </motion.div>

        {/* 3x2 Bento Grid */}
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
                <div className="group relative h-[340px] p-1.5 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-mars-orange/60 transition-all duration-500 double-bezel overflow-hidden">
                  
                  <div className="relative h-full w-full rounded-[calc(2rem-0.375rem)] overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={team.image}
                        alt={team.name}
                        fill
                        className="object-cover transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 filter brightness-[0.55] contrast-[1.1] grayscale-[15%] group-hover:grayscale-0 group-hover:brightness-[0.75]"
                      />
                    </div>
                    
                    {/* Overlay Gradient with Mars Rust */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-95 group-hover:opacity-75 transition-opacity duration-500" />

                    {/* Top Division Code Tag */}
                    <div className="absolute top-5 left-5 z-10">
                      <span className="font-jetbrains-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full bg-black/60 border border-white/10 text-hud-teal backdrop-blur-md">
                        {team.code}
                      </span>
                    </div>

                    {/* Arrow Indicator Top Right */}
                    <div className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-black group-hover:bg-mars-orange group-hover:border-mars-orange transition-all duration-300 transform group-hover:rotate-45">
                      <ArrowUpRight size={14} />
                    </div>

                    {/* Bottom Red Mars Accent Line */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-mars-red to-mars-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20" />

                    {/* Content Block */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                      <h3 className="font-exo2 text-2xl font-bold text-star-white mb-2 leading-tight group-hover:text-mars-orange transition-colors">
                        {team.name}
                      </h3>
                      <p className="font-space-grotesk text-xs text-white/75 line-clamp-2 leading-relaxed">
                        {team.role}
                      </p>
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
