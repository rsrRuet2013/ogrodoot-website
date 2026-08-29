"use client";

import { SectionPage } from "@/components/layout/SectionPage";
import { Mail, MapPin, Phone, Send, Clock, Globe, ShieldCheck } from "lucide-react";

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
                  <a href="mailto:contact@teamogrodoot.com" className="text-xs text-mars-orange hover:underline block mt-0.5">
                    contact@teamogrodoot.com
                  </a>
                  <a href="mailto:teamogrodoot.ruet@gmail.com" className="text-xs text-white/60 hover:underline block mt-0.5">
                    teamogrodoot.ruet@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-mars-orange/10 border border-mars-orange/30 text-mars-orange shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="font-bold text-white text-xs uppercase tracking-wider">Lab Operation Hours</p>
                  <p className="text-xs text-white/70 mt-0.5">
                    Sunday – Thursday: 09:00 AM – 08:00 PM (GMT+6)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-mars-orange/10 border border-mars-orange/30 text-mars-orange shrink-0">
                  <Globe size={18} />
                </div>
                <div>
                  <p className="font-bold text-white text-xs uppercase tracking-wider">Affiliation</p>
                  <p className="text-xs text-white/70 mt-0.5">
                    Department of Mechatronics Engineering & RUET Robotics Society
                  </p>
                </div>
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
