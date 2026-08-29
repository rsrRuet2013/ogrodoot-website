import { SectionPage } from "@/components/layout/SectionPage";
import { Trophy, Calendar, MapPin, Award, CheckCircle2, Flag } from "lucide-react";

const milestones = [
  {
    year: "2026",
    title: "University Rover Challenge (URC)",
    rank: "Active Campaign Target",
    badge: "GLOBAL PODIUM TARGET",
    badgeColor: "bg-mars-orange/20 text-mars-orange border-mars-orange/40",
    location: "Hanksville, Utah, USA",
    description: "Currently engineering Ogrodoot MK-IV for the premier collegiate planetary robotics competition at the Mars Desert Research Station in Utah.",
    highlights: ["Autonomous Navigation at 1.8 m/s", "Advanced Astrobiology Life Detection Assay", "Extreme Terrain Rocker-Bogie Traversal"],
  },
  {
    year: "2023",
    title: "International Rover Design Challenge (IRDC)",
    rank: "11th Global · 1st in Bangladesh",
    badge: "NATIONAL CHAMPION",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    location: "Virtual Global Arena",
    description: "Ranked #1 in Bangladesh and 11th Worldwide among 40+ international universities for our innovative Martian science payload and structural engineering dossier.",
    highlights: ["Highest-scoring Bangladeshi Team", "Top-tier Scientific Payload Evaluation", "Autonomous System Architecture Citation"],
  },
  {
    year: "2019",
    title: "European Rover Challenge (ERC)",
    rank: "Top 20 Global Finalist",
    badge: "GLOBAL TOP 20",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    location: "Kielce, Poland",
    description: "Competed on a realistic Martian surface arena in Poland, successfully demonstrating robotic manipulation, deep soil sampling, and remote control telemetry.",
    highlights: ["Top 20 among 90+ international submissions", "6-DOF Manipulator Precision Task Cleared", "Autonomous Waypoint Exploration"],
  },
  {
    year: "2018",
    title: "Indian Rover Challenge (IRC)",
    rank: "Inaugural International Participation",
    badge: "MAIDEN CAMPAIGN",
    badgeColor: "bg-white/10 text-white/80 border-white/20",
    location: "VIT Chennai, India",
    description: "Marked Team Ogrodoot's historic first foray into international rover competitions with the Ogrodoot MK-I prototype chassis.",
    highlights: ["First international deployment", "Successfully cleared technical inspection", "Foundation of RUET Mars Rover R&D"],
  },
];

export default function AchievementsPage() {
  return (
    <SectionPage
      eyebrow="Milestones"
      title="Achievements & Honors"
      description="A timeline of international competition rankings, technical milestones, and national records established by Team Ogrodoot."
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {milestones.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/[0.03] border border-white/10 hover:border-mars-orange/60 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/5 border border-white/10 text-white">
                    <Calendar size={12} className="text-mars-orange" />
                    {item.year}
                  </span>

                  <span className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] tracking-widest font-bold uppercase border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-xs font-mono text-mars-orange font-semibold mb-4">
                  <Trophy size={14} />
                  <span>{item.rank}</span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-3">
                  <MapPin size={12} />
                  <span>{item.location}</span>
                </div>
                {item.highlights.map((h, j) => (
                  <div key={j} className="flex items-start gap-2 text-xs text-white/80">
                    <CheckCircle2 size={13} className="text-mars-orange shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionPage>
  );
}
