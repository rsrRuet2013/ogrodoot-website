"use client";

import { useRef, Suspense, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Stars, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

// Mars 3D Model with smooth rotation and pointer tracking
function MarsModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/mars_planet_hero_section.glb");
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Continuous slow planetary rotation
      groupRef.current.rotation.y += delta * 0.12;
      
      // Smooth subtle mouse parallax tilt
      const targetX = (state.pointer.y * 0.2);
      const targetY = (state.pointer.x * 0.3);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetX + 0.1, 3, delta);
      groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, -targetY * 0.5, 3, delta);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={3.4}>
      <primitive object={clonedScene} />
    </group>
  );
}

// Procedural fallback Mars sphere in case GLB is loading or unavailable
function ProceduralMars() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      const targetX = state.pointer.y * 0.15;
      meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetX + 0.1, 2, delta);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -0.2, 0]} scale={2.8}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#C1440E"
        roughness={0.8}
        metalness={0.1}
        bumpScale={0.05}
      />
    </mesh>
  );
}

// Atmospheric Glow Ring & Halo around Mars
function AtmosphereGlow() {
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Outer subtle glow sphere */}
      <mesh ref={atmosphereRef} scale={3.65}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#E77D11"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Equatorial telemetry ring */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]} scale={4.2}>
        <ringGeometry args={[1, 1.015, 64]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Secondary orbital ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]} scale={4.8}>
        <ringGeometry args={[1, 1.008, 64]} />
        <meshBasicMaterial
          color="#C1440E"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  return (
    <>
      {/* Cinematic Mars Lighting */}
      <ambientLight intensity={0.6} color="#4a2012" />
      {/* Sun Key Light */}
      <directionalLight
        position={[8, 5, 6]}
        intensity={2.8}
        color="#fff4e0"
      />
      {/* Mars Rust Ambient Fill Light */}
      <pointLight
        position={[-6, -3, 2]}
        intensity={1.8}
        color="#C1440E"
      />
      {/* High-tech Cyan HUD Rim Light */}
      <pointLight
        position={[0, 6, -4]}
        intensity={1.2}
        color="#00E5FF"
      />

      {/* Floating 3D Mars Planet */}
      <Float
        speed={1.5}
        rotationIntensity={0.2}
        floatIntensity={0.4}
        floatingRange={[-0.1, 0.1]}
      >
        <Suspense fallback={<ProceduralMars />}>
          <MarsModel />
        </Suspense>
        <AtmosphereGlow />
      </Float>

      {/* Martian Dust Embers & Atmospheric Particles */}
      <Sparkles
        count={isMobile ? 40 : 100}
        scale={14}
        size={isMobile ? 2 : 3.5}
        speed={0.4}
        color="#E77D11"
        opacity={0.6}
      />
      <Sparkles
        count={isMobile ? 25 : 60}
        scale={16}
        size={isMobile ? 1.5 : 2.5}
        speed={0.2}
        color="#00E5FF"
        opacity={0.3}
      />

      {/* Deep Space Background Stars */}
      <Stars
        radius={50}
        depth={40}
        count={isMobile ? 800 : 2500}
        factor={3}
        saturation={0.5}
        fade
        speed={0.5}
      />
    </>
  );
}

// Preload the GLTF Mars model
if (typeof window !== "undefined") {
  useGLTF.preload("/models/mars_planet_hero_section.glb");
}
