"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, X, ZoomIn, Newspaper, Award } from "lucide-react";

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
    title: "National Rover Design Challenge Win",
    caption: "The Daily Star: Team Ogrodoot clinches #1 in Bangladesh and 11th Worldwide in IRDC.",
    imageUrl: "/photots/Team_Ogrodoot_Cover.png",
    source: "The Daily Star Tech Review",
    date: "November 2023",
  },
  {
    _id: "m-2",
    title: "Anatolian Rover Challenge (ARC) Debut",
    caption: "Field testing of 6-wheel Rocker-Bogie chassis and telemetry systems.",
    imageUrl: "/photots/rover.png",
    source: "Aerospace & Robotics Journal",
    date: "August 2025",
  },
  {
    _id: "m-3",
    title: "Martian Analog Field Trials in RUET",
    caption: "RUET student researchers test autonomous slope traversal.",
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

  useEffect(() => {
    fetch("/api/media")
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white pt-28 pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-mars-red/15 via-mars-orange/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="mars-grid-pattern absolute inset-0 opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-xs text-white/50">
          <Link href="/" className="hover:text-mars-orange transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="text-white/30" />
          <span className="text-mars-orange font-semibold">
            {isAchievements ? "Achievements" : "Media & Press"}
          </span>
        </div>

        {/* Minimal Header (NO long paragraphs or text content) */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-mars-orange/10 border border-mars-orange/30 text-mars-orange text-[11px] font-mono uppercase tracking-[0.25em] mb-3">
            {isAchievements ? <Award size={12} className="text-mars-orange" /> : <Newspaper size={12} className="text-mars-orange" />}
            {isAchievements ? "Global Recognition & Awards" : "Press Archives"}
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-tight">
            {isAchievements ? "Achievements & Press" : "Media & Press"}
          </h1>
        </div>

        {/* Clean Image Grid / Masonry Layout showcasing newspaper clippings & media features */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="break-inside-avoid group relative rounded-2xl bg-white/[0.03] border border-white/10 hover:border-mars-orange/60 p-2.5 transition-all duration-300 shadow-xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              {/* Image Frame */}
              <div className="relative w-full overflow-hidden rounded-xl bg-black">
                <img
                  src={item.imageUrl}
                  alt={item.title || "Newspaper clipping"}
                  className="w-full h-auto object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                />

                {/* Subtle Hover Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="rounded-full bg-black/80 p-3 text-mars-orange border border-mars-orange/50 shadow-lg">
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>

              {/* Small, Optional Caption below Image */}
              {(item.caption || item.source || item.date) && (
                <div className="p-3 pt-2.5">
                  {(item.source || item.date) && (
                    <div className="flex items-center justify-between text-[11px] font-mono text-white/40 mb-1">
                      {item.source && <span className="text-mars-orange/80 font-semibold">{item.source}</span>}
                      {item.date && <span>{item.date}</span>}
                    </div>
                  )}
                  {item.caption && (
                    <p className="font-sans text-xs text-white/70 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                </div>
              )}
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
                  className="max-h-[72vh] w-auto object-contain rounded-lg"
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
