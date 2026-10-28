'use client';

import React from 'react';

/**
 * Lightweight, zero-WebGL profile accent ring.
 * Replaces the heavy Three.js Torus Knot WebGL scene with clean CSS animations.
 * Eliminates GPU memory leaks and CPU lag.
 */
export default function HeroMesh() {
  return (
    <div
      aria-hidden="true"
      className="absolute w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] flex items-center justify-center pointer-events-none select-none z-0"
    >
      <div className="absolute inset-0 rounded-full border border-indigo-500/20" />
      <div className="absolute inset-4 rounded-full border border-indigo-500/10 border-dashed animate-[spin_30s_linear_infinite]" />
    </div>
  );
}
