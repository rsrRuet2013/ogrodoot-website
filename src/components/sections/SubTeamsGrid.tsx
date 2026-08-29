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
    <section className="py-24 md:py-36 relative border-b border-white/10 overflow-hidden z-10 bg-[#050505]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-mars-orange/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 border border-mars-orange/30 rounded-full px-3.5 py-1 text-[11px] font-mono text-mars-orange tracking-[0.25em] uppercase bg-mars-red/10 backdrop-blur-md mb-4">
              <Users size={12} className="text-mars-orange" />
              Specialized Divisions
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase leading-tight m-0">
              ENGINEERING ROSTER
            </h2>
          </div>
          
          <Link 
            href="/team" 
            className="group inline-flex items-center gap-3 font-mono text-xs tracking-widest text-white/70 hover:text-white transition-colors"
          >
            <span>VIEW FULL CREW</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-mars-orange group-hover:text-black group-hover:border-mars-orange transition-all">
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
                <div className="group relative h-[320px] sm:h-[340px] p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-mars-orange/60 transition-all duration-500 shadow-xl overflow-hidden">
                  
                  <div className="relative h-full w-full rounded-xl overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={team.image}
                        alt={team.name}
                        fill
                        className="object-cover transition-all duration-700 ease-out group-hover:scale-105 filter brightness-[0.6] contrast-[1.05]"
                      />
                    </div>
                    
                    {/* Overlay Gradient with Mars Rust */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-[#06080d]/60 to-transparent opacity-95 group-hover:opacity-85 transition-opacity duration-500" />

                    {/* Top Division Code Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full bg-black/70 border border-white/15 text-cyan-300 backdrop-blur-md">
                        {team.code}
                      </span>
                    </div>

                    {/* Arrow Indicator Top Right */}
                    <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white/60 group-hover:text-black group-hover:bg-mars-orange group-hover:border-mars-orange transition-all duration-300 transform group-hover:rotate-45">
                      <ArrowUpRight size={14} />
                    </div>

                    {/* Content Block */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-mars-orange transition-colors">
                        {team.name}
                      </h3>
                      <p className="font-sans text-xs text-white/75 line-clamp-2 leading-relaxed">
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
