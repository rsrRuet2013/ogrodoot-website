import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { HeroContent } from "@/components/sections/HeroContent";
import { MissionStatement } from "@/components/sections/MissionStatement";
import { StatsCounter } from "@/components/sections/StatsCounter";
import { RoverPreview } from "@/components/sections/RoverPreview";
import { CompetitionsTimeline } from "@/components/sections/CompetitionsTimeline";
import { SubTeamsGrid } from "@/components/sections/SubTeamsGrid";
import { SponsorshipCTA } from "@/components/sections/SponsorshipCTA";

import { HeroSceneWrapper } from "@/components/3d/HeroSceneWrapper";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      
      {/* 1.1 Hero Section */}
      <section className="relative min-h-[100dvh] w-full bg-deep-space overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeroSceneWrapper />
        </div>
        <HeroContent />
      </section>

      {/* 1.2 Mission Statement Strip */}
      <MissionStatement />

      {/* 1.3 Live Stats / Achievements Counter */}
      <StatsCounter />

      {/* 1.4 Rover 3D Showcase Preview */}
      <RoverPreview />

      {/* 1.5 Competitions Timeline Strip */}
      <CompetitionsTimeline />

      {/* 1.6 Sub-Teams Teaser Grid */}
      <SubTeamsGrid />

      {/* 1.7 Sponsorship CTA */}
      <SponsorshipCTA />
    </>
  );
}
