"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, X, ZoomIn, Newspaper, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type MediaItem = {
  _id: string;
  title?: string;
  caption?: string;
  imageUrl: string;
  source?: string;
  date?: string;
  category?: string;
};

const DEFAULT_MEDIA_ITEMS: MediaItem[] = [
  {
    _id: "m-1",
    title: "International Rover Design Challenge Victory",
    caption: "The Daily Star: Team Ogrodoot clinches 1st in Bangladesh and 11th Worldwide in IRDC.",
    imageUrl: "/photots/Team_Ogrodoot_Cover.png",
    source: "The Daily Star",
    date: "November 2023",
  },
  {
    _id: "m-2",
    title: "Anatolian Rover Challenge (ARC) Debut",
    caption: "Field testing of 6-wheel Rocker-Bogie chassis and custom telemetry systems in Turkey.",
    imageUrl: "/photots/rover.png",
    source: "Aerospace Robotics",
    date: "August 2025",
  },
  {
    _id: "m-3",
    title: "Martian Analog Field Trials at RUET",
    caption: "RUET student researchers test autonomous slope traversal and optical obstacle detection.",
    imageUrl: "/photots/mars_rover.jpg",
    source: "Prothom Alo Science",
    date: "July 2024",
  },
  {
    _id: "m-4",
    title: "Avionics Stack & Team Leadership",
    caption: "Dhaka Tribune coverage on ROS2 autonomy and cycloidal arm drives.",
    imageUrl: "/photots/leads_only.JPG",
    source: "Dhaka Tribune",
    date: "October 2023",
  },
  {
    _id: "m-5",
    title: "Squadron Presentation & Send-Off",
    caption: "Official presentation of the next-generation Mars rover roster at RUET.",
    imageUrl: "/photots/team.jpg",
    source: "RUET Press Bulletin",
    date: "March 2025",
  },
];

export default function MediaAndPressPage() {
  const [items, setItems] = useState<MediaItem[]>(DEFAULT_MEDIA_ITEMS);
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const pathname = usePathname();
  const isAchievements = pathname?.includes("achievements") ?? false;

  const containerRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/media", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data.items) && data.items.length > 0) {
          setItems(data.items);
        }
      })
      .catch(() => {
        // Fallback default items preserved
      });
  }, []);

  // GSAP Entrance & Scroll Animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header typography
      gsap.from(".media-header-anim", {
        opacity: 0,
        y: 26,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Cards staggered reveal on scroll
      if (masonryRef.current) {
        gsap.from(".media-card-item", {
          scrollTrigger: {
            trigger: masonryRef.current,
            start: "top 85%",
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <main ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#050505] text-white pt-28 pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-mars-red/15 via-transparent to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="media-header-anim flex items-center gap-2 mb-6 text-xs text-white/50">
          <Link href="/" className="hover:text-mars-orange transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="text-white/30" />
          <span className="text-white/90 font-medium">
            {isAchievements ? "Achievements" : "Media & Press"}
          </span>
        </div>

        {/* Minimal Header */}
        <div className="mb-12 border-b border-white/[0.08] pb-8">
          <div className="media-header-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mars-orange/10 border border-mars-orange/30 text-mars-orange text-[11px] font-mono uppercase tracking-[0.2em] mb-3">
            {isAchievements ? <Award size={12} className="text-mars-orange" /> : <Newspaper size={12} className="text-mars-orange" />}
            <span>{isAchievements ? "Global Rankings & Awards" : "Press & Publications"}</span>
          </div>
          <h1 className="media-header-anim font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
            {isAchievements ? "Achievements & Honors" : "Media & Press"}
          </h1>
          <p className="media-header-anim mt-3 text-sm text-white/65 max-w-xl font-normal leading-relaxed">
            {isAchievements
              ? "International accolades, championship milestones, and aerospace recognitions won by Team Ogrodoot at RUET."
              : "National newspaper features, scientific press coverage, and field trial reports on RUET's Mars Rover squad."}
          </p>
        </div>

        {/* Modern Clean Grid Layout */}
        <div ref={masonryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="media-card-item group relative flex flex-col rounded-2xl sm:rounded-3xl bg-[#080b12] border border-white/[0.08] hover:border-mars-orange/40 overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src={item.imageUrl}
                  alt={item.title || "Press clipping"}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-transparent to-transparent opacity-60" />

                {/* Subtle Hover Zoom Icon */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="rounded-full bg-black/80 p-2.5 text-mars-orange border border-mars-orange/50 shadow-lg">
                    <ZoomIn size={16} />
                  </div>
                </div>

                {/* Source Tag */}
                {item.source && (
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="font-mono text-[10px] text-white/90 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10">
                      {item.source}
                    </span>
                  </div>
                )}
              </div>

              {/* Caption & Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {item.title && (
                    <h3 className="font-heading font-bold text-base text-white group-hover:text-mars-orange transition-colors tracking-tight line-clamp-2">
                      {item.title}
                    </h3>
                  )}
                  {item.caption && (
                    <p className="font-sans text-xs text-white/60 leading-relaxed line-clamp-2">
                      {item.caption}
                    </p>
                  )}
                </div>

                {item.date && (
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/40">
                    <span>{item.date}</span>
                    <span className="text-mars-orange/80 font-medium">View Feature →</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Image Inspection Lightbox */}
        {selectedImage && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-5xl max-h-[90vh] w-full overflow-hidden rounded-2xl border border-white/20 bg-[#0d1017] shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 z-20 rounded-full bg-black/70 p-2.5 text-white/80 hover:text-white hover:bg-black transition-all border border-white/20 cursor-pointer"
                aria-label="Close image preview"
              >
                <X size={18} />
              </button>

              <div className="overflow-auto p-4 flex items-center justify-center max-h-[75vh]">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title || "Press clipping"}
                  className="max-h-[72vh] w-auto object-contain rounded-lg shadow-xl"
                />
              </div>

              {(selectedImage.caption || selectedImage.source || selectedImage.date) && (
                <div className="p-4 sm:p-5 border-t border-white/10 bg-[#080b12] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <p className="font-sans text-xs sm:text-sm text-white/80">
                    {selectedImage.caption || selectedImage.title}
                  </p>
                  {(selectedImage.source || selectedImage.date) && (
                    <div className="text-[11px] font-mono text-mars-orange shrink-0">
                      {selectedImage.source} {selectedImage.date ? `· ${selectedImage.date}` : ""}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
