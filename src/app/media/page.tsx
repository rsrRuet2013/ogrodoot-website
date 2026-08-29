import { SectionPage } from "@/components/layout/SectionPage";
import { Newspaper, Download, ExternalLink, Calendar, Video, FileText } from "lucide-react";

const newsArticles = [
  {
    title: "Team Ogrodoot Selected as Finalist for International Rover Design Challenge",
    source: "Aerospace Daily & National Tech",
    date: "November 2025",
    description: "RUET's premier planetary robotics team secures top contender status in international engineering design review.",
    category: "Competition",
  },
  {
    title: "Bangladeshi Engineering Students Construct Advanced 6-Wheel Rocker-Bogie Rover",
    source: "The Daily Star Tech Review",
    date: "July 2024",
    description: "In-depth technical coverage of the mechanical fabrication, cycloidal arm drives, and AI navigation built from RUET laboratories.",
    category: "Feature",
  },
  {
    title: "Team Ogrodoot Secures National Rank #1 in Global Rover Challenge",
    source: "Dhaka Tribune",
    date: "October 2023",
    description: "RUET students triumph over 40+ international universities, earning Bangladesh's highest planetary robotics placement to date.",
    category: "Milestone",
  },
];

export default function MediaPage() {
  return (
    <SectionPage
      eyebrow="News & Press"
      title="Media & Publications"
      description="Official announcements, media coverage, downloadable brand assets, and press releases for journalists."
    >
      <div className="space-y-12">
        {/* Media Kit Download Banner */}
        <div className="rounded-2xl border border-white/15 bg-gradient-to-r from-[#0d1017] via-black to-mars-red/20 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-mars-orange font-bold uppercase tracking-wider">
              <FileText size={14} />
              <span>Official Press Assets</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Download Media Kit & Vector Assets
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/70 max-w-xl">
              High-resolution vector logos, rover photography, team bios, and official brand guidelines for editorial use.
            </p>
          </div>

          <a
            href="/logo-white.png"
            download
            className="inline-flex items-center gap-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md shrink-0"
          >
            <Download size={14} className="text-mars-orange" />
            <span>Download Assets (.ZIP)</span>
          </a>
        </div>

        {/* News Coverage Grid */}
        <div>
          <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-6">
            Featured Coverage
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsArticles.map((article, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/[0.03] border border-white/10 hover:border-mars-orange/60 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-mars-orange text-[10px] font-bold uppercase">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {article.date}
                    </span>
                  </div>

                  <h4 className="font-heading text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    {article.title}
                  </h4>

                  <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
                    {article.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                  <span>{article.source}</span>
                  <ExternalLink size={13} className="text-mars-orange" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionPage>
  );
}
