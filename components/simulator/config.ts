import { experiences, type Experience } from '@/data/portfolio';

/* -------------------------------------------------------------------------- */
/*  World layout                                                              */
/*  The boulevard runs along +X. North side = negative Z, south side = +Z.    */
/* -------------------------------------------------------------------------- */

export const WORLD = {
  roadHalf: 7,
  laneOffset: 3.5,
  /** Paved sidewalk/plaza strip extends from the curb to this |z|. */
  pavedOuter: 17,
  /** Distance from road centre to every station's front line. */
  front: 16,
  roadStartX: -78,
  roadEndX: 228,
  plazaX: 248,
  plazaRadius: 21,
  fountainRadius: 4.2,
  boundsMinX: -82,
  boundsMaxX: 272,
  boundsZ: 40,
  start: { x: -60, z: 3.5, yaw: Math.PI / 2 },
} as const;

/** Daylight city palette. Destination colours retain each company's identity. */
export const PALETTE = {
  skyTop: '#cde7eb',
  skyMid: '#edf5e8',
  skyHorizon: '#e1efda',
  sun: '#fff5dc',
  fog: '#cde7eb',
  grass: '#a5bb87',
  pavement: '#c8cbb6',
  asphalt: '#87928e',
  concrete: '#d9d5bc',
  concreteDark: '#51626a',
  glassWarm: '#a4c6ce',
  lampWarm: '#f3ecd1',
} as const;

export type StationKind = 'estate' | 'office' | 'cinema' | 'callcenter';

export interface Rect {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
}

export interface StationView {
  pos: [number, number, number];
  target: [number, number, number];
}

export interface StationDef {
  id: string;
  kind: StationKind;
  label: string;
  shortLabel: string;
  emoji: string;
  /** World X of the station centre. */
  x: number;
  /** -1 = north side (negative Z), 1 = south side (positive Z). */
  side: 1 | -1;
  width: number;
  depth: number;
  height: number;
  color: string;
  logo?: string;
  /** Entry pad in station-local coordinates (local +Z faces the road). */
  zone: Rect;
  /** Camera choreography in local coordinates. */
  views?: { approach: StationView; inside: StationView; seat?: StationView };
  experience?: Experience[];
}

const OFFICE_ZONE: Rect = { x0: -3.2, x1: 3.2, z0: 1.8, z1: 7.4 };
const OFFICE_VIEWS = {
  approach: { pos: [0, 2.4, 13], target: [0, 1.3, -10.6] },
  inside: { pos: [2.4, 2.15, -5.1], target: [-0.25, 1.25, -10.7] },
} satisfies StationDef['views'];

const findExperience = (needle: string) =>
  experiences.filter((e) => e.companyName.toLowerCase().includes(needle.toLowerCase()));

const office = (
  key: string,
  label: string,
  x: number,
  side: 1 | -1,
  height: number,
  color: string,
  logo: string,
): StationDef => ({
  id: `office-${key}`,
  kind: 'office',
  label,
  shortLabel: label,
  emoji: '💼',
  x,
  side,
  width: 16,
  depth: 14,
  height,
  color,
  logo,
  zone: OFFICE_ZONE,
  views: OFFICE_VIEWS,
  experience: findExperience(key === 'sterlingtech' ? 'SterlingTech' : label),
});

