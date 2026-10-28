'use client';

import * as THREE from 'three';
import { WORLD } from './config';

/**
 * Mutable, per-frame game state. Kept outside React/Zustand on purpose so the
 * 60fps loop never triggers React renders or allocations.
 */
export const carRuntime = {
  position: new THREE.Vector3(WORLD.start.x, 0, WORLD.start.z),
  yaw: WORLD.start.yaw as number,
  speed: 0,
  steer: 0,
  /** Set by gameplay code to teleport the car on the next physics tick. */
  teleport: null as null | { x: number; z: number; yaw: number },
  /** Station whose zone must be left before it can trigger again. */
  disarmedStation: null as string | null,
};

export const resetCarRuntime = () => {
  carRuntime.position.set(WORLD.start.x, 0, WORLD.start.z);
  carRuntime.yaw = WORLD.start.yaw;
  carRuntime.speed = 0;
  carRuntime.steer = 0;
  carRuntime.teleport = { ...WORLD.start };
  carRuntime.disarmedStation = null;
};

/** Driver input flags (keyboard + touch write here, the car reads here). */
export const input = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  brake: false,
};

export type InputKey = keyof typeof input;

export const clearInput = () => {
  input.forward = input.backward = input.left = input.right = input.brake = false;
};

export const anyDriveInput = () =>
  input.forward || input.backward || input.left || input.right;
