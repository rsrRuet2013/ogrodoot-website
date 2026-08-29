import { SectionPage } from "@/components/layout/SectionPage";
import Image from "next/image";
import Link from "next/link";
import { 
  Gauge, 
  Cpu, 
  Radio, 
  BatteryCharging, 
  Crosshair, 
  Wrench, 
  FlaskConical, 
  ShieldCheck, 
  ArrowUpRight 
} from "lucide-react";

const subsystems = [
  {
    icon: Gauge,
    title: "Chassis & Mobility Architecture",
    tag: "MECHANICAL",
    description: "6-wheel rocker-bogie suspension system constructed with aerospace-grade anodized aluminum. Equipped with custom high-torque planetary gear motors and compliant polyurethane tread wheels designed to surmount 35° inclines and 25cm obstacles without tipping.",
    specs: ["Rocker-Bogie Suspension", "Custom 3D Polyurethane Treads", "Max Speed: 1.8 m/s", "Obstacle Clearance: 25 cm"],
  },
  {
    icon: Wrench,
    title: "6-DOF Robotic Manipulator",
    tag: "ROBOTICS",
    description: "High-precision 6 degrees-of-freedom robotic arm capable of lifting a 5kg payload at full extension. Features custom cycloidal gearboxes, closed-loop magnetic encoder feedback, and quick-disconnect tool changers for diverse servicing tasks.",
    specs: ["6 Degrees of Freedom", "Payload Capacity: 5.0 kg", "Inverse Kinematics Controller", "Quick-Disconnect Interface"],
  },
  {
    icon: Cpu,
    title: "Autonomous Navigation Stack",
    tag: "SOFTWARE & AI",
    description: "Powered by ROS2 running on NVIDIA Jetson Orin edge computing. Leverages dual Intel RealSense depth cameras, 3D LiDAR point cloud processing, RTK-GPS positioning, and obstacle avoidance algorithms for autonomous GNSS waypoint navigation.",
    specs: ["NVIDIA Jetson Orin Architecture", "ROS2 Humble Framework", "Stereo VSLAM & 3D LiDAR", "Sub-meter Waypoint Precision"],
  },
  {
    icon: FlaskConical,
    title: "Onboard Astrobiology Science Lab",
    tag: "SCIENCE PAYLOAD",
    description: "Automated subsurface soil sampling carousel with hermetically sealed sample containers. Onboard UV-Vis spectrometry and biochemical reagent assays perform in-situ detection of biomarkers, amino acids, and soil moisture profiling.",
    specs: ["Subsurface Core Drill (15cm)", "Automated Reagent Assays", "Micro-Spectrometer Sensor", "Isolated Sealed Chambers"],
  },
  {
    icon: Radio,
    title: "Long-Range Telemetry & Comms",
    tag: "AVIONICS",
    description: "Dual-band communication system with 5.8 GHz high-bandwidth video stream transmission and redundant 900 MHz long-range telemetry link. Utilizes active tracking directional patch antennas for reliable 9km non-line-of-sight connectivity.",
    specs: ["5.8 GHz HD Video Array", "900 MHz LoRa Fallback", "9+ km Operational Range", "Low-Latency Telemetry HUD"],
  },
  {
    icon: BatteryCharging,
    title: "Intelligent Power Matrix",
    tag: "POWER SYSTEM",
    description: "Dual high-discharge 24V 20Ah LiPo battery banks monitored by custom microcontroller-managed BMS with per-cell voltage protection, thermal throttling, current sensors, and high-efficiency synchronous buck-boost regulators.",
    specs: ["24V 20Ah LiPo Pack", "Integrated Smart BMS", "Overcurrent & Thermal Safety", "4+ Hours Active Mission Runtime"],
  },
];

export default function RoverPage() {
  return (
    <SectionPage
      eyebrow="The Machine"
      title="Rover Architecture"
      description="Explore the technical engineering, precision mechanics, and autonomous AI systems powering Team Ogrodoot's flagship Martian exploration rover."
    >
      <div className="space-y-16">
        {/* Rover Showcase Hero Card */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-[#080a10] shadow-2xl p-2">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden bg-black">
            <Image
              src="/photots/mars_rover.jpg"
              alt="Ogrodoot Rover"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-transparent to-black/30" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-mars-orange font-bold uppercase tracking-[0.25em]">
                  Flagship Platform
                </span>
                <h2 className="font-heading text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
                  Ogrodoot MK-IV
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md">
                  URC Utah 2026 Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Subsystems Grid */}
        <div>
          <div className="mb-10 text-left">
            <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
              Subsystem Breakdowns
            </h3>
            <p className="font-sans text-sm text-white/60 mt-1">
              Engineered with extreme reliability, modular maintenance, and analog Martian field durability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subsystems.map((sub, i) => {
              const Icon = sub.icon;
              return (
                <div
                  key={i}
                  className="group rounded-2xl bg-white/[0.03] border border-white/10 hover:border-mars-orange/60 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-mars-orange/10 border border-mars-orange/30 text-mars-orange">
                        <Icon size={22} />
                      </div>
                      <span className="font-mono text-[10px] font-bold tracking-widest text-white/50 uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                        {sub.tag}
                      </span>
                    </div>

                    <h4 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-mars-orange transition-colors">
                      {sub.title}
                    </h4>

                    <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                      {sub.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 border-t border-white/10 pt-4">
                    {sub.specs.map((spec, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs font-mono text-white/60">
                        <span className="w-1 h-1 rounded-full bg-mars-orange" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Banner */}
        <div className="rounded-2xl border border-white/15 bg-gradient-to-r from-mars-red/20 via-[#0e121a] to-black p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase">
              Interested in Technical Partnerships?
            </h3>
            <p className="font-sans text-sm text-white/70 mt-1 max-w-xl">
              Collaborate with our engineering team on robotics hardware, sensor integrations, or research sponsorship.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-mars-red to-mars-orange px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shrink-0 hover:brightness-110 transition-all"
          >
            <span>Contact Engineering Leads</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </SectionPage>
  );
}
