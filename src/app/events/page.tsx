"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowRight,
  Sparkles,
  X
} from "lucide-react";

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
  title: "Mars Rover Engineering Seminar & RUET Recruitment Workshop",
  description:
    "An interactive seminar and recruitment session introducing prospective student engineers to planetary robotics, subteam architectures, ROS2 autonomy, and live rover field demonstrations.",
  date: "November 14, 2026",
  location: "Central Auditorium, RUET",
  status: "upcoming",
  coverPhoto: "/photots/mars_rover.jpg",
  registrationLink: "https://forms.gle/ogrodoot-workshop-2026",
  category: "Seminar",
};

const DEFAULT_COMPLETED: EventItem[] = [
  {
    _id: "default-past-1",
    title: "Autonomous Navigation & ROS2 Hands-on Workshop",
    description: "Intensive 3-day technical training on LiDAR point clouds, SLAM mapping, and micro-ROS microcontroller interfacing.",
    date: "July 2025",
    location: "CSE Seminar Room, RUET",
    status: "completed",
    coverPhoto: "/photots/leads_only.JPG",
    category: "Workshop",
  },
  {
    _id: "default-past-2",
    title: "Space Exploration & Astrobiology Symposium",
    description: "Inter-departmental colloquium exploring biosignature detection methods, soil chemical assays, and planetary geology.",
    date: "February 2024",
    location: "ME Conference Hall, RUET",
    status: "completed",
    coverPhoto: "/photots/team.jpg",
    category: "Symposium",
  },
  {
    _id: "default-past-3",
    title: "Rocker-Bogie Chassis Fabrication & CAD Bootcamp",
    description: "Hands-on chassis prototyping, CNC milling, and finite element stress analysis for aspiring rover builders.",
    date: "October 2023",
    location: "Central Machine Shop, RUET",
    status: "completed",
    coverPhoto: "/photots/rover.png",
    category: "Bootcamp",
  },
  {
    _id: "default-past-4",
    title: "Youth STEM & Space Robotics Outreach",
    description: "Live rover demonstrations and inspirational aerospace talks for local high school and college students.",
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

  useEffect(() => {
    fetch("/api/events")
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
          <span className="text-white/80 font-medium">Events</span>
        </div>

        {/* Minimal Hero Header */}
        <div className="mb-14 pb-8 border-b border-white/[0.08]">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-mars-orange font-semibold block mb-2">
            Workshops, Seminars & Field Operations
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
            Team Events
          </h1>
          <p className="mt-3 text-sm text-white/65 max-w-xl font-normal leading-relaxed">
            University outreach, hands-on robotics workshops, technical seminars, and team field sessions organized by Team Ogrodoot at RUET.
          </p>
        </div>

        {/* UPCOMING FEATURED EVENT (If Available) */}
        {upcoming && (
          <motion.section 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="mb-20"
          >
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-[#090b10] shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                
                {/* Photo Frame (7 cols) */}
                <div 
                  className="relative lg:col-span-7 min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] overflow-hidden bg-black cursor-pointer"
                  onClick={() => setActivePhoto(upcoming.coverPhoto)}
                >
                  <Image
                    src={upcoming.coverPhoto}
                    alt={upcoming.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-transparent lg:hidden" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-mars-orange text-black shadow-lg">
                      Upcoming Event
                    </span>
                  </div>
                </div>

                {/* Details Section (5 cols) */}
                <div className="p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Meta line: Date & Venue */}
                    <div className="space-y-2 border-b border-white/[0.08] pb-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-mars-orange">
                        <Calendar size={13} className="shrink-0" />
                        <span>{upcoming.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <MapPin size={13} className="text-white/40 shrink-0" />
                        <span>{upcoming.location}</span>
                      </div>
                    </div>

                    <h2 className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight uppercase leading-snug">
                      {upcoming.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-sans">
                      {upcoming.description}
                    </p>
                  </div>

                  {/* Action Button: Button-in-Button Architecture */}
                  <div className="pt-6 mt-6 border-t border-white/[0.08]">
                    {upcoming.registrationLink ? (
                      <a
                        href={upcoming.registrationLink}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center justify-between gap-4 w-full sm:w-auto rounded-full bg-gradient-to-r from-mars-red to-mars-orange pl-5 pr-2 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:shadow-mars-orange/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <span>Register for Event</span>
                        <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                          <ArrowUpRight size={14} />
                        </span>
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-white/50 uppercase tracking-wider">
                        Admission Open · On Campus
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </motion.section>
        )}

        {/* PAST & COMPLETED EVENTS */}
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

          {/* Clean Multi-column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completed.map((ev, idx) => (
              <motion.div
                key={ev._id ?? `${ev.title}-${idx}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="group relative flex flex-col rounded-2xl sm:rounded-3xl bg-[#090b10] border border-white/[0.08] hover:border-mars-orange/40 overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Frame */}
                <div 
                  className="relative aspect-[16/10] w-full overflow-hidden bg-black cursor-pointer"
                  onClick={() => setActivePhoto(ev.coverPhoto)}
                >
                  <Image
                    src={ev.coverPhoto}
                    alt={ev.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-transparent opacity-60" />

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
              </motion.div>
            ))}
          </div>
        </section>

        {/* Link to Competitions */}
        <div className="mt-20 text-center">
          <Link
            href="/competitions"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-white/60 hover:text-mars-orange transition-colors"
          >
            <span>Interested in our international robotics campaigns? View Competitions</span>
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
