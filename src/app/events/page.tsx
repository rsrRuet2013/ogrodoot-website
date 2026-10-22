"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Calendar, 
  MapPin, 
  ChevronRight, 
  ArrowUpRight, 
  Sparkles,
  X,
  Radio
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type EventItem = {
  _id?: string;
  title: string;
  description: string;
  date: string;
  location: string;
  status: "upcoming" | "completed";
  coverPhoto: string;
  registrationLink?: string;
  caption?: string;
  category?: string;
};

const DEFAULT_UPCOMING: EventItem = {
  _id: "default-upcoming-1",
  title: "Recruitment 4.0: Mars Rover Mission Call",
  description:
    "Annual recruitment session and technical onboarding for prospective mechanical, electrical, software, and science team members at RUET.",
  date: "September 30, 2026",
  location: "RUET Campus, Rajshahi",
  status: "upcoming",
  coverPhoto: "/photots/mars_rover.jpg",
  registrationLink: "https://team-ogrodoot-recruitment.ai.studio/",
  category: "Recruitment",
};

const DEFAULT_COMPLETED: EventItem[] = [
  {
    _id: "default-past-1",
    title: "Autonomous Navigation & ROS2 Hands-on Workshop",
    description: "Technical training on LiDAR point clouds, SLAM mapping, and micro-ROS microcontroller interfacing.",
    date: "July 2025",
    location: "CSE Seminar Room, RUET",
    status: "completed",
    coverPhoto: "/photots/leads_only.JPG",
    category: "Workshop",
  },
  {
    _id: "default-past-2",
    title: "Space Exploration & Astrobiology Symposium",
    description: "Colloquium exploring biosignature detection methods, soil chemical assays, and planetary geology.",
    date: "February 2024",
    location: "ME Conference Hall, RUET",
    status: "completed",
    coverPhoto: "/photots/team.jpg",
    category: "Symposium",
  },
  {
    _id: "default-past-3",
    title: "Rocker-Bogie Chassis Fabrication & CAD Bootcamp",
    description: "Chassis prototyping, CNC milling, and finite element stress analysis for aspiring rover builders.",
    date: "October 2023",
    location: "Central Machine Shop, RUET",
    status: "completed",
    coverPhoto: "/photots/rover.png",
    category: "Bootcamp",
  },
  {
    _id: "default-past-4",
    title: "Youth STEM & Space Robotics Outreach",
    description: "Live rover demonstrations and aerospace tech talks for local high school and college students.",
    date: "May 2023",
    location: "Rajshahi Collegiate School",
    status: "completed",
    coverPhoto: "/photots/Team_Ogrodoot_Cover.png",
    category: "Outreach",
  },
];

