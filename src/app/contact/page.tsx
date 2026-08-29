"use client";

import { SectionPage } from "@/components/layout/SectionPage";
import { Mail, MapPin, Phone, Send, Clock, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  return (
    <SectionPage
      eyebrow="Get In Touch"
      title="Contact & Headquarters"
      description="Reach Team Ogrodoot for sponsorship inquiries, research collaborations, media press kits, or general questions."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="font-heading text-xl font-bold text-white">
              Headquarters Info
            </h3>

            <div className="space-y-4 text-sm text-white/80">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-mars-orange/10 border border-mars-orange/30 text-mars-orange shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-bold text-white text-xs uppercase tracking-wider">Campus Address</p>
                  <p className="text-xs text-white/70 mt-0.5 leading-relaxed">
                    Rajshahi University of Engineering & Technology (RUET)<br />
                    Kazla, Rajshahi-6204, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-mars-orange/10 border border-mars-orange/30 text-mars-orange shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-bold text-white text-xs uppercase tracking-wider">Official Email</p>
                  <a href="mailto:teamogrodoot.ruet.bd@gmail.com" className="text-xs text-mars-orange hover:underline block mt-0.5 font-medium">
                    teamogrodoot.ruet.bd@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-mars-orange/10 border border-mars-orange/30 text-mars-orange shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="font-bold text-white text-xs uppercase tracking-wider">Lab Operation</p>
                  <p className="text-xs text-white/70 mt-0.5">
    
                    Fitting Shop,Depertment of Mechanical Engineering, RUET, Rajshahi-6204, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            {/* Social Channels on Contact Page */}
            <div className="pt-4 border-t border-white/10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 mb-3">
                Official Channels
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="https://www.facebook.com/team.ogrodoot"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-mars-orange/50 hover:bg-mars-orange/10 text-white/80 hover:text-white transition-all text-xs font-semibold"
                >
                  <svg className="w-4 h-4 fill-current text-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>

                <a
                  href="https://www.instagram.com/team.ogrodoot"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-mars-orange/50 hover:bg-mars-orange/10 text-white/80 hover:text-white transition-all text-xs font-semibold"
                >
                  <svg className="w-4 h-4 fill-current text-[#E4405F]" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>

                <a
                  href="https://www.linkedin.com/company/ogrodoot/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-mars-orange/50 hover:bg-mars-orange/10 text-white/80 hover:text-white transition-all text-xs font-semibold"
                >
                  <svg className="w-4 h-4 fill-current text-[#0A66C2]" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://youtube.com/@team_ogrodoot"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-mars-orange/50 hover:bg-mars-orange/10 text-white/80 hover:text-white transition-all text-xs font-semibold"
                >
                  <svg className="w-4 h-4 fill-current text-[#FF0000]" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 shadow-xl">
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              Send a Message
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/60 mb-6">
              Fill in your inquiry below and our communications lead will respond within 24–48 hours.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Your message has been received. Our team will get back to you shortly.");
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Alex Vance"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-mars-orange focus:ring-1 focus:ring-mars-orange/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@organization.org"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-mars-orange focus:ring-1 focus:ring-mars-orange/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aerospace Labs / University"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-mars-orange focus:ring-1 focus:ring-mars-orange/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    defaultValue="sponsorship"
                    className="w-full rounded-xl border border-white/15 bg-[#0b0e17] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-mars-orange focus:ring-1 focus:ring-mars-orange/50"
                  >
                    <option value="sponsorship">Sponsorship & Partnership</option>
                    <option value="technical">Technical Collaboration</option>
                    <option value="media">Media & Press Kit</option>
                    <option value="recruitment">Team Recruitment</option>
                    <option value="other">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your inquiry or collaboration proposal..."
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-mars-orange focus:ring-1 focus:ring-mars-orange/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-mars-red to-mars-orange hover:from-mars-orange hover:to-mars-red px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition active:scale-95 cursor-pointer"
              >
                <span>Transmit Message</span>
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </SectionPage>
  );
}
