'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

interface ThreeDTiltProps {
  children: React.ReactNode;
  className?: string;
}

export default function ThreeDTilt({ children, className = '' }: ThreeDTiltProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for X and Y rotations
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Motion values for spotlight reflection position
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);
  const shineOpacity = useMotionValue(0);

  // Smooth springs to avoid jittery movements
  const springConfig = { damping: 20, stiffness: 150, mass: 0.6 };
  const rX = useSpring(rotateX, springConfig);
  const rY = useSpring(rotateY, springConfig);
  const sX = useSpring(shineX, springConfig);
  const sY = useSpring(shineY, springConfig);
  const sOpacity = useSpring(shineOpacity, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse positions relative to the center of the card
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Convert to rotation angles (max tilt ~12 degrees)
    const maxTilt = 12;
    const tiltX = -(y / (height / 2)) * maxTilt;
    const tiltY = (x / (width / 2)) * maxTilt;

    rotateX.set(tiltX);
    rotateY.set(tiltY);

    // Calculate light reflection positions (0% to 100%)
    const pctX = ((e.clientX - rect.left) / width) * 100;
    const pctY = ((e.clientY - rect.top) / height) * 100;

    shineX.set(pctX);
    shineY.set(pctY);
    shineOpacity.set(1); // Set base visibility
  };

  const handleMouseLeave = () => {
    // Return to default resting state
    rotateX.set(0);
    rotateY.set(0);
    shineOpacity.set(0); // Hide reflection
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: useMotionTemplate`perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg)`,
      }}
      className={`relative select-none ${className}`}
    >
      {/* Light spotlight overlay (reflection) */}
      <motion.div
        style={{
          background: useMotionTemplate`radial-gradient(circle 200px at ${sX}% ${sY}%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 80%)`,
          opacity: sOpacity,
        }}
        className="absolute inset-0 pointer-events-none rounded-[inherit] z-20 mix-blend-overlay transition-opacity duration-300"
      />
      {children}
    </motion.div>
  );
}
