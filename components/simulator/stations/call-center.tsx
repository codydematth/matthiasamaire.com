'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { PhoneCall, Mail, MessageSquare, Send, ArrowLeft } from 'lucide-react';
import { STATION_MAP, stationOrigin, stationRotation, worldZone } from '../config';
import { useSimStore } from '../store';
import { carRuntime } from '../runtime';
import { createNeonSign, useDisposable } from '../textures';

/**
 * Station 4: Call Center
 * Futuristic low-poly glass telephone booth pavilion with glowing neon signage,
 * terminal kiosk, and interactive contact triggers.
 */
export default function CallCenterStation() {
  const station = STATION_MAP['callcenter'];
  const currentStation = useSimStore((s) => s.currentStation);
  const cameraMode = useSimStore((s) => s.cameraMode);
  const enterStation = useSimStore((s) => s.enterStation);
  const exitStation = useSimStore((s) => s.exitStation);
  const setContactOpen = useSimStore((s) => s.setContactOpen);

  const isCurrent = currentStation === station.id;
  const isInterior = isCurrent && cameraMode === 'interior';

  // Neon signage
  const signTex = useDisposable(
    () =>
      createNeonSign({
        title: 'CALL CENTER',
        subtitle: 'DIRECT CONNECT',
        color: '#38f2ff',
        width: 1024,
        height: 288,
      })
  );

  const materials = useMemo(() => {
    return {
      pavilionDark: new THREE.MeshStandardMaterial({
        color: '#49666a',
        roughness: 0.5,
        flatShading: true,
      }),
      glassNeon: new THREE.MeshStandardMaterial({
        color: '#a5f3fc',
        emissive: '#06b6d4',
        emissiveIntensity: 0.12,
        transparent: true,
        opacity: 0.55,
      }),
      neonCyan: new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: '#06b6d4',
        emissiveIntensity: 0.12,
      }),
      terminalScreen: new THREE.MeshBasicMaterial({
        color: '#0284c7',
      }),
      boothRed: new THREE.MeshStandardMaterial({
        color: '#ef4444',
        roughness: 0.4,
        flatShading: true,
      }),
    };
  }, []);

  const origin = stationOrigin(station);
  const rotY = stationRotation(station);
  const wz = useMemo(() => worldZone(station), [station]);

  // Proximity detection for entering Call Center
  useFrame(() => {
    if (cameraMode === 'interior') return;
    const cp = carRuntime.position;
    const inside = cp.x >= wz.x0 && cp.x <= wz.x1 && cp.z >= wz.z0 && cp.z <= wz.z1;

    if (inside && carRuntime.disarmedStation !== station.id) {
      enterStation(station.id, 'interior');
      setContactOpen(true);
    } else if (!inside && carRuntime.disarmedStation === station.id) {
      carRuntime.disarmedStation = null;
    }
  });

  return (
    <group position={origin} rotation={[0, rotY, 0]}>
      {/* Pavilion Ground Base */}
      <mesh position={[0, 0.05, 0]} material={materials.pavilionDark} receiveShadow>
        <boxGeometry args={[station.width, 0.1, station.depth]} />
      </mesh>

      {/* Modern Cantilever Roof */}
      <mesh position={[0, station.height, 0]} material={materials.pavilionDark} castShadow>
        <boxGeometry args={[station.width * 1.05, 0.4, station.depth * 1.1]} />
      </mesh>

      {/* Roof Edge Glowing Cyan Neon Strip */}
      <mesh position={[0, station.height - 0.25, station.depth * 0.55]} material={materials.neonCyan}>
        <boxGeometry args={[station.width * 1.04, 0.08, 0.08]} />
      </mesh>
      

      {/* Support Columns */}
      {[-station.width * 0.44, station.width * 0.44].map((px, idx) => (
        <group key={idx} position={[px, station.height / 2, 0]}>
          <mesh material={materials.pavilionDark}>
            <cylinderGeometry args={[0.2, 0.2, station.height, 8]} />
          </mesh>
          <mesh position={[0, 0, 0.22]} material={materials.neonCyan}>
            <boxGeometry args={[0.08, station.height * 0.8, 0.06]} />
          </mesh>
        </group>
      ))}

      {/* Neon Signboard on Pavilion Fascia */}
      <group position={[0, station.height + 1.2, station.depth * 0.4]}>
        <mesh material={materials.pavilionDark}>
          <boxGeometry args={[9.5, 2.4, 0.25]} />
        </mesh>
        <mesh position={[0, 0, 0.14]}>
          <planeGeometry args={[9.2, 2.1]} />
          <meshBasicMaterial map={signTex} />
        </mesh>
        
      </group>

      {/* 3 Futuristic Telephone Booth Pods / Glass Kiosks */}
      {[-4.2, 0, 4.2].map((bx, idx) => (
        <group key={idx} position={[bx, 2.0, 0]}>
          {/* Booth Back Wall */}
          <mesh position={[0, 0, -1.1]} material={materials.pavilionDark}>
            <boxGeometry args={[2.4, 3.8, 0.2]} />
          </mesh>
          {/* Glass Side Walls */}
          <mesh position={[-1.15, 0, 0]} material={materials.glassNeon}>
            <boxGeometry args={[0.08, 3.8, 2.2]} />
          </mesh>
          <mesh position={[1.15, 0, 0]} material={materials.glassNeon}>
            <boxGeometry args={[0.08, 3.8, 2.2]} />
          </mesh>
          {/* Glowing Telephone Console Terminal */}
          <mesh position={[0, -0.2, -0.8]} material={materials.terminalScreen}>
            <boxGeometry args={[0.8, 1.2, 0.3]} />
          </mesh>
          {/* Classic Handset Mesh */}
          <mesh position={[0, 0.1, -0.6]} material={materials.boothRed}>
            <boxGeometry args={[0.2, 0.6, 0.15]} />
          </mesh>
          
        </group>
      ))}

      {/* Waypoint Entry Pad */}
      <mesh position={[0, 0.06, station.zone.z0 + (station.zone.z1 - station.zone.z0) / 2]}>
        <planeGeometry args={[station.zone.x1 - station.zone.x0, station.zone.z1 - station.zone.z0]} />
        <meshStandardMaterial
          color="#38f2ff"
          emissive="#38f2ff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* ------------------------------------------------------------------ */}
      {/* 3D INTERIOR HTML DIALOG: Direct Contact Links & Options            */}
      {/* ------------------------------------------------------------------ */}
      {isInterior && (
        <Html
          zIndexRange={[20, 0]}
          position={[0, 2.6, 1.8]}
          transform
          distanceFactor={6.5}
          className="pointer-events-auto select-none"
        >
          <div className="w-[460px] bg-white/95 backdrop-blur-xl p-6 rounded-2xl border border-emerald-200 shadow-2xl text-slate-700 font-sans">
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <PhoneCall className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800">
                    Direct Contact Terminal
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold">
                    Matthias Amire &bull; Immediate Inquiries
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  exitStation();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200 transition-colors shadow-md cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Drive</span>
              </button>
            </div>

            <p className="text-xs text-slate-700 mt-3 leading-relaxed">
              Available for full-time Software Engineering, Technical Support, and Developer Support opportunities. Choose your preferred communication channel below:
            </p>

            <div className="grid grid-cols-2 gap-2.5 mt-4 text-xs font-semibold">
              <a
                href="mailto:support@matthiasamire.com"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-md shadow-cyan-600/30"
              >
                <Mail className="w-4 h-4" />
                <span>Direct Email</span>
              </a>

              <a
                href="https://www.linkedin.com/in/codydematth/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>LinkedIn Message</span>
              </a>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  // Trigger main contact modal popup
                  setContactOpen(true);
                }}
                className="flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open Instant Message Form</span>
              </button>

              <button
                onClick={() => {
                  exitStation();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-100 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Back to Roadster
              </button>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
