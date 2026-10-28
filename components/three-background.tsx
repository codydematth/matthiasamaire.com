'use client';

import React from 'react';

/**
 * Lightweight, zero-WebGL ambient background.
 * Replaces the heavy Three.js particle system with pure CSS subtle grid pattern.
 * Consumes 0 MB of GPU RAM and 0% CPU to guarantee blazing performance.
 */
export default function ThreeBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[-2] pointer-events-none w-screen h-screen overflow-hidden bg-[#0B0F19]"
    >
      {/* Subtle architectural tech grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
}
