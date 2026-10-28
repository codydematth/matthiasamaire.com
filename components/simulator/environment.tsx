'use client';

import React, { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { WORLD, PALETTE, STATIONS } from './config';

type Shape = 'box' | 'tree';
interface Piece { position: [number, number, number]; scale: [number, number, number] }
interface Batch { color: string; shape: Shape; pieces: Piece[] }

/** One instanced draw per shape/material, including the distant neighbourhood. */
function SceneryBatch({ batch }: { batch: Batch }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const instance = mesh.current!;
    const transform = new THREE.Object3D();
    batch.pieces.forEach((piece, index) => {
      transform.position.set(...piece.position);
      transform.scale.set(...piece.scale);
      transform.updateMatrix();
      instance.setMatrixAt(index, transform.matrix);
    });
    instance.instanceMatrix.needsUpdate = true;
    instance.computeBoundingSphere();
  }, [batch]);
  return <instancedMesh ref={mesh} args={[undefined, undefined, batch.pieces.length]}>
    {batch.shape === 'tree' ? <icosahedronGeometry args={[1, 0]} /> : <boxGeometry args={[1, 1, 1]} />}
    <meshLambertMaterial color={batch.color} flatShading />
  </instancedMesh>;
}

export default function BoulevardEnvironment() {
  const roadLen = WORLD.roadEndX - WORLD.roadStartX + 60;
  const roadCenter = (WORLD.roadStartX + WORLD.roadEndX) / 2;
  const batches = useMemo(() => {
    const groups = new Map<string, Batch>();
    const add = (color: string, position: Piece['position'], scale: Piece['scale'], shape: Shape = 'box') => {
      const key = color + shape;
      const group = groups.get(key) ?? { color, shape, pieces: [] };
      group.pieces.push({ position, scale });
      groups.set(key, group);
    };
    // Keep the existing station entrances and driving corridor clear.
    for (let x = WORLD.roadStartX; x < WORLD.roadEndX + 20; x += 15) {
      add('#f4edce', [x, .035, 0], [5, .03, .18]);
      for (const side of [-1, 1] as const) {
        if (STATIONS.some(s => s.side === side && Math.abs(s.x - x) < s.width / 2 + 3)) continue;
        add('#866a48', [x, 1.6, side * 12], [.45, 3.2, .45]);
        add('#388453', [x, 4.8, side * 12], [2.4, 3.6, 2.4], 'tree');
        add('#3d7044', [x + 3, 3.3, side * 15], [1.5, 2.5, 1.5], 'tree');
      }
    }
    // Broad lawns, cream neighbourhood buildings and a blue waterfront.
    add(PALETTE.grass, [90, -1.1, 0], [650, 2, 420]);
    add('#55a9c0', [90, -.04, 67], [650, .05, 44]);
    add('#d2d5b9', [90, .05, 43.5], [650, .1, 3]);
    add('#d2d5b9', [90, .05, 90.5], [650, .1, 3]);
    // Footbridge stays outside the car's existing navigation bounds.
    add('#cdd2c1', [110, .6, 67], [5, 1.1, 48]);
    for (const x of [107.3, 112.7]) add('#f3efe0', [x, 1.5, 67], [.3, .35, 48]);
    for (let i = 0; i < 22; i++) {
      const x = -100 + i * 20;
      const z = i % 2 ? -58 : 108;
      const height = 7 + (i % 4) * 2;
      add('#d9d5bc', [x, height / 2, z], [12, height, 9]);
      add('#51626a', [x, height + .25, z], [12.5, .5, 9.5]);
      for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++)
        add('#597c88', [x - 4.2 + col * 2.8, 2 + row * 2.1, z + (z < 0 ? 4.53 : -4.53)], [1.4, 1.2, .08]);
      add('#866a48', [x + 8, 1.4, z], [.5, 2.8, .5]);
      add('#388453', [x + 8, 4, z], [2.2, 3, 2.2], 'tree');
    }
    return [...groups.values()];
  }, []);

  return <>
    <color attach="background" args={[PALETTE.skyTop]} />
    <fog attach="fog" args={[PALETTE.fog, 100, 280]} />
    <hemisphereLight args={['#f5fbff', '#8d9d72', 2]} />
    <directionalLight position={[-40, 65, 25]} intensity={2.2} color="#fff5dc" />
    <RigidBody type="fixed" friction={.9} restitution={.1} colliders={false}>
      <CuboidCollider args={[roadLen / 2, .5, WORLD.roadHalf]} position={[roadCenter, -.5, 0]} />
      <CuboidCollider args={[roadLen / 2, .5, 12]} position={[roadCenter, -.4, -WORLD.roadHalf - 12]} />
      <CuboidCollider args={[roadLen / 2, .5, 12]} position={[roadCenter, -.4, WORLD.roadHalf + 12]} />
    </RigidBody>
    <mesh position={[roadCenter, -.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[roadLen, WORLD.roadHalf * 2]} />
      <meshLambertMaterial color={PALETTE.asphalt} />
    </mesh>
    {[-1, 1].map(side => <group key={side}>
      <mesh position={[roadCenter, .06, side * (WORLD.roadHalf + 7)]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roadLen, 14]} /><meshLambertMaterial color={PALETTE.pavement} />
      </mesh>
      <mesh position={[roadCenter, .08, side * WORLD.roadHalf]}>
        <boxGeometry args={[roadLen, .18, .3]} /><meshLambertMaterial color="#e2e3d0" />
      </mesh>
    </group>)}
    {batches.map(batch => <SceneryBatch key={batch.color + batch.shape} batch={batch} />)}
  </>;
}
