'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroMesh() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5.5;

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(380, 380);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 3. Geometry (Complex Torus Knot for light catching)
    const geometry = new THREE.TorusKnotGeometry(1.1, 0.34, 180, 18);

    // 4. Glass Material Setup (using MeshPhysicalMaterial for refraction & reflection)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x818cf8, // Indigo base tint
      transparent: true,
      opacity: 0.85,
      roughness: 0.12,
      metalness: 0.08,
      transmission: 0.95, // High glass transmission
      thickness: 1.5,     // Glass thickness for refraction
      ior: 1.52,          // Index of refraction of glass
      clearcoat: 1.0,     // Extra high gloss coating
      clearcoatRoughness: 0.05,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Main key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(4, 5, 3);
    scene.add(keyLight);

    // Dynamic color accents (indigo & emerald)
    const indigoLight = new THREE.PointLight(0x6366f1, 5, 20);
    indigoLight.position.set(-3, -3, 2);
    scene.add(indigoLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 4, 20);
    emeraldLight.position.set(3, -3, 2);
    scene.add(emeraldLight);

    // Mouse movement point light (reflective highlight)
    const cursorLight = new THREE.PointLight(0xffffff, 3, 15);
    cursorLight.position.set(0, 0, 3);
    scene.add(cursorLight);

    // 6. Interaction (Mouse tracking)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize between -1 and 1
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation loop
    const clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle continuous rotation
      mesh.rotation.y = elapsedTime * 0.12;
      mesh.rotation.x = elapsedTime * 0.06;

      // Mouse interactive tilt (dampened)
      targetX += (mouseX - targetX) * 0.08;
      targetY += (mouseY - targetY) * 0.08;

      mesh.position.x = targetX * 0.3;
      mesh.position.y = targetY * 0.3;
      
      // Rotate mesh slightly towards cursor
      mesh.rotation.z = targetX * 0.4;

      // Move key point light following cursor to create sliding glass highlight reflection
      cursorLight.position.x = targetX * 3.5;
      cursorLight.position.y = targetY * 3.5;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(reqId);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute w-[380px] h-[380px] flex items-center justify-center pointer-events-none select-none z-0 opacity-70 filter blur-[0.5px]"
    />
  );
}
