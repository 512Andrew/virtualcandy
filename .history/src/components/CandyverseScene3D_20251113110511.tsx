"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { CANDYVERSE_DATA } from "@/data/candyverse";
import { useRef, useState } from "react";
import * as THREE from "three";

// =========================
// Planet Component
// =========================
function Planet3D({
  position,
  color,
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

      {/* Label (HTML overlay would be better but keeping it simple) */}
      {hovered && (
        <mesh position={[0, -1.3, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
      )}
    </group>
  );
}

// =========================
// Main Scene Component
// =========================
export default function CandyverseScene3D({
  onOpen,
}: {
  onOpen: (planetId: string, constellationId: string) => void;
}) {
  // Convert 2D percentage positions to 3D coordinates
  // Map the existing x,y percentages to a 3D space
  const planetPositions = CANDYVERSE_DATA.planets.map((planet) => {
    const x = (parseFloat(planet.x) - 50) / 10; // Center at 0, scale down
    const y = (50 - parseFloat(planet.y)) / 10; // Invert Y for 3D space
    const z = 0; // Keep on same plane initially
    return { ...planet, position: [x, y, z] as [number, number, number] };
  });

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="aspect-video rounded-2xl bg-slate-900 relative overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          gl={{ antialias: true, alpha: false }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />

          {/* Starfield background */}
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />

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
        </Canvas>

        {/* Instructions overlay */}
        <div className="absolute bottom-3 left-3 text-xs text-white/80 pointer-events-none">
          Click planets to explore • Drag to rotate • Scroll to zoom
        </div>

        {/* Planet labels overlay */}
        <div className="absolute top-3 right-3 text-xs text-white/90 bg-black/30 backdrop-blur-sm rounded-lg p-2 pointer-events-none">
          <div className="font-semibold mb-1">Planets:</div>
          {CANDYVERSE_DATA.planets.map((planet) => (
            <div key={planet.id} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: planet.color }}
              />
              <span>{planet.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
