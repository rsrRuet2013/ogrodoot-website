"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
});

export function HeroSceneWrapper() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <HeroScene />
    </Canvas>
  );
}
