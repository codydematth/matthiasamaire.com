'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { carRuntime } from './runtime';
import { useSimStore } from './store';
import { STATION_MAP, toWorld } from './config';

/**
 * Dynamic Camera Rig
 * Handles butter-smooth third-person chase camera when driving,
 * and cinematic smooth transition to station interiors.
 */
export default function CameraRig() {
  const { camera } = useThree();
  const cameraMode = useSimStore((s) => s.cameraMode);
  const currentStation = useSimStore((s) => s.currentStation);
  const seated = useSimStore((s) => s.seated);
  const setInteriorReady = useSimStore((s) => s.setInteriorReady);

  const currentPos = useRef(new THREE.Vector3(carRuntime.position.x - 12, 6, carRuntime.position.z));
  const currentLookAt = useRef(new THREE.Vector3(carRuntime.position.x, 1, carRuntime.position.z));

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

    if (cameraMode === 'interior' && currentStation) {
      const station = STATION_MAP[currentStation];
      if (station && station.views) {
        // Pick appropriate view: seat view for cinema if seated, or inside view
        const targetView =
          seated && station.views.seat ? station.views.seat : station.views.inside;

        // Convert local station coordinates to world space
        const targetWorldPos = toWorld(station, targetView.pos);
        const targetWorldLookAt = toWorld(station, targetView.target);

        // Smooth camera damp into the interior perspective
        currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, targetWorldPos[0], 3.8, dt);
        currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, targetWorldPos[1], 3.8, dt);
        currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, targetWorldPos[2], 3.8, dt);

        currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetWorldLookAt[0], 4.2, dt);
        currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetWorldLookAt[1], 4.2, dt);
        currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetWorldLookAt[2], 4.2, dt);

        camera.position.copy(currentPos.current);
        camera.lookAt(currentLookAt.current);

        const distToTarget = currentPos.current.distanceTo(new THREE.Vector3(...targetWorldPos));
        if (distToTarget < 0.3) {
          setInteriorReady(true);
        }
        return;
      }
    }

    // ------------------------------------------------------------------------
    // THIRD-PERSON DRIVING CHASE CAMERA
    // ------------------------------------------------------------------------
    const carPos = carRuntime.position;
    const yaw = carRuntime.yaw;
    const speed = carRuntime.speed;

    // Follow distance expands slightly at higher speeds for exhilarating feel
    const baseDistance = 8.8;
    const speedDistOffset = (Math.abs(speed) / 24) * 2.2;
    const distance = baseDistance + speedDistOffset;
    const height = 3.6 + (Math.abs(speed) / 24) * 0.8;

    // Camera sits behind the vehicle
    const forwardX = Math.sin(yaw);
    const forwardZ = Math.cos(yaw);

    const desiredCamX = carPos.x - forwardX * distance;
    const desiredCamY = carPos.y + height;
    const desiredCamZ = carPos.z - forwardZ * distance;

    // Camera looks slightly ahead of the vehicle
    const lookAheadDist = 4.2;
    const desiredLookX = carPos.x + forwardX * lookAheadDist;
    const desiredLookY = carPos.y + 1.1;
    const desiredLookZ = carPos.z + forwardZ * lookAheadDist;

    // Smooth camera position damping
    const camLerpSpeed = 10.5;
    currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, desiredCamX, camLerpSpeed, dt);
    currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, desiredCamY, camLerpSpeed, dt);
    currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, desiredCamZ, camLerpSpeed, dt);

    // Smooth camera lookAt damping
    const lookLerpSpeed = 12.0;
    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, desiredLookX, lookLerpSpeed, dt);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, desiredLookY, lookLerpSpeed, dt);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, desiredLookZ, lookLerpSpeed, dt);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
