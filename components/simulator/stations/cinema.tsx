'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { STATION_MAP, stationOrigin, stationRotation, worldZone } from '../config';
import {
  createMarqueeTexture,
  createPosterTexture,
  createTitleCardTexture,
  useDisposable,
} from '../textures';
import { useSimStore } from '../store';
import { carRuntime } from '../runtime';

/**
 * Station 3: Project Cinema (Expanded & Detailed)
 * Exact architectural match to reference image:
 * Angled geometric stone blocks, vertical LED light channels,
 * glowing "PROJECT CINEMA / FEATURE PRESENTATION" marquee,
 * 4 illuminated movie-style poster lightboxes on facade,
 * transparent corner glass lobby with reception desk,
 * interior auditorium with giant projection screen, velvet seats,
 * and interactive project selection menu.
 */
export default function ProjectCinema() {
  const station = STATION_MAP['cinema'];
  const cameraMode = useSimStore((s) => s.cameraMode);
  const enterStation = useSimStore((s) => s.enterStation);
  const setSeated = useSimStore((s) => s.setSeated);


  // Procedural marquee texture ("PROJECT CINEMA / FEATURE PRESENTATION")
  const marqueeTex = useDisposable(createMarqueeTexture);

  // 4 Poster lightbox textures for facade matching reference photo
  const poster1Tex = useDisposable(() => createPosterTexture('Keepsafe', 'SECURE VAULT', '#2ee6b6', 1));
  const poster2Tex = useDisposable(() => createPosterTexture('Localbuka', 'FOOD DISCOVERY', '#ff8a3d', 2));
  const poster3Tex = useDisposable(() => createPosterTexture('Sterling', 'AI COMMERCE', '#3cb4ff', 3));
  const poster4Tex = useDisposable(() => createPosterTexture('Jopiter', 'SOCIAL FASHION', '#c38bff', 4));

  // Title card texture for auditorium screen
  const titleCardTex = useDisposable(() =>
    createTitleCardTexture('FEATURE PRESENTATION', 'SELECT A PROJECT TO BEGIN PLAYBACK')
  );

  const materials = useMemo(() => {
    return {
      stoneFacade: new THREE.MeshStandardMaterial({
        color: '#d9d5bc',
        roughness: 0.9,
        flatShading: true,
      }),
      stoneDark: new THREE.MeshStandardMaterial({
        color: '#586c70',
        roughness: 0.7,
        flatShading: true,
      }),
      glassFoyer: new THREE.MeshStandardMaterial({
        color: '#a4c6ce',
        emissive: '#fdba74',
        emissiveIntensity: 0.12,
        transparent: true,
        opacity: 0.65,
      }),
      ledChannel: new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: '#fef08a',
        emissiveIntensity: 0.12,
      }),
      neonMarqueeFrame: new THREE.MeshStandardMaterial({
        color: '#1e1b4b',
        roughness: 0.4,
      }),
      cinemaSeatVelvet: new THREE.MeshStandardMaterial({
        color: '#991b1b', // Deep ruby velvet
        roughness: 0.9,
        flatShading: true,
      }),
      auditoriumWall: new THREE.MeshStandardMaterial({
        color: '#49666a',
        roughness: 0.8,
      }),
      screenFrame: new THREE.MeshStandardMaterial({
        color: '#020617',
        roughness: 0.5,
      }),
    };
  }, []);

  const origin = stationOrigin(station);
  const rotY = stationRotation(station);
  const wz = useMemo(() => worldZone(station), [station]);



  // Zone proximity detection to enter Project Cinema
  useFrame(() => {
    if (cameraMode === 'interior') return;
    const cp = carRuntime.position;
    const inside = cp.x >= wz.x0 && cp.x <= wz.x1 && cp.z >= wz.z0 && cp.z <= wz.z1;

    if (inside && carRuntime.disarmedStation !== station.id) {
      enterStation(station.id, 'interior');
      setSeated(true);
    } else if (!inside && carRuntime.disarmedStation === station.id) {
      carRuntime.disarmedStation = null;
    }
  });

  return (
    <group position={origin} rotation={[0, rotY, 0]}>
      {/* ------------------------------------------------------------------ */}
      {/* 1. CINEMA EXTERIOR (Matching Reference Image)                       */}
      {/* ------------------------------------------------------------------ */}

      {/* Main Massive Textured Concrete Building Block */}
      <mesh
        position={[0, station.height / 2, -station.depth / 2]}
        material={materials.stoneFacade}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[station.width, station.height, station.depth]} />
      </mesh>

      {/* Dark Architectural Framing Blocks */}
      <mesh position={[-station.width * 0.44, station.height / 2, 0.4]} material={materials.stoneDark}>
        <boxGeometry args={[3.2, station.height, 0.8]} />
      </mesh>
      <mesh position={[station.width * 0.38, station.height * 0.58, 0.4]} material={materials.stoneDark}>
        <boxGeometry args={[4.2, station.height * 0.85, 0.8]} />
      </mesh>

      {/* Angled Relief Grooves & Vertical LED Channels on Facade (matching reference image) */}
      <group position={[-station.width * 0.18, station.height * 0.6, 0.08]}>
        {/* Angled groove cut */}
        <mesh rotation={[0, 0, 0.28]} material={materials.stoneDark}>
          <boxGeometry args={[0.12, 8.5, 0.1]} />
        </mesh>
        {/* Vertical glowing LED accent strip */}
        <mesh position={[-0.8, 0, 0.02]} material={materials.ledChannel}>
          <boxGeometry args={[0.08, 7.8, 0.06]} />
        </mesh>
        
      </group>

      <group position={[-station.width * 0.36, station.height * 0.52, 0.08]}>
        <mesh rotation={[0, 0, -0.32]} material={materials.stoneDark}>
          <boxGeometry args={[0.12, 7.5, 0.1]} />
        </mesh>
        <mesh position={[0.6, 0, 0.02]} material={materials.ledChannel}>
          <boxGeometry args={[0.08, 6.8, 0.06]} />
        </mesh>
      </group>

      {/* Horizontal LED strip above corner lobby glass */}
      <mesh position={[-station.width * 0.12, 5.0, 1.45]} material={materials.ledChannel}>
        <boxGeometry args={[14.2, 0.12, 0.08]} />
      </mesh>
      

      {/* Corner Glass Lobby / Foyer Showroom (matching reference image) */}
      <mesh position={[-station.width * 0.15, 2.45, 0.8]} material={materials.glassFoyer}>
        <boxGeometry args={[13.2, 4.8, 2.8]} />
      </mesh>
      {/* Black Entrance Door Frames */}
      <mesh position={[-station.width * 0.15, 2.45, 2.22]} material={materials.stoneDark}>
        <boxGeometry args={[4.2, 4.6, 0.1]} />
      </mesh>
      {/* Interior Reception Counter / Desk inside glass foyer */}
      <mesh position={[-station.width * 0.1, 1.1, -0.2]} material={materials.stoneDark}>
        <boxGeometry args={[4.2, 1.1, 1.2]} />
      </mesh>
      

      {/* ------------------------------------------------------------------ */}
      {/* ICONIC "PROJECT CINEMA" MARQUEE (Right Upper Facade)               */}
      {/* ------------------------------------------------------------------ */}
      <group position={[station.width * 0.22, station.height * 0.72, 0.6]}>
        {/* Outer Box Marquee Housing */}
        <mesh material={materials.neonMarqueeFrame}>
          <boxGeometry args={[12.8, 5.8, 0.6]} />
        </mesh>
        {/* Illuminated Sign Face with Dual Neon & Letterboard Texture */}
        <mesh position={[0, 0, 0.32]}>
          <planeGeometry args={[12.4, 5.4]} />
          <meshBasicMaterial map={marqueeTex} />
        </mesh>
        {/* Neon Pink & Cyan Light pools */}
        
        
      </group>

      {/* ------------------------------------------------------------------ */}
      {/* 4 ILLUMINATED POSTER LIGHTBOXES (Facade Wall Below Marquee)        */}
      {/* ------------------------------------------------------------------ */}
      <group position={[station.width * 0.22, 2.6, 0.45]}>
        {[
          { x: -4.5, tex: poster1Tex, color: '#2ee6b6' },
          { x: -1.5, tex: poster2Tex, color: '#ff8a3d' },
          { x: 1.5, tex: poster3Tex, color: '#3cb4ff' },
          { x: 4.5, tex: poster4Tex, color: '#c38bff' },
        ].map((poster, idx) => (
          <group key={idx} position={[poster.x, 0, 0]}>
            {/* Dark Beveled Metal Box Frame */}
            <mesh material={materials.stoneDark}>
              <boxGeometry args={[2.3, 3.4, 0.18]} />
            </mesh>
            {/* Illuminated Poster Face */}
            <mesh position={[0, 0, 0.1]}>
              <planeGeometry args={[2.1, 3.2]} />
              <meshBasicMaterial map={poster.tex} />
            </mesh>
            {/* Glow light */}
            
          </group>
        ))}
      </group>

      {/* Waypoint Entry Pad on Sidewalk */}
      <mesh position={[station.zone.x0 + (station.zone.x1 - station.zone.x0) / 2, 0.06, station.zone.z0 + (station.zone.z1 - station.zone.z0) / 2]}>
        <planeGeometry args={[station.zone.x1 - station.zone.x0, station.zone.z1 - station.zone.z0]} />
        <meshStandardMaterial
          color="#ff5fa2"
          emissive="#ff5fa2"
          emissiveIntensity={1.4}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* ------------------------------------------------------------------ */}
      {/* 2. CINEMA INTERIOR AUDITORIUM & GIANT PROJECTION SCREEN            */}
      {/* ------------------------------------------------------------------ */}
      <group position={[0, 0, -station.depth / 2 - 8]}>
        {/* Auditorium Acoustic Shell */}
        <mesh position={[0, 6, -10]} material={materials.auditoriumWall}>
          <boxGeometry args={[26, 12, 18]} />
        </mesh>

        {/* GIANT CURVED PROJECTION SCREEN */}
        <group position={[0, 5.5, -18.6]}>
          {/* Black Screen Outer Bezel */}
          <mesh material={materials.screenFrame}>
            <boxGeometry args={[18.8, 8.8, 0.2]} />
          </mesh>
          {/* Projection Surface with Dynamic Project Image/Card */}
          <mesh position={[0, 0, 0.12]}>
            <planeGeometry args={[18.2, 8.2]} />
            <meshBasicMaterial map={titleCardTex} />
          </mesh>
          {/* Ambient Screen Light Cast onto Theatre */}
          
        </group>

        {/* Rows of Velvet Auditorium Seats (stepped incline) */}
        {[-4, -7, -10].map((rz, rowIdx) => (
          <group key={rowIdx} position={[0, 1.2 + rowIdx * 0.45, rz]}>
            {[-6, -4, -2, 0, 2, 4, 6].map((sx, seatIdx) => (
              <group key={seatIdx} position={[sx, 0, 0]}>
                {/* Velvet seat cushion */}
                <mesh position={[0, 0.2, 0]} material={materials.cinemaSeatVelvet} castShadow>
                  <boxGeometry args={[1.3, 0.25, 1.0]} />
                </mesh>
                {/* Velvet backrest */}
                <mesh position={[0, 0.75, -0.45]} rotation={[-0.1, 0, 0]} material={materials.cinemaSeatVelvet}>
                  <boxGeometry args={[1.3, 0.9, 0.2]} />
                </mesh>
                {/* Armrests */}
                <mesh position={[-0.7, 0.45, 0]} material={materials.stoneDark}>
                  <boxGeometry args={[0.1, 0.4, 0.9]} />
                </mesh>
                <mesh position={[0.7, 0.45, 0]} material={materials.stoneDark}>
                  <boxGeometry args={[0.1, 0.4, 0.9]} />
                </mesh>
              </group>
            ))}
          </group>
        ))}

        {/* Step Strip Lights on Carpet Aisle */}
        {[-3, -6, -9].map((lz, idx) => (
          <mesh key={idx} position={[0, 0.8 + idx * 0.45, lz]} material={materials.ledChannel}>
            <boxGeometry args={[1.8, 0.04, 0.08]} />
          </mesh>
        ))}
      </group>

      {/* ------------------------------------------------------------------ */}
      {/* 3. DREI <HTML> INTERACTIVE PROJECT THEATRE UI                      */}
      {/* ------------------------------------------------------------------ */}

    </group>
  );
}
