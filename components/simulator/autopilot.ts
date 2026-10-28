'use client';

import * as THREE from 'three';
import { STATION_MAP, WORLD, toWorld, zoneCenter } from './config';
import { carRuntime } from './runtime';

/**
 * Lightweight auto-pilot: follows a short waypoint list (lane -> curb -> pad)
 * using the same steering model as the player, reverses out of tight spots and
 * teleports as a last resort if it gets wedged.
 */

interface Waypoint {
  x: number;
  z: number;
  final?: boolean;
}

const ap = {
  target: null as string | null,
  points: [] as Waypoint[],
  index: 0,
  stuck: 0,
  elapsed: 0,
};

const wrapAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

const buildRoute = (id: string): Waypoint[] => {
  const st = STATION_MAP[id];
  if (!st) return [];
  const p = carRuntime.position;
  const [zx, zz] = zoneCenter(st);
  const lane = st.side * WORLD.laneOffset;
  const dir = Math.sign(zx - p.x) || 1;
  const pts: Waypoint[] = [];

  const offRoad = Math.abs(p.z) > WORLD.roadHalf + 0.5;
  if (offRoad) pts.push({ x: p.x + dir * 5, z: Math.sign(p.z) * WORLD.laneOffset });

  const pre = { x: zx - dir * 11, z: lane };
  if ((pre.x - p.x) * dir > 2) pts.push(pre);

  const localCx = (st.zone.x0 + st.zone.x1) / 2;
  if (st.kind === 'estate') {
    // Line up square with the gate before driving through it.
    const align = toWorld(st, [localCx, 0, 7]);
    pts.push({ x: align[0], z: align[2] });
  }
  const curb = toWorld(st, [localCx, 0, st.zone.z1 + 3]);
  pts.push({ x: curb[0], z: curb[2] });
  pts.push({ x: zx, z: zz, final: true });
  return pts;
};

export const resetAutopilot = () => {
  ap.target = null;
  ap.points = [];
};

export function autopilotControl(targetId: string, dt: number, actualSpeed: number) {
  if (ap.target !== targetId) {
    ap.target = targetId;
    ap.points = buildRoute(targetId);
    ap.index = 0;
    ap.stuck = 0;
    ap.elapsed = 0;
  }
  ap.elapsed += dt;

  const wp = ap.points[ap.index];
  if (!wp) return { throttle: 0, steer: 0, brake: true };

  const p = carRuntime.position;
  const dx = wp.x - p.x;
  const dz = wp.z - p.z;
  const dist = Math.hypot(dx, dz);

  if (dist < (wp.final ? 1.2 : 3.2)) {
    ap.index++;
    return { throttle: 0, steer: 0, brake: !!wp.final };
  }

  // Unstick: teleport to the active waypoint facing the next one.
  if (ap.elapsed > 1.2 && Math.abs(actualSpeed) < 0.6) ap.stuck += dt;
  else ap.stuck = Math.max(0, ap.stuck - dt);
  if (ap.stuck > 1.6 || ap.elapsed > 45) {
    const next = ap.points[ap.index + 1] ?? wp;
    const yaw = next === wp ? carRuntime.yaw : Math.atan2(next.x - wp.x, next.z - wp.z);
    carRuntime.teleport = { x: wp.x, z: wp.z, yaw };
    ap.stuck = 0;
    ap.elapsed = 0;
    return { throttle: 0, steer: 0, brake: true };
  }

  const desired = Math.atan2(dx, dz);
  const err = wrapAngle(desired - carRuntime.yaw);

  // Target behind us and close: reverse with counter-steer.
  if (Math.abs(err) > 2.1 && dist < 18) {
    const errRev = wrapAngle(desired - (carRuntime.yaw + Math.PI));
    return { throttle: -0.7, steer: -THREE.MathUtils.clamp(errRev * 2, -1, 1), brake: false };
  }

  let targetSpeed = wp.final ? THREE.MathUtils.clamp(dist * 1.1, 3, 14) : 24;
  targetSpeed *= Math.max(0.28, 1 - Math.abs(err) / 1.5);
  const s = carRuntime.speed;
  const throttle = s < targetSpeed ? 1 : s > targetSpeed + 2 ? -1 : 0;
  return { throttle, steer: THREE.MathUtils.clamp(err * 2.4, -1, 1), brake: false };
}
