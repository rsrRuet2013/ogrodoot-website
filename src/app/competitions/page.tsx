"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Trophy, 
  MapPin, 
  ChevronRight, 
  X,
  Compass,
  Cpu
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  updatedAt?: string;
};

const DEFAULT_COMPETITIONS: CompetitionItem[] = [
  {
    _id: "comp-urc",
    title: "University Rover Challenge (URC)",
    organizer: "The Mars Society",
    location: "Hanksville, Utah, USA",
    year: "2024–2026",
    category: "International",
    result: "Pre-URC Contender",
    roverVersion: "Ogrodoot MKI4",
    coverPhoto: "/photots/mars_rover.jpg",
    description: "Flagship global robotics tournament held at the Mars Desert Research Station (MDRS) in Utah.",
  },
  {
    _id: "comp-arc",
    title: "Anatolian Rover Challenge (ARC)",
    organizer: "UKET Space Society",
    location: "Cappadocia, Turkey",
    year: "2023–2025",
    category: "International",
    result: "International Finalist",
    roverVersion: "Ogrodoot MKI3",
    coverPhoto: "/photots/rover.png",
    description: "Analog terrain challenge testing steep quarry climbing, teleoperation, and sample analysis.",
  },
  {
    _id: "comp-irdc",
    title: "International Rover Design Challenge (IRDC)",
    organizer: "Space Robotics Society",
    location: "Global Virtual Arena",
    year: "2023",
    category: "International",
    result: "1st in Bangladesh · 11th Worldwide",
    roverVersion: "Ogrodoot MKI3",
    coverPhoto: "/photots/Team_Ogrodoot_Cover.png",
    description: "Aerospace design review evaluating complete rover mechanics, thermal systems, and biosignature assays.",
  },
  {
    _id: "comp-erc",
    title: "European Rover Challenge (ERC)",
    organizer: "European Space Foundation",
    location: "Kielce, Poland",
    year: "2019",
    category: "International",
    result: "European Competitor",
    roverVersion: "Ogrodoot MKI2",
    coverPhoto: "/photots/team.jpg",
    description: "Europe's premier rover competition contested on an artificial Mars yard replicating red planet craters.",
  },
  {
    _id: "comp-nat-1",
    title: "RUET National Tech Fest Rover Track",
    organizer: "RUET Robotics Society",
    location: "Rajshahi, Bangladesh",
    year: "2023",
    category: "National",
    result: "Champion (1st Place)",
    roverVersion: "Ogrodoot MKI3",
    coverPhoto: "/photots/leads_only.JPG",
    description: "Autonomous obstacle avoidance and extreme traverse on analog obstacle courses.",
  },
  {
    _id: "comp-nat-2",
    title: "National Robotics Championship (IUT)",
    organizer: "Islamic University of Technology",
    location: "Gazipur, Bangladesh",
    year: "2022",
    category: "National",
    result: "Best Hardware & Chassis Design",
    roverVersion: "Ogrodoot MKI2",
    coverPhoto: "/photots/rover.png",
    description: "Awarded top honor for custom Rocker-Bogie mechanical chassis articulation and power distribution.",
  },
];

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<CompetitionItem[]>(DEFAULT_COMPETITIONS);
  const [selectedCategory, setSelectedCategory] = useState<"All" | "International" | "National">("All");
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/competitions", { cache: "no-store" })
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

  // GSAP Entrance & Scroll Animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header typography animation
      gsap.from(".comp-header-anim", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Filter tabs animation
      gsap.from(".comp-filter-anim", {
        opacity: 0,
        scale: 0.94,
        duration: 0.6,
        delay: 0.2,
        ease: "back.out(1.5)",
      });

      // Cards scroll stagger
      if (gridRef.current) {
        gsap.from(".comp-card-item", {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
          opacity: 0,
          y: 35,
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [competitions, selectedCategory]);

  const filteredCompetitions = competitions.filter((comp) => {
    if (selectedCategory === "All") return true;
    return comp.category === selectedCategory;
  });

  return (
    <main ref={containerRef} className="relative min-h-[100dvh] overflow-hidden bg-[#050505] text-white pt-28 pb-24">
      {/* Subtle Mars Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-mars-red/15 via-transparent to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="comp-header-anim flex items-center gap-2 mb-8 text-xs text-white/50">
          <Link href="/" className="hover:text-mars-orange transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="text-white/30" />
          <span className="text-white/90 font-medium">Competitions</span>
        </div>

        {/* Minimal Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="comp-header-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mars-orange/10 border border-mars-orange/30 text-mars-orange font-mono text-[11px] font-semibold uppercase tracking-[0.2em]">
              <Compass size={12} className="text-mars-orange" />
              <span>International & National Campaigns</span>
            </div>
            <h1 className="comp-header-anim font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
              Rover Competitions
            </h1>
            <p className="comp-header-anim text-sm text-white/65 max-w-xl font-normal leading-relaxed">
              From global Mars analog challenges to national robotics tracks, Team Ogrodoot deploys rugged hardware, ROS2 autonomy, and life-detection science stacks.
            </p>
          </div>

          {/* Segmented Category Filter */}
          <div className="comp-filter-anim flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 w-fit">
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

        {/* Competitions Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCompetitions.map((comp, idx) => (
              <motion.div
                key={comp._id ?? `${comp.title}-${idx}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="comp-card-item group relative flex flex-col rounded-2xl sm:rounded-3xl bg-[#080b12] border border-white/[0.08] hover:border-mars-orange/40 overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Photo Frame */}
                <div 
                  className="relative aspect-[16/10] w-full overflow-hidden bg-black cursor-pointer"
                  onClick={() => setActivePhoto(comp.coverPhoto || "/photots/mars_rover.jpg")}
                >
                  <Image
                    src={comp.coverPhoto || "/photots/mars_rover.jpg"}
                    alt={comp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-transparent to-transparent opacity-60" />

                  {/* Top Bar Chips */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white">
                      {comp.category}
                    </span>
                    <span className="font-mono text-[10px] text-white/90 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/10">
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
                      <p className="text-xs text-white/65 font-sans leading-relaxed line-clamp-2">
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
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                        <Cpu size={10} className="text-white/30" />
                        <span>{comp.roverVersion}</span>
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Clean Link to Events */}
        <div className="mt-20 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-white/60 hover:text-mars-orange transition-colors"
          >
            <span>Interested in workshops, recruitment & field seminars? View Team Events</span>
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