export const STATIONS: StationDef[] = [
  {
    id: 'estate',
    kind: 'estate',
    label: 'The Estate',
    shortLabel: 'Estate',
    emoji: '🏠',
    x: -22,
    side: -1,
    width: 30,
    depth: 28,
    height: 8,
    color: '#ffb35c',
    zone: { x0: -3.6, x1: 3.6, z0: -11, z1: -3 },
  },
  office('localbuka', 'Localbuka', 25, -1, 12, '#ff8a3d', '/images/company/localbuka.png'),
  office('keepsafe', 'Keepsafe', 47, 1, 16, '#2ee6b6', '/images/company/keepsafe.png'),
  office('sterlingtech', 'SterlingTech', 70, -1, 18, '#3cb4ff', '/images/company/SterlinTech.png'),
  office('jopiter', 'Jopiter', 92, 1, 13, '#c38bff', '/images/company/jopiter.png'),
  office('tawol', 'TAWOL', 115, -1, 15, '#ffd23f', '/images/company/tawol.ico'),
  office('delbott', 'Delbott', 137, 1, 12, '#ff4d6d', '/images/company/delbotts.jpg'),
  {
    id: 'cinema',
    kind: 'cinema',
    label: 'Project Cinema',
    shortLabel: 'Cinema',
    emoji: '🎬',
    x: 178,
    side: -1,
    width: 28,
    depth: 22,
    height: 13,
    color: '#ff5fa2',
    zone: { x0: -6.6, x1: 0.6, z0: 2.2, z1: 7.6 },
    views: {
      approach: { pos: [-3, 2.4, 13], target: [-1.5, 4.6, -20.4] },
      inside: { pos: [-3, 4.4, -4.6], target: [0, 5.4, -20.5] },
      seat: { pos: [0, 3.55, -9.6], target: [0, 5.5, -20.6] },
    },
  },
  {
    id: 'callcenter',
    kind: 'callcenter',
    label: 'Call Center',
    shortLabel: 'Call Center',
    emoji: '📞',
    x: 186,
    side: 1,
    width: 18,
    depth: 10,
    height: 6,
    color: '#38f2ff',
    zone: { x0: -3.6, x1: 3.6, z0: 1.8, z1: 7.4 },
    views: {
      approach: { pos: [0, 3.2, 13], target: [0, 1.8, -3.5] },
      inside: { pos: [0.4, 2.2, 4.4], target: [0, 1.75, -3.6] },
    },
  },
];

export const STATION_MAP: Record<string, StationDef> = Object.fromEntries(
  STATIONS.map((s) => [s.id, s]),
);
export const OFFICE_STATIONS = STATIONS.filter((s) => s.kind === 'office');

/* -------------------------------------------------------------------------- */
/*  Local <-> world helpers                                                   */
/* -------------------------------------------------------------------------- */

/** +1 when local +Z maps to world +Z (north side), -1 otherwise. */
export const facing = (s: StationDef) => (s.side === -1 ? 1 : -1);
export const stationRotation = (s: StationDef) => (facing(s) === 1 ? 0 : Math.PI);
export const stationOrigin = (s: StationDef): [number, number, number] => [
  s.x,
  0,
  -facing(s) * WORLD.front,
];

export const toWorld = (
  s: StationDef,
  [lx, ly, lz]: readonly [number, number, number],
): [number, number, number] => {
  const f = facing(s);
  return [s.x + lx * f, ly, -f * WORLD.front + lz * f];
};

export const worldZone = (s: StationDef): Rect => {
  const a = toWorld(s, [s.zone.x0, 0, s.zone.z0]);
  const b = toWorld(s, [s.zone.x1, 0, s.zone.z1]);
  return {
    x0: Math.min(a[0], b[0]),
    x1: Math.max(a[0], b[0]),
    z0: Math.min(a[2], b[2]),
    z1: Math.max(a[2], b[2]),
  };
};

export const zoneCenter = (s: StationDef): [number, number] => {
  const r = worldZone(s);
  return [(r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2];
};

/** Precomputed world-space zones (stations never move). */
export const WORLD_ZONES = STATIONS.map((s) => ({ station: s, rect: worldZone(s) }));

/** Returns true if `x` falls within the frontage of any station on the given side. */
export const isStationFrontage = (x: number, side: 1 | -1, margin = 3) =>
  STATIONS.some((s) => {
    if (s.side !== side) return false;
    const r = worldZone(s);
    return x > r.x0 - margin && x < r.x1 + margin;
  });
