'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RigidBody, RapierRigidBody, CuboidCollider } from '@react-three/rapier';
import { carRuntime, input } from './runtime';
import { useSimStore } from './store';
import { autopilotControl } from './autopilot';
import { WORLD } from './config';
import { soundEngine } from './sound-engine';

/**
 * Driveable Low-Poly Sports Roadster
 * Matches the reference image: Sleek blue convertible sports roadster,
 * aerodynamic angular body, hood vent, dual glowing headlights,
 * rear brake light bar, interior seats, and steering wheels.
 */
export default function Roadster() {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const carGroupRef = useRef<THREE.Group>(null);
  const frontLeftWheelRef = useRef<THREE.Group>(null);
  const frontRightWheelRef = useRef<THREE.Group>(null);
  const rearLeftWheelRef = useRef<THREE.Group>(null);
  const rearRightWheelRef = useRef<THREE.Group>(null);
  const wheelSpinAngle = useRef(0);

  const cameraMode = useSimStore((s) => s.cameraMode);
  const autopilotTarget = useSimStore((s) => s.autopilotTarget);
  const setCarSnapshot = useSimStore((s) => s.setCarSnapshot);

  // Materials cached with specific colors for low-poly dusk aesthetic
  const materials = useMemo(() => {
    return {
      bodyBlue: new THREE.MeshStandardMaterial({
        color: '#2563eb', // Vibrant cobalt blue matching reference
        roughness: 0.35,
        metalness: 0.25,
        flatShading: true,
      }),
      bodyDark: new THREE.MeshStandardMaterial({
        color: '#1e293b',
        roughness: 0.6,
        metalness: 0.2,
        flatShading: true,
      }),
      windshield: new THREE.MeshStandardMaterial({
        color: '#38bdf8',
        roughness: 0.1,
        metalness: 0.8,
        transparent: true,
        opacity: 0.65,
      }),
      interiorLeather: new THREE.MeshStandardMaterial({
        color: '#18181b',
        roughness: 0.85,
        flatShading: true,
      }),
      wheelRubber: new THREE.MeshStandardMaterial({
        color: '#1c1917',
        roughness: 0.9,
        flatShading: true,
      }),
      wheelRim: new THREE.MeshStandardMaterial({
        color: '#e2e8f0',
        metalness: 0.85,
        roughness: 0.2,
        flatShading: true,
      }),
      headlights: new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: '#e0f2fe',
        emissiveIntensity: 2.5,
      }),
      taillights: new THREE.MeshStandardMaterial({
        color: '#ef4444',
        emissive: '#dc2626',
        emissiveIntensity: 2.2,
      }),
      driverShirt: new THREE.MeshStandardMaterial({
        color: '#3b82f6',
        roughness: 0.7,
        flatShading: true,
      }),
      driverSkin: new THREE.MeshStandardMaterial({
        color: '#8d5524',
        roughness: 0.7,
        flatShading: true,
      }),
    };
  }, []);

  // Initialise sound engine once (requires a prior user gesture — the
  // simulator is only mounted after the user clicks "Start driving").
  // init() is async (fetches the WAV sample) but we don't need to await it;
  // update() gracefully no-ops until the buffer is ready.
  useEffect(() => {
    void soundEngine.init();
    return () => soundEngine.dispose();
  }, []);

  // Frame counter for throttled store updates (~8Hz)
  const syncTimer = useRef(0);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const rb = rigidBodyRef.current;
    if (!rb) return;

    // Handle teleport if requested
    if (carRuntime.teleport) {
      const tp = carRuntime.teleport;
      carRuntime.teleport = null;
      rb.setTranslation({ x: tp.x, y: 0.45, z: tp.z }, true);
      const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), tp.yaw);
      rb.setRotation(q, true);
      rb.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rb.setAngvel({ x: 0, y: 0, z: 0 }, true);
      carRuntime.position.set(tp.x, 0.45, tp.z);
      carRuntime.yaw = tp.yaw;
      carRuntime.speed = 0;
      return;
    }

    // Determine controls: Auto-pilot or Manual Keyboard/Touch
    let throttle = 0;
    let steerInput = 0;
    let isBraking = false;

    if (autopilotTarget) {
      const apCtrl = autopilotControl(autopilotTarget, dt, carRuntime.speed);
      throttle = apCtrl.throttle;
      steerInput = apCtrl.steer;
      isBraking = apCtrl.brake;
    } else if (cameraMode === 'driving') {
      if (input.forward) throttle += 1;
      if (input.backward) throttle -= 0.6;
      if (input.left) steerInput += 1;
      if (input.right) steerInput -= 1;
      isBraking = input.brake;
    }

    // Vehicle physics constants - tuned for responsive arcade feel
    const ACCEL = 34;
    const REVERSE_ACCEL = 18;
    const MAX_FORWARD_SPEED = 34;
    const MAX_REVERSE_SPEED = 12;
    const BRAKE_DECEL = 38;
    const NATURAL_DRAG = 2.2;
    const STEER_SPEED = 7.5;

    // Current speed calculation
    let currentSpeed = cameraMode === 'interior' && !autopilotTarget ? 0 : carRuntime.speed;

    if (isBraking) {
      if (currentSpeed > 0) currentSpeed = Math.max(0, currentSpeed - BRAKE_DECEL * dt);
      else if (currentSpeed < 0) currentSpeed = Math.min(0, currentSpeed + BRAKE_DECEL * dt);
    } else if (throttle > 0) {
      currentSpeed = Math.min(MAX_FORWARD_SPEED, currentSpeed + ACCEL * dt * throttle);
    } else if (throttle < 0) {
      currentSpeed = Math.max(-MAX_REVERSE_SPEED, currentSpeed + REVERSE_ACCEL * dt * throttle);
    } else {
      // Coasting friction
      if (currentSpeed > 0) currentSpeed = Math.max(0, currentSpeed - NATURAL_DRAG * dt);
      else if (currentSpeed < 0) currentSpeed = Math.min(0, currentSpeed + NATURAL_DRAG * dt);
    }

    // Steering calculation (speed-dependent turning rate + responsive low-speed turning)
    const targetSteer = steerInput * 0.65;
    carRuntime.steer = THREE.MathUtils.lerp(carRuntime.steer, targetSteer, STEER_SPEED * dt);

    if (Math.abs(currentSpeed) > 0.05 || Math.abs(throttle) > 0) {
      const turnMultiplier = currentSpeed >= 0 ? 1 : -1;
      const turnRate = carRuntime.steer * 2.8 * turnMultiplier * (Math.abs(currentSpeed) / 10 + 0.35);
      carRuntime.yaw += turnRate * dt;
    }

    carRuntime.speed = currentSpeed;

    // Forward vector in world coordinates
    const forwardX = Math.sin(carRuntime.yaw);
    const forwardZ = Math.cos(carRuntime.yaw);

    const vx = forwardX * currentSpeed;
    const vz = forwardZ * currentSpeed;

    // Apply linear and angular velocity to Rapier rigid body
    rb.setLinvel({ x: vx, y: 0, z: vz }, true);

    const targetQuat = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      carRuntime.yaw
    );
    rb.setRotation(targetQuat, true);

    // Read back world position
    const trans = rb.translation();

    // Soft clamp within world road bounds to prevent falling off the world
    let clampedX = trans.x;
    let clampedZ = trans.z;
    let hitBoundary = false;
    if (clampedX < WORLD.boundsMinX) { clampedX = WORLD.boundsMinX; currentSpeed *= 0.5; hitBoundary = true; }
    if (clampedX > WORLD.boundsMaxX) { clampedX = WORLD.boundsMaxX; currentSpeed *= 0.5; hitBoundary = true; }
    if (Math.abs(clampedZ) > WORLD.boundsZ) {
      clampedZ = Math.sign(clampedZ) * WORLD.boundsZ;
      currentSpeed *= 0.5;
      hitBoundary = true;
    }

    if (hitBoundary) soundEngine.playTick();

    if (clampedX !== trans.x || clampedZ !== trans.z) {
      rb.setTranslation({ x: clampedX, y: 0.45, z: clampedZ }, true);
    }

    carRuntime.position.set(clampedX, 0.45, clampedZ);

    // Update driving audio every frame
    soundEngine.update(Math.abs(currentSpeed) * 3.6);

    // Animate wheels spin and steer angle
    const wheelRadius = 0.35;
    wheelSpinAngle.current += (currentSpeed * dt) / wheelRadius;

    if (frontLeftWheelRef.current && frontRightWheelRef.current) {
      frontLeftWheelRef.current.rotation.y = carRuntime.steer;
      frontRightWheelRef.current.rotation.y = carRuntime.steer;
      frontLeftWheelRef.current.rotation.x = wheelSpinAngle.current;
      frontRightWheelRef.current.rotation.x = wheelSpinAngle.current;
    }
    if (rearLeftWheelRef.current && rearRightWheelRef.current) {
      rearLeftWheelRef.current.rotation.x = wheelSpinAngle.current;
      rearRightWheelRef.current.rotation.x = wheelSpinAngle.current;
    }

    // Sync car group transform
    if (carGroupRef.current) {
      carGroupRef.current.position.set(clampedX, 0.45, clampedZ);
      carGroupRef.current.rotation.y = carRuntime.yaw;
    }

    // Throttled store snapshot for HUD (~8Hz)
    syncTimer.current += dt;
    if (syncTimer.current > 0.12) {
      syncTimer.current = 0;
      setCarSnapshot(clampedX, clampedZ, carRuntime.yaw, Math.round(Math.abs(currentSpeed) * 3.6));
    }
  });

  return (
    <>
      {/* Dynamic Rapier Rigid Body for vehicle physics & collision detection */}
      <RigidBody
        ref={rigidBodyRef}
        position={[WORLD.start.x, 0.45, WORLD.start.z]}
        type="kinematicVelocity"
        colliders={false}
        enabledRotations={[false, true, false]}
        linearDamping={0.5}
        angularDamping={0.8}
      >
        <CuboidCollider args={[0.95, 0.45, 1.95]} />
      </RigidBody>

      {/* Visual Mesh Hierarchy of the Blue Sports Roadster */}
      <group ref={carGroupRef} position={[WORLD.start.x, 0.45, WORLD.start.z]} rotation={[0, WORLD.start.yaw, 0]}>
        {/* Main Lower Chassis / Front Bumper */}
        <mesh position={[0, -0.05, 0]} material={materials.bodyBlue} castShadow>
          <boxGeometry args={[1.75, 0.42, 3.8]} />
        </mesh>

        {/* Front Hood Slope & Scoop */}
        <mesh position={[0, 0.22, 0.85]} rotation={[-0.08, 0, 0]} material={materials.bodyBlue} castShadow>
          <boxGeometry args={[1.65, 0.22, 1.5]} />
        </mesh>
        {/* Hood Intake Vent / Scoop */}
        <mesh position={[0, 0.35, 0.7]} material={materials.bodyDark}>
          <boxGeometry args={[0.6, 0.08, 0.4]} />
        </mesh>

        {/* Front Splitter / Dark Under-valence */}
        <mesh position={[0, -0.18, 1.88]} material={materials.bodyDark}>
          <boxGeometry args={[1.72, 0.12, 0.25]} />
        </mesh>

        {/* Rear Deck / Trunk Lid */}
        <mesh position={[0, 0.22, -1.05]} rotation={[0.04, 0, 0]} material={materials.bodyBlue} castShadow>
          <boxGeometry args={[1.65, 0.24, 1.3]} />
        </mesh>

        {/* Side Fenders / Aero sculpted flanks */}
        <mesh position={[-0.85, 0.08, 0]} material={materials.bodyBlue}>
          <boxGeometry args={[0.15, 0.35, 3.4]} />
        </mesh>
        <mesh position={[0.85, 0.08, 0]} material={materials.bodyBlue}>
          <boxGeometry args={[0.15, 0.35, 3.4]} />
        </mesh>

        {/* Cockpit Cutout / Interior Basin */}
        <mesh position={[0, 0.05, -0.1]} material={materials.interiorLeather}>
          <boxGeometry args={[1.4, 0.32, 1.2]} />
        </mesh>

        {/* Sport Seats (Driver and Passenger) */}
        <mesh position={[-0.35, 0.32, -0.28]} material={materials.interiorLeather}>
          <boxGeometry args={[0.48, 0.45, 0.4]} />
        </mesh>
        <mesh position={[0.35, 0.32, -0.28]} material={materials.interiorLeather}>
          <boxGeometry args={[0.48, 0.45, 0.4]} />
        </mesh>

        {/* Driver Avatar (Developer Matthias in driver seat) */}
        <group position={[-0.35, 0.38, -0.25]}>
          {/* Torso */}
          <mesh position={[0, 0.16, 0]} material={materials.driverShirt}>
            <boxGeometry args={[0.34, 0.34, 0.24]} />
          </mesh>
          {/* Head */}
          <mesh position={[0, 0.42, 0]} material={materials.driverSkin}>
            <boxGeometry args={[0.22, 0.22, 0.22]} />
          </mesh>
        </group>

        {/* Steering Wheel */}
        <mesh position={[-0.35, 0.34, 0.22]} rotation={[0.45, 0, 0]} material={materials.bodyDark}>
          <cylinderGeometry args={[0.16, 0.16, 0.04, 12]} />
        </mesh>

        {/* Sleek Raked Windshield Frame */}
        <mesh position={[0, 0.38, 0.28]} rotation={[-0.42, 0, 0]} material={materials.windshield}>
          <boxGeometry args={[1.5, 0.4, 0.05]} />
        </mesh>
        {/* Windshield Pillar Bevels */}
        <mesh position={[-0.72, 0.38, 0.28]} rotation={[-0.42, 0, 0]} material={materials.bodyDark}>
          <boxGeometry args={[0.06, 0.44, 0.08]} />
        </mesh>
        <mesh position={[0.72, 0.38, 0.28]} rotation={[-0.42, 0, 0]} material={materials.bodyDark}>
          <boxGeometry args={[0.06, 0.44, 0.08]} />
        </mesh>

        {/* Dual Angled Headlights */}
        <mesh position={[-0.62, 0.08, 1.86]} rotation={[0, -0.15, 0]} material={materials.headlights}>
          <boxGeometry args={[0.36, 0.14, 0.12]} />
        </mesh>
        <mesh position={[0.62, 0.08, 1.86]} rotation={[0, 0.15, 0]} material={materials.headlights}>
          <boxGeometry args={[0.36, 0.14, 0.12]} />
        </mesh>

        {/* Headlight Forward Spotlight Cones (Sunset Night Drive feel) */}
        
        

        {/* Rear Tail Light Strip */}
        <mesh position={[0, 0.14, -1.86]} material={materials.taillights}>
          <boxGeometry args={[1.6, 0.1, 0.1]} />
        </mesh>
        {/* Rear Diffuser */}
        <mesh position={[0, -0.16, -1.86]} material={materials.bodyDark}>
          <boxGeometry args={[1.5, 0.14, 0.18]} />
        </mesh>

        {/* 4 Low-Poly Wheels with 5-Spoke Rims */}
        {/* Front-Left */}
        <group position={[-0.9, -0.12, 1.15]} ref={frontLeftWheelRef}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.wheelRubber} castShadow>
            <cylinderGeometry args={[0.34, 0.34, 0.26, 14]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.wheelRim}>
            <cylinderGeometry args={[0.22, 0.22, 0.28, 5]} />
          </mesh>
        </group>

        {/* Front-Right */}
        <group position={[0.9, -0.12, 1.15]} ref={frontRightWheelRef}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.wheelRubber} castShadow>
            <cylinderGeometry args={[0.34, 0.34, 0.26, 14]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.wheelRim}>
            <cylinderGeometry args={[0.22, 0.22, 0.28, 5]} />
          </mesh>
        </group>

        {/* Rear-Left */}
        <group position={[-0.9, -0.12, -1.15]} ref={rearLeftWheelRef}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.wheelRubber} castShadow>
            <cylinderGeometry args={[0.36, 0.36, 0.3, 14]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.wheelRim}>
            <cylinderGeometry args={[0.24, 0.24, 0.32, 5]} />
          </mesh>
        </group>

        {/* Rear-Right */}
        <group position={[0.9, -0.12, -1.15]} ref={rearRightWheelRef}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.wheelRubber} castShadow>
            <cylinderGeometry args={[0.36, 0.36, 0.3, 14]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.wheelRim}>
            <cylinderGeometry args={[0.24, 0.24, 0.32, 5]} />
          </mesh>
        </group>
      </group>
    </>
  );
}
