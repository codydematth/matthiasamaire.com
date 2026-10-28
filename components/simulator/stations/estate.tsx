'use client';

import React, { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import Image from 'next/image';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Download, Sparkles } from 'lucide-react';
import { carRuntime } from '../runtime';
import { STATION_MAP, stationOrigin, toWorld } from '../config';

/**
 * Station 1: The Estate
 * Modern low-poly house, proximity-triggered opening gate,
 * and an HTML billboard displaying avatar image (/images/avatar.png) and headline.
 */
export default function EstateStation() {
  const station = STATION_MAP['estate'];
  const [gateOpen, setGateOpen] = useState(false);
  const leftGateRef = useRef<THREE.Group>(null);
  const rightGateRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => ({
    villaWhite: new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.85, flatShading: true }),
    villaDark: new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.6, flatShading: true }),
    villaWood: new THREE.MeshStandardMaterial({ color: '#c27844', roughness: 0.7, flatShading: true }),
    glassWarm: new THREE.MeshStandardMaterial({
      color: '#a4c6ce',
      emissive: '#fde047',
      emissiveIntensity: 0.12,
    }),
    gateMetal: new THREE.MeshStandardMaterial({ color: '#49666a', roughness: 0.4, metalness: 0.8 }),
    curbStone: new THREE.MeshStandardMaterial({ color: '#d9d5bc', roughness: 0.8, flatShading: true }),
    lawn: new THREE.MeshStandardMaterial({ color: '#8fae6a', roughness: 0.9, flatShading: true }),
  }), []);

  // Proximity detection for automatic gate opening
  const origin = stationOrigin(station);
  const gateWorldPos = toWorld(station, [0, 0, 7]);

  useFrame((_, delta) => {
    const carPos = carRuntime.position;
    const distToGate = Math.hypot(carPos.x - gateWorldPos[0], carPos.z - gateWorldPos[2]);
    const shouldOpen = distToGate < 14;

    if (shouldOpen !== gateOpen) {
      setGateOpen(shouldOpen);
    }

    // Smooth gate swing rotation
    const targetAngle = shouldOpen ? Math.PI / 2.2 : 0;
    if (leftGateRef.current && rightGateRef.current) {
      leftGateRef.current.rotation.y = THREE.MathUtils.damp(
        leftGateRef.current.rotation.y,
        -targetAngle,
        4,
        delta
      );
      rightGateRef.current.rotation.y = THREE.MathUtils.damp(
        rightGateRef.current.rotation.y,
        targetAngle,
        4,
        delta
      );
    }
  });

  return (
    <group position={origin}>
      {/* Front Lawn / Courtyard Base */}
      <mesh position={[0, 0.05, -2]} material={materials.lawn} receiveShadow>
        <boxGeometry args={[28, 0.1, 24]} />
      </mesh>

      {/* Cobblestone Driveway */}
      <mesh position={[0, 0.08, 0]} material={materials.curbStone} receiveShadow>
        <boxGeometry args={[7.5, 0.05, 20]} />
      </mesh>

      {/* Main Multi-Story Modern Villa Structure */}
      <group position={[0, 0, -10]}>
        {/* Ground Floor Main Block */}
        <mesh position={[0, 2.5, 0]} material={materials.villaWhite} castShadow receiveShadow>
          <boxGeometry args={[22, 5, 12]} />
        </mesh>

        {/* Second Story Cantilever / Architectural Terrace */}
        <mesh position={[-2, 6.2, 1.2]} material={materials.villaDark} castShadow>
          <boxGeometry args={[14, 3.2, 11]} />
        </mesh>

        {/* Wood Slat Architectural Accent Wall */}
        <mesh position={[6.5, 6, 4.8]} material={materials.villaWood}>
          <boxGeometry args={[6.5, 3.6, 0.2]} />
        </mesh>

        {/* Warm Picture Windows (Ground Floor) */}
        <mesh position={[-4, 2.2, 6.05]} material={materials.glassWarm}>
          <boxGeometry args={[7, 2.8, 0.1]} />
        </mesh>
        <mesh position={[4.5, 2.2, 6.05]} material={materials.glassWarm}>
          <boxGeometry args={[6, 2.8, 0.1]} />
        </mesh>

        {/* Balcony Picture Windows (Upper Floor) */}
        <mesh position={[-2, 6.2, 6.75]} material={materials.glassWarm}>
          <boxGeometry args={[10, 2.2, 0.1]} />
        </mesh>

        {/* Villa Entrance Canopy Roof */}
        <mesh position={[0, 4.2, 7.5]} material={materials.villaDark}>
          <boxGeometry args={[8, 0.3, 3]} />
        </mesh>
        {/* Support Pillar */}
        <mesh position={[-3.6, 2.1, 8.8]} material={materials.villaDark}>
          <cylinderGeometry args={[0.12, 0.12, 4.2, 8]} />
        </mesh>
        <mesh position={[3.6, 2.1, 8.8]} material={materials.villaDark}>
          <cylinderGeometry args={[0.12, 0.12, 4.2, 8]} />
        </mesh>
      </group>

      {/* Perimeter Wall */}
      <mesh position={[-9, 1.1, 7]} material={materials.villaWhite} castShadow>
        <boxGeometry args={[10, 2.2, 0.6]} />
      </mesh>
      <mesh position={[9, 1.1, 7]} material={materials.villaWhite} castShadow>
        <boxGeometry args={[10, 2.2, 0.6]} />
      </mesh>

      {/* Gate Pillars with Warm Lanterns */}
      <mesh position={[-3.8, 1.4, 7]} material={materials.villaDark} castShadow>
        <boxGeometry args={[0.8, 2.8, 0.8]} />
      </mesh>
      <mesh position={[-3.8, 2.9, 7]} material={materials.glassWarm}>
        <boxGeometry args={[0.4, 0.2, 0.4]} />
      </mesh>
      

      <mesh position={[3.8, 1.4, 7]} material={materials.villaDark} castShadow>
        <boxGeometry args={[0.8, 2.8, 0.8]} />
      </mesh>
      <mesh position={[3.8, 2.9, 7]} material={materials.glassWarm}>
        <boxGeometry args={[0.4, 0.2, 0.4]} />
      </mesh>
      

      {/* Proximity-Triggered Opening Gate Wings */}
      {/* Left Gate Wing */}
      <group position={[-3.4, 1.1, 7]} ref={leftGateRef}>
        <mesh position={[1.6, 0, 0]} material={materials.gateMetal}>
          <boxGeometry args={[3.2, 1.8, 0.1]} />
        </mesh>
        {/* Gate decorative slats */}
        {[-1.2, -0.6, 0, 0.6, 1.2].map((gx, idx) => (
          <mesh key={idx} position={[1.6 + gx, 0, 0.08]} material={materials.villaWood}>
            <boxGeometry args={[0.12, 1.6, 0.06]} />
          </mesh>
        ))}
      </group>

      {/* Right Gate Wing */}
      <group position={[3.4, 1.1, 7]} ref={rightGateRef}>
        <mesh position={[-1.6, 0, 0]} material={materials.gateMetal}>
          <boxGeometry args={[3.2, 1.8, 0.1]} />
        </mesh>
        {[-1.2, -0.6, 0, 0.6, 1.2].map((gx, idx) => (
          <mesh key={idx} position={[-1.6 + gx, 0, 0.08]} material={materials.villaWood}>
            <boxGeometry args={[0.12, 1.6, 0.06]} />
          </mesh>
        ))}
      </group>

      {/* Driveway Entry Waypoint Pad */}
      <mesh position={[0, 0.09, 3.5]}>
        <planeGeometry args={[5, 4]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={gateOpen ? 1.5 : 0.4}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* HTML BILLBOARD: Matthias Amire Profile & Headline */}
      <group position={[-9, 4.4, 6.8]} rotation={[0, 0, 0]}>
        {/* Billboard Frame & Support Legs */}
        <mesh position={[0, -1.8, 0]} material={materials.villaDark}>
          <cylinderGeometry args={[0.1, 0.1, 3.6, 8]} />
        </mesh>
        <mesh position={[0, 0, 0]} material={materials.villaDark}>
          <boxGeometry args={[8.8, 5.2, 0.25]} />
        </mesh>
        {/* Glowing border accent */}
        <mesh position={[0, 0, 0.14]}>
          <boxGeometry args={[8.6, 5.0, 0.04]} />
          <meshStandardMaterial color="#6366f1" emissive="#4f46e5" emissiveIntensity={0.15} />
        </mesh>

        {/* 3D Drei <Html> Overlay */}
        <Html
          zIndexRange={[20, 0]}
          position={[0, 0, 0.2]}
          transform
          distanceFactor={7.5}
          className="pointer-events-auto select-none"
        >
          <div className="w-[480px] bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-emerald-200 shadow-2xl text-slate-700 font-sans">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-400 shrink-0 shadow-lg bg-white/95">
                <Image
                  src="/images/avatar.png"
                  alt="Matthias Amire"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available Worldwide
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">
                  Matthias Amire
                </h3>
                <p className="text-xs font-semibold text-emerald-700">
                  Software Engineer &amp; Problem Solver
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-700 mt-3 leading-relaxed">
              3+ years building production applications with <strong>React, Next.js, React Native &amp; TypeScript</strong>.
              Specialized in API integrations and systematic root-cause troubleshooting.
            </p>

            <div className="grid grid-cols-2 gap-2 mt-4 text-[11px]">
              <a
                href="/media/Matthias-Amire-Software-Engineer-Resume.pdf"
                download="Matthias-Amire-Software-Engineer-Resume.pdf"
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume (SWE)</span>
              </a>
              <a
                href="/media/Matthias-Amire-Technical-Support-Engineer-Resume.pdf"
                download="Matthias-Amire-Technical-Support-Engineer-Resume.pdf"
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-100 text-slate-700 font-semibold border border-slate-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-700" />
                <span>Resume (Support)</span>
              </a>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Estate Gate Status: <strong className={gateOpen ? 'text-emerald-400' : 'text-slate-400'}>{gateOpen ? 'OPEN' : 'CLOSED'}</strong>
              </span>
              <span className="text-emerald-700 font-mono">matthiasamire.com</span>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}
