"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  ArrowUpRight, 
  Sparkles, 
  Layers,
  X
} from "lucide-react";

type CompetitionItem = {
  _id?: string;
  title: string;
  organizer?: string;
  location: string;
  year: string;
  category: "International" | "National";
  result?: string;
  roverVersion?: string;
  coverPhoto: string;
  description?: string;
  status?: string;
};

const DEFAULT_COMPETITIONS: CompetitionItem[] = [
  {
    _id: "urc",
    title: "University Rover Challenge (URC)",
    organizer: "The Mars Society",
    location: "Hanksville, Utah, USA",
    year: "2024–2026",
    category: "International",
    result: "Pre-URC Contender",
    roverVersion: "Ogrodoot MKI4",
    coverPhoto: "/photots/mars_rover.jpg",
    description: "Flagship global robotics tournament held at the Mars Desert Research Station in the Utah badlands.",
  },
  {
    _id: "arc",
    title: "Anatolian Rover Challenge (ARC)",
    organizer: "UKET Space Society",
    location: "Cappadocia, Turkey",
    year: "2023–2025",
    category: "International",
    result: "International Finalist",
    roverVersion: "Ogrodoot MKI3",
    coverPhoto: "/photots/rover.png",
    description: "Analog terrain challenge testing steep quarry climbing, teleoperation, and payload retrieval.",
  },
  {
    _id: "irdc",
    title: "International Rover Design Challenge (IRDC)",
    organizer: "Space Robotics Society",
    location: "Global Virtual Arena",
    year: "2023",
    category: "International",
    result: "1st in Bangladesh · 11th Worldwide",
    roverVersion: "Ogrodoot MKI3",
    coverPhoto: "/photots/Team_Ogrodoot_Cover.png",
    description: "Global aerospace design review evaluating complete rover mechanics, thermal systems, and biosignature assays.",
  },
  {
    _id: "erc",
    title: "European Rover Challenge (ERC)",
    organizer: "European Space Foundation",
    location: "Kielce, Poland",
    year: "2019",
    category: "International",
    result: "European Competitor",
    roverVersion: "Ogrodoot MKI2",
    coverPhoto: "/photots/team.jpg",
    description: "Contested on Europe's premier artificial Mars yard simulating Martian craters and rock fields.",
  },
  {
    _id: "nat-1",
    title: "RUET National Tech Fest Rover Track",
    organizer: "RUET Robotics Society",
    location: "Rajshahi, Bangladesh",
    year: "2023",
    category: "National",
    result: "Champion (1st Place)",
    roverVersion: "Ogrodoot MKI3",
    coverPhoto: "/photots/leads_only.JPG",
    description: "First place in the national planetary rover traverse and autonomous obstacle clearance challenge.",
  },
  {
    _id: "nat-2",
    title: "National Robotics Championship (IUT)",
    organizer: "Islamic University of Technology",
    location: "Gazipur, Bangladesh",
    year: "2022",
    category: "National",
    result: "Best Hardware & Chassis Design",
    roverVersion: "Ogrodoot MKI2",
    coverPhoto: "/photots/rover.png",
    description: "Top award for custom Rocker-Bogie mechanical chassis articulation and power distribution.",
  },
];

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<CompetitionItem[]>(DEFAULT_COMPETITIONS);
  const [selectedCategory, setSelectedCategory] = useState<"All" | "International" | "National">("All");
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/competitions")
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data.items) && data.items.length > 0) {
          setCompetitions(data.items);
        }
      })
      .catch(() => {
        // Fallback preserved
      });
  }, []);

  const filteredCompetitions = competitions.filter((comp) => {
    if (selectedCategory === "All") return true;
    return comp.category === selectedCategory;
  });

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#050505] text-white pt-28 pb-24">
      {/* Subtle Mars Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-mars-red/10 via-transparent to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs text-white/50">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="text-white/30" />
          <span className="text-white/80 font-medium">Competitions</span>
        </div>

        {/* Minimal Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/[0.08]">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-mars-orange font-semibold">
              Global & National Arenas
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
              Rover Competitions
            </h1>
            <p className="text-sm text-white/65 max-w-xl font-normal leading-relaxed">
              From international Mars analog challenges to premier national robotics tournaments, Team Ogrodoot tests hardware resilience and autonomous navigation worldwide.
            </p>
          </div>

          {/* Clean Segmented Category Filter */}
          <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 w-fit">
            {(["All", "International", "National"] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "text-white font-semibold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeCompTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-mars-red to-mars-orange shadow-md -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Competitions Grid with Smooth Scroll Animations */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCompetitions.map((comp, idx) => (
              <motion.div
                key={comp._id ?? `${comp.title}-${idx}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="group relative flex flex-col rounded-2xl sm:rounded-3xl bg-[#090b10] border border-white/[0.08] hover:border-mars-orange/40 overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Photo Frame */}
                <div 
                  className="relative aspect-[16/10] w-full overflow-hidden bg-black cursor-pointer"
                  onClick={() => setActivePhoto(comp.coverPhoto)}
                >
                  <Image
                    src={comp.coverPhoto}
                    alt={comp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-transparent opacity-60" />

                  {/* Top Bar Chips */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white">
                      {comp.category}
                    </span>
                    <span className="font-mono text-[10px] text-white/80 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm">
                      {comp.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-white/50">
                      <MapPin size={12} className="text-mars-orange shrink-0" />
                      <span>{comp.location}</span>
                    </div>

                    {/* Competition Name */}
                    <h3 className="font-heading font-black text-lg text-white group-hover:text-mars-orange transition-colors tracking-tight">
                      {comp.title}
                    </h3>

                    {/* Short Description */}
                    {comp.description && (
                      <p className="text-xs text-white/60 font-sans leading-relaxed line-clamp-2">
                        {comp.description}
                      </p>
                    )}
                  </div>

                  {/* Standing & Rover Model Chips */}
                  <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                    {comp.result ? (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-mars-orange bg-mars-orange/10 border border-mars-orange/20 px-2.5 py-1 rounded-md">
                        <Trophy size={11} className="shrink-0" />
                        <span className="truncate">{comp.result}</span>
                      </span>
                    ) : (
                      <span />
                    )}

                    {comp.roverVersion && (
                      <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                        {comp.roverVersion}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Clean Link to Events */}
        <div className="mt-16 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-white/60 hover:text-mars-orange transition-colors"
          >
            <span>Looking for workshops & seminars? View Team Events</span>
            <ChevronRight size={14} />
          </Link>
        </div>

      </div>

      {/* Lightbox Photo Preview */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
          onClick={() => setActivePhoto(null)}
        >
          <button
            type="button"
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            aria-label="Close photo"
          >
            <X size={20} />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={activePhoto} alt="Competition Preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" />
          </div>
        </div>
      )}
    </main>
  );
}
