import { SectionPage } from "@/components/layout/SectionPage";
import Image from "next/image";
import Link from "next/link";
import { Compass, Target, Lightbulb, Award, Users, ArrowUpRight, ShieldCheck } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Engineering Excellence",
    description: "Iterating from fundamental physics and mechanical principles to manufacture robust hardware capable of surviving brutal Martian analog terrain.",
  },
  {
    icon: Users,
    title: "Interdisciplinary Harmony",
    description: "Uniting mechanical, electrical, computer science, civil, and materials science students in a unified aerospace research ecosystem.",
  },
  {
    icon: Lightbulb,
    title: "Autonomous Innovation",
    description: "Pushing state-of-the-art computer vision, LiDAR sensor fusion, and ROS2 autonomy pipelines for GPS-denied planetary exploration.",
  },
  {
    icon: Award,
    title: "National Representation",
    description: "Proudly carrying Bangladesh's flag to prestigious international robotics arenas including URC (USA), ERC (Poland), and IRDC.",
  },
];

export default function AboutPage() {
  return (
    <SectionPage
      eyebrow="Our Story"
      title="Origins & Vision"
      description="From an ambitious student initiative at RUET in 2017 to an internationally ranked Mars rover research team."
    >
      <div className="space-y-16">
        {/* Story Section with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-white/80 font-sans leading-relaxed text-sm sm:text-base">
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Pioneering Space Robotics in Bangladesh
            </h3>
            <p>
              Team Ogrodoot was founded in 2017 by a passionate collective of engineering students at Rajshahi University of Engineering & Technology (RUET). Driven by a shared ambition to represent Bangladesh on the global aerospace stage, the team set out to design autonomous planetary rovers capable of performing scientific analysis and astronaut assistance in extreme environments.
            </p>
            <p>
              Over nearly a decade of rigorous R&D, Team Ogrodoot has manufactured four generations of rovers, competing in top-tier international competitions including the University Rover Challenge (URC) in Utah, European Rover Challenge (ERC) in Poland, and the International Rover Design Challenge (IRDC).
            </p>
            <p>
              Today, the team operates as an advanced interdisciplinary laboratory encompassing Mechanical, Power & Avionics, Autonomous Software & AI, Astrobiology, and Deep Space Communications.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 bg-[#0a0d14] shadow-2xl p-1.5">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src="/photots/leads_only.JPG"
                  alt="Team Ogrodoot Leadership"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="mb-10 text-left">
            <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
              Core Principles
            </h3>
            <p className="font-sans text-sm text-white/60 mt-1">
              The foundational values that guide our research, design reviews, and team culture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 hover:border-mars-orange/60 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl"
                >
                  <div>
                    <div className="p-3 rounded-xl bg-mars-orange/10 border border-mars-orange/30 text-mars-orange w-fit mb-4">
                      <Icon size={20} />
                    </div>
                    <h4 className="font-heading text-base sm:text-lg font-bold text-white mb-2">
                      {v.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Card */}
        <div className="rounded-2xl border border-white/15 bg-gradient-to-r from-[#0e121a] via-black to-[#1a0c06] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase">
              Meet the Engineers Behind Ogrodoot
            </h3>
            <p className="font-sans text-sm text-white/70 mt-1">
              Discover the students, team leads, and faculty advisors bringing these missions to life.
            </p>
          </div>
          <Link
            href="/team"
            className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-mars-red to-mars-orange px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shrink-0 hover:brightness-110 transition-all"
          >
            <span>View Team Roster</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </SectionPage>
  );
}
