'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 3. Geometry (Particles)
    const particlesCount = 800;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position inside a sphere/box
      positions[i] = (Math.random() - 0.5) * 12; // X
      positions[i + 1] = (Math.random() - 0.5) * 12; // Y
      positions[i + 2] = (Math.random() - 0.5) * 12; // Z

      // Subtle slate-blue to indigo tones
      colors[i] = 0.38; // R (Indigo accent matching)
      colors[i + 1] = 0.4; // G
      colors[i + 2] = 0.94; // B
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // 4. Material
    // Create a circular glowing canvas texture
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: createCircleTexture()
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 5. Interaction (Mouse Move & Scroll Velocity & Reduced Motion Control)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let motionDisabled = typeof document !== 'undefined' ? document.documentElement.classList.contains('reduced-motion') : false;

    const handleMouseMove = (event: MouseEvent) => {
      if (motionDisabled) return;
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleMotionToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      motionDisabled = customEvent.detail?.disabled ?? false;
      if (motionDisabled) {
        // Reset interactive targets immediately on pause
        mouseX = 0;
        mouseY = 0;
        targetX = 0;
        targetY = 0;
      }
    };
    window.addEventListener('motion-toggle', handleMotionToggle);

    // Scroll speed velocity tracker
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let scrollVelocity = 0;
    let targetScrollVelocity = 0;

    const handleScroll = () => {
      if (motionDisabled) return;
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY);
      targetScrollVelocity = diff * 0.1; // Scale factor for speed
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 6. Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    const clock = new THREE.Clock();

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll velocity damping & decay
      scrollVelocity += (targetScrollVelocity - scrollVelocity) * 0.1;
      targetScrollVelocity *= 0.92; // decay target speed

      // Update particle positions along Z axis (warp speed drift)
      const positionsAttr = geometry.attributes.position;
      const array = positionsAttr.array as Float32Array;
      
      const speedBase = 0.003;
      const speedWarp = scrollVelocity * 0.25;
      const currentSpeed = motionDisabled ? 0 : (speedBase + speedWarp);

      // Only update positions if we are actually moving
      if (currentSpeed > 0) {
        for (let i = 0; i < particlesCount * 3; i += 3) {
          // Move towards camera
          array[i + 2] += currentSpeed;

          // Reset particle to far back if it crosses past camera (z > 5.5)
          if (array[i + 2] > 5.5) {
            array[i + 2] = -6; // reset to back
            array[i] = (Math.random() - 0.5) * 12; // randomize new x entry
            array[i + 1] = (Math.random() - 0.5) * 12; // randomize new y entry
          }
        }
        positionsAttr.needsUpdate = true;
      }

      // Mouse reactivity (smooth interpolation)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Increase amplitude for stronger mouse following parallax movement
      camera.position.x = motionDisabled ? 0 : (targetX * 1.6);
      camera.position.y = motionDisabled ? 0 : (targetY * 1.6);

      // Slow orbital rotation combined with direct mouse tilt influence
      particles.rotation.y = motionDisabled ? 0 : (elapsedTime * 0.01 + targetX * 0.25);
      particles.rotation.x = motionDisabled ? 0 : (elapsedTime * 0.005 - targetY * 0.25);
      
      // Dynamic camera field of view warp zoom
      const baseFOV = 75;
      const targetFOV = motionDisabled ? baseFOV : (baseFOV + Math.min(scrollVelocity * 45, 40)); // max FOV 115
      camera.fov += (targetFOV - camera.fov) * 0.1;
      camera.updateProjectionMatrix();

      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('motion-toggle', handleMotionToggle);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
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
      className="fixed inset-0 z-[-2] pointer-events-none w-screen h-screen overflow-hidden bg-[#0B0F19]"
    />
  );
}
