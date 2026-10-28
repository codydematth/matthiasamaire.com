'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { OFFICE_STATIONS, StationDef, stationOrigin, stationRotation, worldZone } from '../config';
import { createCodeTexture, createNeonSign, useDisposable } from '../textures';
import { useSimStore } from '../store';
import { carRuntime } from '../runtime';

/**
 * Single Branded Office Building
 * Matches the reference image's modern geometric architecture:
 * Angled concrete panels, vertical warm LED accent strips,
 * illuminated branded logo & neon marquee, glass entrance foyer.
 */
function OfficeBuilding({ station }: { station: StationDef }) {
  const currentStation = useSimStore((s) => s.currentStation);
  const cameraMode = useSimStore((s) => s.cameraMode);
  const enterStation = useSimStore((s) => s.enterStation);

  const isCurrent = currentStation === station.id;
  const isInterior = isCurrent && cameraMode === 'interior';

  // Procedural neon signage texture with company branding & logo
  const signTex = useDisposable(
    () =>
      createNeonSign({
        title: station.label,
        subtitle: 'ENGINEERING LAB',
        color: station.color,
        logo: station.logo,
        width: 1024,
        height: 288,
      })
  );

  // Scrolling code screen texture for interior monitors
  const codeTex = useDisposable(() => createCodeTexture(station.color));

  // Code scrolling animation
  useFrame((_, delta) => {
    if (isInterior) {
      codeTex.offset.setY((codeTex.offset.y + delta * 0.08) % 1);
    }
  });

  const materials = useMemo(() => {
    return {
      concreteMain: new THREE.MeshStandardMaterial({
        color: '#d9d5bc',
        roughness: 0.85,
        flatShading: true,
      }),
      concreteDark: new THREE.MeshStandardMaterial({
        color: '#586c70',
        roughness: 0.7,
        flatShading: true,
      }),
      glassFoyer: new THREE.MeshStandardMaterial({
        color: '#a4c6ce',
        emissive: '#fde047',
        emissiveIntensity: 0.12,
        transparent: true,
        opacity: 0.75,
      }),
      ledStrip: new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: station.color,
        emissiveIntensity: 0.12,
      }),
      deskWood: new THREE.MeshStandardMaterial({
        color: '#1e293b',
        roughness: 0.5,
      }),
      screenMat: new THREE.MeshBasicMaterial({
        map: codeTex,
      }),
      avatarShirt: new THREE.MeshStandardMaterial({
        color: '#3b82f6',
        roughness: 0.8,
        flatShading: true,
      }),
      avatarSkin: new THREE.MeshStandardMaterial({
        color: '#8d5524',
        roughness: 0.7,
        flatShading: true,
      }),
    };
  }, [station.color, codeTex]);

  const origin = stationOrigin(station);
  const rotY = stationRotation(station);
  const wz = useMemo(() => worldZone(station), [station]);

  // Proximity check on every frame for entering this office zone
  useFrame(() => {
    if (cameraMode === 'interior') return;
    const cp = carRuntime.position;
    const inside = cp.x >= wz.x0 && cp.x <= wz.x1 && cp.z >= wz.z0 && cp.z <= wz.z1;

    if (inside && carRuntime.disarmedStation !== station.id) {
      enterStation(station.id, 'interior');
    } else if (!inside && carRuntime.disarmedStation === station.id) {
      carRuntime.disarmedStation = null;
    }
  });

  // Animated developer avatar arm typing
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!isInterior) return;
    const t = clock.getElapsedTime() * 9;
    if (leftArmRef.current) leftArmRef.current.rotation.x = -0.55 + Math.sin(t) * 0.12;
    if (rightArmRef.current) rightArmRef.current.rotation.x = -0.55 + Math.cos(t * 1.2) * 0.12;
  });

  return (
    <group position={origin} rotation={[0, rotY, 0]}>
      {/* Main Angular Concrete Building Block */}
      <mesh position={[0, station.height / 2, -station.depth / 2]} material={materials.concreteMain} castShadow receiveShadow>
        <boxGeometry args={[station.width, station.height, station.depth]} />
      </mesh>

      {/* Recessed Lower Foyer / Showroom Box */}
      <mesh position={[0, 2.5, 0.4]} material={materials.glassFoyer}>
        <boxGeometry args={[station.width * 0.72, 4.8, 2.8]} />
      </mesh>

      {/* Foyer Portal Frame */}
      <mesh position={[0, 2.5, 1.85]} material={materials.concreteDark}>
        <boxGeometry args={[station.width * 0.76, 5.0, 0.3]} />
      </mesh>

      {/* Integrated Vertical LED Light Strips (matching reference image) */}
      {[-station.width * 0.42, station.width * 0.42].map((lx, idx) => (
        <group key={idx} position={[lx, station.height / 2, 0.05]}>
          <mesh material={materials.ledStrip}>
            <boxGeometry args={[0.12, station.height * 0.85, 0.08]} />
          </mesh>
          
        </group>
      ))}

      {/* Angular Wall Seam Relief Cuts */}
      <mesh position={[-station.width * 0.2, station.height * 0.65, 0.04]} rotation={[0, 0, 0.25]} material={materials.concreteDark}>
        <boxGeometry args={[0.08, station.height * 0.5, 0.04]} />
      </mesh>
      <mesh position={[station.width * 0.25, station.height * 0.75, 0.04]} rotation={[0, 0, -0.15]} material={materials.concreteDark}>
        <boxGeometry args={[0.08, station.height * 0.4, 0.04]} />
      </mesh>

      {/* Illuminated Branded Neon Marquee Signboard */}
      <group position={[0, station.height * 0.68, 0.3]}>
        {/* Frame backing */}
        <mesh material={materials.concreteDark}>
          <boxGeometry args={[11.2, 3.4, 0.35]} />
        </mesh>
        {/* Glowing Sign Face */}
        <mesh position={[0, 0, 0.2]}>
          <planeGeometry args={[10.8, 3.0]} />
          <meshBasicMaterial map={signTex} />
        </mesh>
        {/* Light pool from sign */}
        
      </group>

      {/* Entry Waypoint Marker Pad on Pavement */}
      <mesh position={[0, 0.06, station.zone.z0 + (station.zone.z1 - station.zone.z0) / 2]}>
        <planeGeometry args={[station.zone.x1 - station.zone.x0, station.zone.z1 - station.zone.z0]} />
        <meshStandardMaterial
          color={station.color}
          emissive={station.color}
          emissiveIntensity={1.2}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* ------------------------------------------------------------------ */}
      {/* INTERIOR WORKSTATION SCENE: Developer Avatar & Scrolling Code Mon  */}
      {/* ------------------------------------------------------------------ */}
      <group position={[0, 0, -station.depth / 2 + 1.2]}>
        {/* Interior Floor & Walls */}
        <mesh position={[0, 0.02, 0]} receiveShadow>
          <boxGeometry args={[8, 0.04, 6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>

        {/* Developer Desk */}
        <mesh position={[0, 1.1, -1.2]} material={materials.deskWood} castShadow>
          <boxGeometry args={[3.2, 0.08, 1.4]} />
        </mesh>
        {/* Desk Legs */}
        <mesh position={[-1.4, 0.55, -1.2]} material={materials.concreteDark}>
          <boxGeometry args={[0.1, 1.1, 1.2]} />
        </mesh>
        <mesh position={[1.4, 0.55, -1.2]} material={materials.concreteDark}>
          <boxGeometry args={[0.1, 1.1, 1.2]} />
        </mesh>

        {/* Dual Ergonomic Monitors with Scrolling Code Texture */}
        {/* Left Monitor (angled inwards) */}
        <group position={[-0.85, 1.7, -1.4]} rotation={[0, 0.22, 0]}>
          <mesh material={materials.concreteDark}>
            <boxGeometry args={[1.35, 0.85, 0.06]} />
          </mesh>
          <mesh position={[0, 0, 0.035]} material={materials.screenMat}>
            <planeGeometry args={[1.28, 0.78]} />
          </mesh>
        </group>

        {/* Right Monitor (angled inwards) */}
        <group position={[0.85, 1.7, -1.4]} rotation={[0, -0.22, 0]}>
          <mesh material={materials.concreteDark}>
            <boxGeometry args={[1.35, 0.85, 0.06]} />
          </mesh>
          <mesh position={[0, 0, 0.035]} material={materials.screenMat}>
            <planeGeometry args={[1.28, 0.78]} />
          </mesh>
        </group>

        {/* Monitor Glow Spotlight on Developer Desk */}
        

        {/* Mechanical Keyboard & Mouse */}
        <mesh position={[0, 1.16, -0.9]} material={materials.concreteDark}>
          <boxGeometry args={[0.9, 0.03, 0.28]} />
        </mesh>
        <mesh position={[0.7, 1.16, -0.9]} material={materials.concreteDark}>
          <boxGeometry args={[0.12, 0.03, 0.18]} />
        </mesh>

        {/* Ergonomic Office Chair */}
        <group position={[0, 0.8, -0.2]}>
          <mesh material={materials.concreteDark}>
            <boxGeometry args={[0.8, 0.1, 0.8]} />
          </mesh>
          <mesh position={[0, 0.55, 0.35]} material={materials.concreteDark}>
            <boxGeometry args={[0.8, 0.9, 0.1]} />
          </mesh>
          <mesh position={[0, -0.4, 0]} material={materials.concreteDark}>
            <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
          </mesh>
        </group>

        {/* DEVELOPER AVATAR MESH (Sitting & actively coding) */}
        <group position={[0, 0.95, -0.2]}>
          {/* Torso */}
          <mesh position={[0, 0.45, 0]} material={materials.avatarShirt}>
            <boxGeometry args={[0.6, 0.7, 0.4]} />
          </mesh>

          {/* Head */}
          <mesh position={[0, 1.0, 0.02]} material={materials.avatarSkin}>
            <boxGeometry args={[0.34, 0.36, 0.34]} />
          </mesh>

          {/* Left Arm Typing */}
          <group position={[-0.38, 0.65, 0]} ref={leftArmRef}>
            <mesh position={[0, -0.25, -0.2]} rotation={[0.4, 0, 0]} material={materials.avatarShirt}>
              <boxGeometry args={[0.16, 0.5, 0.16]} />
            </mesh>
          </group>

          {/* Right Arm Typing */}
          <group position={[0.38, 0.65, 0]} ref={rightArmRef}>
            <mesh position={[0, -0.25, -0.2]} rotation={[0.4, 0, 0]} material={materials.avatarShirt}>
              <boxGeometry args={[0.16, 0.5, 0.16]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ------------------------------------------------------------------ */}
      {/* 3D INTERIOR HTML MODAL: Professional Experience Details & Exit CTA */}
      {/* ------------------------------------------------------------------ */}

    </group>
  );
}

/**
 * All Branded Experience Offices along the boulevard
 */
export default function ExperienceOffices() {
  return (
    <>
      {OFFICE_STATIONS.map((station) => (
        <OfficeBuilding key={station.id} station={station} />
      ))}
    </>
  );
}