export default function EventsPage() {
  const [upcoming, setUpcoming] = useState<EventItem | null>(DEFAULT_UPCOMING);
  const [completed, setCompleted] = useState<EventItem[]>(DEFAULT_COMPLETED);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/events", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        if (data.upcoming && data.upcoming.title) {
          setUpcoming(data.upcoming);
        }
        if (Array.isArray(data.completed) && data.completed.length > 0) {
          setCompleted(data.completed);
        }
      })
      .catch(() => {
        // Fallback preserved
      });
  }, []);

  // GSAP Entrance & ScrollTrigger animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(".event-header-anim", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Featured card pop
      gsap.from(".event-featured-card", {
        opacity: 0,
        scale: 0.96,
        y: 35,
        duration: 0.9,
        delay: 0.25,
        ease: "power2.out",
      });

      // Archive grid scroll stagger
      if (cardsRef.current) {
        gsap.from(".event-archive-card", {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [completed]);

  return (
    <main ref={containerRef} className="relative min-h-[100dvh] overflow-hidden bg-[#050505] text-white pt-28 pb-24">
      {/* Ambient Mars Deep Space Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-mars-red/15 via-transparent to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="event-header-anim flex items-center gap-2 mb-8 text-xs text-white/50">
          <Link href="/" className="hover:text-mars-orange transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="text-white/30" />
          <span className="text-white/90 font-medium">Events</span>
        </div>

        {/* Minimal Hero Header */}
        <div className="mb-14 pb-8 border-b border-white/[0.08]">
          <div className="event-header-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mars-orange/10 border border-mars-orange/30 text-mars-orange font-mono text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">
            <Radio size={12} className="animate-pulse text-mars-orange" />
            <span>Field Trials & Workshops</span>
          </div>
          <h1 className="event-header-anim font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
            Team Events
          </h1>
          <p className="event-header-anim mt-3 text-sm text-white/65 max-w-xl font-normal leading-relaxed">
            University outreach, hands-on robotics workshops, technical testing, and team field sessions organized by Team Ogrodoot at RUET.
          </p>
        </div>

        {/* UPCOMING FEATURED EVENT */}
        {upcoming && (
          <section className="event-featured-card mb-20">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#080b12] shadow-2xl hover:border-mars-orange/40 transition-colors duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                
                {/* Photo Frame (7 cols) */}
                <div 
                  className="relative lg:col-span-7 min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] overflow-hidden bg-black cursor-pointer group"
                  onClick={() => setActivePhoto(upcoming.coverPhoto || "/photots/mars_rover.jpg")}
                >
                  <Image
                    src={upcoming.coverPhoto || "/photots/mars_rover.jpg"}
                    alt={upcoming.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-transparent to-transparent lg:hidden" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-mars-orange text-black shadow-lg flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                      <span>Upcoming Event</span>
                    </span>
                    {upcoming.category && (
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white/90">
                        {upcoming.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details Section (5 cols) */}
                <div className="p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Meta line: Date & Venue */}
                    <div className="space-y-2 border-b border-white/[0.08] pb-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-mars-orange">
                        <Calendar size={13} className="shrink-0" />
                        <span className="font-bold">{upcoming.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <MapPin size={13} className="text-white/40 shrink-0" />
                        <span>{upcoming.location}</span>
                      </div>
                    </div>

                    <h2 className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight uppercase leading-snug">
                      {upcoming.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                      {upcoming.description}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-6 mt-6 border-t border-white/[0.08]">
                    {upcoming.registrationLink ? (
                      <a
                        href={upcoming.registrationLink}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center justify-between gap-4 w-full sm:w-auto rounded-full bg-gradient-to-r from-mars-red to-mars-orange pl-5 pr-2 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>Register Now</span>
                        <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                          <ArrowUpRight size={14} />
                        </span>
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-white/50 uppercase tracking-wider">
                        Open Admission · RUET
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* PAST & COMPLETED EVENTS ARCHIVE */}
        <section>
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/[0.06]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-white/40 block mb-1">
                Archives
              </span>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                Past Workshops & Sessions
              </h3>
            </div>
          </div>

          {/* Clean Grid */}
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completed.map((ev, idx) => (
              <div
                key={ev._id ?? `${ev.title}-${idx}`}
                className="event-archive-card group relative flex flex-col rounded-2xl sm:rounded-3xl bg-[#080b12] border border-white/[0.08] hover:border-mars-orange/40 overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Image Frame */}
                <div 
                  className="relative aspect-[16/10] w-full overflow-hidden bg-black cursor-pointer"
                  onClick={() => setActivePhoto(ev.coverPhoto || "/photots/mars_rover.jpg")}
                >
                  <Image
                    src={ev.coverPhoto || "/photots/mars_rover.jpg"}
                    alt={ev.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-transparent to-transparent opacity-60" />

                  {/* Date Chip */}
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="font-mono text-[10px] text-white/90 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                      {ev.date}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-white/45">
                      <MapPin size={12} className="text-mars-orange shrink-0" />
                      <span>{ev.location}</span>
                    </div>

                    <h4 className="font-heading font-bold text-base text-white group-hover:text-mars-orange transition-colors tracking-tight line-clamp-2">
                      {ev.title}
                    </h4>

                    <p className="text-xs text-white/60 font-sans leading-relaxed line-clamp-2">
                      {ev.description}
                    </p>
                  </div>

                  {ev.category && (
                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/40 uppercase tracking-wider">
                      <span>{ev.category}</span>
                      <span className="text-mars-orange/70">Completed</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Link to Competitions */}
        <div className="mt-20 text-center">
          <Link
            href="/competitions"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-white/60 hover:text-mars-orange transition-colors"
          >
            <span>Explore our international robotics campaigns → View Competitions</span>
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
            <img src={activePhoto} alt="Event Preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" />
          </div>
        </div>
      )}
    </main>
  );
}
