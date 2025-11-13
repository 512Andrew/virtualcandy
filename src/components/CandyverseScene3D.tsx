"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Html, useProgress } from "@react-three/drei";
import { CANDYVERSE_DATA } from "@/data/candyverse";
import { useRef, useState, memo, Suspense } from "react";
import * as THREE from "three";

// =========================
// Loading Component
// =========================
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-center">
        <div className="text-white">{progress.toFixed(0)}% loaded</div>
      </div>
    </Html>
  );
}

// =========================
// Planet Component (Memoized)
// =========================
const Planet3D = memo(function Planet3D({
  position,
  color,
  name,
  onClick,
}: {
  position: [number, number, number];
  color: string;
  name: string;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* Planet sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        scale={hovered ? 1.15 : 1}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>

      {/* Glow ring when hovered */}
      {hovered && (
        <mesh>
          <ringGeometry args={[1.0, 1.2, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Label with planet name */}
      {hovered && (
        <Html position={[0, -1.5, 0]} center>
          <div className="whitespace-nowrap rounded-lg bg-slate-900/80 px-3 py-1 text-sm font-medium text-white">
            {name}
          </div>
        </Html>
      )}
    </group>
  );
});

// =========================
// Lights Component (Memoized)
// =========================
const Lights = memo(function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
    </>
  );
});

// =========================
// Main Scene Component
// =========================
function SceneContent({
  onOpen,
}: {
  onOpen: (planetId: string, constellationId: string) => void;
}) {
  // Convert 2D percentage positions to 3D coordinates
  const planetPositions = CANDYVERSE_DATA.planets.map((planet) => {
    const x = (parseFloat(planet.x) - 50) / 10;
    const y = (50 - parseFloat(planet.y)) / 10;
    const z = 0;
    return { ...planet, position: [x, y, z] as [number, number, number] };
  });

  return (
    <>
      <Lights />
      
      {/* Starfield background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />

      {/* Planets */}
      {planetPositions.map((planet) => (
        <Planet3D
          key={planet.id}
          position={planet.position}
          color={planet.color}
          name={planet.name}
          onClick={() => onOpen(planet.id, planet.constellations[0].id)}
        />
      ))}

      {/* Camera controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={8}
        maxDistance={20}
        dampingFactor={0.05}
        rotateSpeed={0.5}
      />
    </>
  );
}

export default function CandyverseScene3D({
  onOpen,
}: {
  onOpen: (planetId: string, constellationId: string) => void;
}) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-900">
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }} gl={{ antialias: true, alpha: false }}>
          <Suspense fallback={<Loader />}>
            <SceneContent onOpen={onOpen} />
          </Suspense>
        </Canvas>

        {/* Instructions overlay */}
        <div className="pointer-events-none absolute bottom-3 left-3 text-xs text-white/80">
          Click planets to explore • Drag to rotate • Scroll to zoom
        </div>

        {/* Performance stats in dev mode */}
        {process.env.NODE_ENV === "development" && (
          <div className="pointer-events-none absolute top-3 left-3 rounded bg-black/50 px-2 py-1 text-xs text-white/80">
            Dev Mode
          </div>
        )}
      </div>
    </div>
  );
}
