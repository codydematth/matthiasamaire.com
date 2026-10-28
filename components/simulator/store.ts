'use client';

import { create } from 'zustand';
import { carRuntime } from './runtime';

export type CameraMode = 'driving' | 'interior';
export type Quality = 'high' | 'low';

export interface SimulatorState {
  /** Whether the 3D world is mounted. Nothing heavy is allocated until this is true. */
  simulatorActive: boolean;
  /** Station the player is currently "inside" (office, cinema, call center, estate yard). */
  currentStation: string | null;
  cameraMode: CameraMode;

  /** Throttled (~8Hz) snapshot of the car for HUD widgets — the per-frame truth lives in `carRuntime`. */
  carPosition: [number, number];
  carHeading: number;
  speedKmh: number;

  /** Station id the auto-pilot is currently driving toward. */
  autopilotTarget: string | null;
  /** Closest station whose entry pad is within hint range. */
  nearbyStation: string | null;

  /** True once the camera finished flying into an interior. */
  interiorReady: boolean;
  /** Cinema: visitor sat down and can pick projects. */
  seated: boolean;
  selectedProjectId: string | null;
  /** Call center contact terminal modal. */
  contactOpen: boolean;

  sceneReady: boolean;
  quality: Quality;
  showHelp: boolean;

  start: () => void;
  stop: () => void;
  enterStation: (id: string, mode: CameraMode) => void;
  exitStation: () => void;
  setAutopilot: (id: string | null) => void;
  setNearby: (id: string | null) => void;
  setInteriorReady: (ready: boolean) => void;
  setSeated: (seated: boolean) => void;
  selectProject: (id: string | null) => void;
  setContactOpen: (open: boolean) => void;
  setSceneReady: (ready: boolean) => void;
  setQuality: (quality: Quality) => void;
  setShowHelp: (show: boolean) => void;
  setCarSnapshot: (x: number, z: number, heading: number, speedKmh: number) => void;
}

const initialSession = {
  currentStation: null,
  cameraMode: 'driving' as CameraMode,
  autopilotTarget: null,
  nearbyStation: null,
  interiorReady: false,
  seated: false,
  selectedProjectId: null,
  contactOpen: false,
  sceneReady: false,
};

export const useSimStore = create<SimulatorState>()((set) => ({
  simulatorActive: false,
  carPosition: [0, 0],
  carHeading: 0,
  speedKmh: 0,
  quality: 'high',
  showHelp: true,
  ...initialSession,

  start: () => set({ simulatorActive: true, ...initialSession }),
  stop: () => set({ simulatorActive: false, ...initialSession }),

  enterStation: (id, mode) =>
    set({
      currentStation: id,
      cameraMode: mode,
      autopilotTarget: null,
      interiorReady: false,
      seated: false,
      selectedProjectId: null,
    }),
  exitStation: () =>
    set((state) => {
      carRuntime.disarmedStation = state.currentStation;
      return {
      currentStation: null,
      cameraMode: 'driving',
      interiorReady: false,
      seated: false,
      selectedProjectId: null,
      contactOpen: false,
      };
    }),

  setAutopilot: (id) => set({ autopilotTarget: id, showHelp: false }),
  setNearby: (id) => set((s) => (s.nearbyStation === id ? s : { nearbyStation: id })),
  setInteriorReady: (ready) => set({ interiorReady: ready }),
  setSeated: (seated) => set({ seated }),
  selectProject: (id) => set({ selectedProjectId: id }),
  setContactOpen: (open) => set({ contactOpen: open }),
  setSceneReady: (ready) => set({ sceneReady: ready }),
  setQuality: (quality) => set({ quality }),
  setShowHelp: (show) => set({ showHelp: show }),
  setCarSnapshot: (x, z, heading, speedKmh) =>
    set({ carPosition: [x, z], carHeading: heading, speedKmh }),
}));
