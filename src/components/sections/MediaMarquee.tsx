"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X, ZoomIn } from "lucide-react";

type MarqueeItem = {
  _id?: string;
  title: string;
  caption?: string;
  imageUrl: string;
  category?: string;
  source?: string;
};

const DEFAULT_MARQUEE_ITEMS: MarqueeItem[] = [
  {
    title: "Anatolian Rover Challenge (ARC) Feature",
    caption: "Field testing and international competition coverage.",
    imageUrl: "/photots/rover.png",
  },
  {
    title: "The Daily Star: Team Ogrodoot #1 in Bangladesh",
    caption: "Leading national coverage on international space robotics milestone.",
    imageUrl: "/photots/Team_Ogrodoot_Cover.png",
  },
  {
    title: "Martian Surface Simulation Field Run",
    caption: "Autonomous navigation trials on simulated planetary terrain.",
    imageUrl: "/photots/mars_rover.jpg",
  },
  {
    title: "National Press Feature: Leadership & Avionics",
    caption: "Print media coverage of the engineering leadership.",
    imageUrl: "/photots/leads_only.JPG",
  },
  {
    title: "Official Mars Rover Team Squadron",
    caption: "Engineering team presentation and international send-off.",
    imageUrl: "/photots/team.jpg",
  },
];

export function MediaMarquee() {
  const [items, setItems] = useState<MarqueeItem[]>(DEFAULT_MARQUEE_ITEMS);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

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

  // Double items for continuous smooth infinite track
  const displayItems = [...items, ...items];

  return (
    <section className="relative w-full py-16 sm:py-24 overflow-hidden bg-[#050505]">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-mars-red/10 via-mars-orange/5 to-transparent rounded-full blur-[150px] pointer-events-none" />

      {/* Header Info - Clean, professional, no visual clutter */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-mars-orange block mb-2 font-semibold">
            Press & Media Coverage
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase">
            COMPETITIONS & MEDIA DISPATCHES
          </h2>
        </div>

        <Link
          href="/achievements"
          className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white/70 hover:text-mars-orange transition-colors w-fit"
        >
          <span>View All Press Clippings</span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Marquee Viewport with Edge Fade Gradients */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        {/* Large, Smooth, Clean Scrolling Cards */}
        <div className="flex gap-6 sm:gap-8 w-max animate-marquee hover:[animation-play-state:paused] py-4 px-4 cursor-pointer select-none">
          {displayItems.map((item, idx) => (
            <div
              key={`${item._id ?? item.title}-${idx}`}
              onClick={() => setLightboxImage(item.imageUrl)}
              className="group relative w-[380px] sm:w-[480px] md:w-[560px] h-[260px] sm:h-[320px] md:h-[370px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0c0e14] shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
            >
              {/* Full-bleed, pristine clipping image - text inside is clearly visible and readable */}
              <div className="relative w-full h-full bg-[#0a0c12]">
                <Image
                  src={item.imageUrl}
                  alt={item.title || "Press clipping"}
                  fill
                  sizes="(max-width: 768px) 380px, (max-width: 1024px) 480px, 560px"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  priority={idx < 4}
                />

                {/* Subtle Hover Action Hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-md text-white text-[11px] font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/10">
                    <ZoomIn size={13} className="text-mars-orange" />
                    <span>View Clipping</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Zoom Modal for Detailed Reading */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            aria-label="Close image preview"
          >
            <X size={22} />
          </button>

          <div
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt="Newspaper Clipping Preview"
              className="max-w-full max-h-[88vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default MediaMarquee;
