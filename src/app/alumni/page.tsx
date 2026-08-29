import { SectionPage } from "@/components/layout/SectionPage";
import Link from "next/link";
import { GraduationCap, Briefcase, Award, ArrowUpRight, UserCheck } from "lucide-react";

const alumniEras = [
  {
    era: "2017 – 2019",
    title: "Founding Era & Maiden Deployments",
    description: "The visionary founders who established Team Ogrodoot at RUET, built the first prototype chassis (MK-I), and secured inaugural entries into international challenges in India and Poland.",
    focus: "Chassis Foundation · ERC Poland Deployment · Structural Prototyping",
  },
  {
    era: "2020 – 2022",
    title: "Autonomy & Avionics Pioneers",
    description: "Expanded our technological frontier into autonomous ROS navigation, multi-sensor telemetry, and specialized 6-DOF robotic manipulator architectures.",
    focus: "ROS Autonomy Stack · PCB Design · Closed-Loop Arm Controls",
  },
  {
    era: "2023 – 2025",
    title: "Global Recognition & Podium Finishes",
    description: "Achieved #1 in Bangladesh and 11th Worldwide in the International Rover Design Challenge (IRDC), solidifying Team Ogrodoot's place among elite international universities.",
    focus: "IRDC National #1 · Scientific Astrobiology Payload · URC Readiness",
  },
];

export default function AlumniPage() {
  return (
    <SectionPage
      eyebrow="The Legacy"
      title="Alumni Network"
      description="Honoring the engineers, team leads, and researchers whose mentorship and technical foundations continue to propel Team Ogrodoot forward."
    >
      <div className="space-y-12">
        {/* Alumni Mentorship Network Banner */}
        <div className="rounded-2xl border border-white/15 bg-gradient-to-r from-[#0d1017] via-black to-[#1c120c] p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-mars-orange font-bold uppercase tracking-wider">
              <GraduationCap size={16} />
              <span>Global Alumni Ecosystem</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Are you an Ogrodoot Alumnus?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
              Stay connected with current student researchers, provide technical mentorship, review designs, and join our private alumni network.
            </p>
          </div>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-mars-red to-mars-orange px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shrink-0 hover:brightness-110 transition-all"
          >
            <UserCheck size={16} />
            <span>Join Alumni Network</span>
          </Link>
        </div>

        {/* Generational Eras */}
        <div>
          <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-6">
            Generational Milestones
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alumniEras.map((era, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/[0.03] border border-white/10 hover:border-mars-orange/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl"
              >
                <div>
                  <span className="font-mono text-xs text-mars-orange font-bold tracking-widest block mb-2">
                    {era.era}
                  </span>
                  <h4 className="font-heading text-lg font-bold text-white mb-2">
                    {era.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                    {era.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs font-mono text-white/50">
                  <span className="text-mars-orange/80 block mb-1 font-semibold uppercase text-[10px] tracking-wider">Key Focus</span>
                  {era.focus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionPage>
  );
}
