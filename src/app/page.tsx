import Image from "next/image";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { MarsAmbientBackground } from "@/components/layout/MarsAmbientBackground";
import { HeroContent } from "@/components/sections/HeroContent";
import { RoverTeam } from "@/components/sections/roverteam";
import { StatsCounter } from "@/components/sections/StatsCounter";
import { RoverPreview } from "@/components/sections/RoverPreview";
import { CompetitionsTimeline } from "@/components/sections/CompetitionsTimeline";
import { SubTeamsGrid } from "@/components/sections/SubTeamsGrid";
import { SponsorshipCTA } from "@/components/sections/SponsorshipCTA";

export default function Home() {
  return (
    <div className="relative w-full bg-[#050505] min-h-screen text-white overflow-hidden selection:bg-mars-red selection:text-white">
      <LoadingScreen />
      <MarsAmbientBackground />
      
      {/* 1.1 Hero Section with Cover Photo Background */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#050505] flex items-center justify-center">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/photots/mars_rover.jpg"
            alt="Mars Rover Background"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center opacity-100"
          />
          {/* Seamless bottom fade into next section */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050505]" />
        </div>

        <HeroContent />
      </section>

      {/* 1.2 Rover Team Showcase Section */}
      <RoverTeam />

      {/* 1.3 Key Stats & Milestones */}
      <StatsCounter />

      {/* 1.4 Rover Specifications Preview */}
      <RoverPreview />

      {/* 1.5 Global Competitions Timeline */}
      <CompetitionsTimeline />

      {/* 1.7 Sponsorship & Partnership CTA */}
      <SponsorshipCTA />
    </div>
  );
}
