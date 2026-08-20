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
    <div className="relative w-full bg-[#050505] min-h-screen text-star-white overflow-hidden selection:bg-mars-red selection:text-white">
      <LoadingScreen />
      <MarsAmbientBackground />
      
      {/* 1.1 Hero Section with Cover Photo Background */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#050505] flex items-center justify-center">
        {/* Cover Photo Background - Change opacity in className below: opacity-100, opacity-90, opacity-75, etc. */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/photots/rover.png"
            alt="Mars Rover Background"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center sm:object-center opacity-100"
          />
          {/* Subtle bottom fade to seamlessly blend into next section */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505]" />
        </div>

        <HeroContent />
      </section>

      {/* 1.2 Rover Team Showcase Section */}
      <RoverTeam />

    
    </div>
  );
}
