'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ExperienceGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, Renderer
    const width = containerRef.current.clientWidth || 400;
    const height = containerRef.current.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Create the Dotted Globe Base
    const radius = 2.0;
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Even distribution on sphere
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const dotMaterial = new THREE.PointsMaterial({
      color: 0x4f46e5, // Indigo
      size: 0.04,
      transparent: true,
      opacity: 0.45,
    });

    const dottedGlobe = new THREE.Points(dotGeometry, dotMaterial);
    scene.add(dottedGlobe);

    // 3. Create wireframe rings for Latitude/Longitude structure (Tiny Planet feeling)
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroup.add(dottedGlobe);

    const ringCount = 5;
    for (let i = 0; i < ringCount; i++) {
      const ringGeo = new THREE.RingGeometry(radius, radius + 0.015, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.12,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = (Math.PI / ringCount) * i;
      ring.rotation.y = (Math.PI / ringCount) * i;
      globeGroup.add(ring);
    }

    // Helper: Map Lat/Lon to Spherical Cartesian coordinates
    const getCartesian = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(r * Math.sin(phi) * Math.sin(theta));
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.cos(theta);
      return new THREE.Vector3(x, y, z);
    };

    // 4. Coordinates Pins
    const locations = [
      { name: 'Nigeria', lat: 9.082, lon: 8.675, color: 0x10b981 }, // Emerald Green
      { name: 'United Kingdom', lat: 55.378, lon: -3.436, color: 0x3b82f6 }, // Blue
    ];

    const pinGroup = new THREE.Group();
    globeGroup.add(pinGroup);

    const pins: THREE.Mesh[] = [];
    locations.forEach((loc) => {
      const pos = getCartesian(loc.lat, loc.lon, radius);

      // Pin base sphere
      const pinGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: loc.color,
        transparent: true,
        opacity: 0.9,
      });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(pos);
      pinGroup.add(pin);
      pins.push(pin);

      // Pulse ring around the pin
      const pulseGeo = new THREE.RingGeometry(0.1, 0.15, 32);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: loc.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      pulse.position.copy(pos);
      pulse.lookAt(new THREE.Vector3(0, 0, 0)); // look at center to lay flat on surface
      pinGroup.add(pulse);
    });

    // 5. Connect Pin Nodes with an Arc
    const p1 = getCartesian(locations[0].lat, locations[0].lon, radius); // Nigeria
    const p2 = getCartesian(locations[1].lat, locations[1].lon, radius); // UK

    // Arc midpoint elevated to form a 3D arc
    const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    const distance = p1.distanceTo(p2);
    midPoint.normalize().multiplyScalar(radius + distance * 0.35); // elevate

    // Curve
    const curve = new THREE.CatmullRomCurve3([p1, midPoint, p2]);
    const curvePoints = curve.getPoints(50);
    const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const curveMat = new THREE.LineBasicMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.6,
      linewidth: 2,
    });
    const arcLine = new THREE.Line(curveGeo, curveMat);
    globeGroup.add(arcLine);

    // Dotted flowing light on the Arc
    const lightGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const flowingLight = new THREE.Mesh(lightGeo, lightMat);
    globeGroup.add(flowingLight);

    // 6. Interaction (Mouse reactivity & Motion Control)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let motionDisabled = typeof document !== 'undefined' ? document.documentElement.classList.contains('reduced-motion') : false;

    const handleMouseMove = (event: MouseEvent) => {
      if (motionDisabled) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / width - 0.5) * 2;
      mouseY = -(y / height - 0.5) * 2;
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

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

    // 7. Animation loop
    const clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slowly rotate the globe
      globeGroup.rotation.y = motionDisabled ? 0 : (elapsedTime * 0.15);
      globeGroup.rotation.z = motionDisabled ? 0 : (Math.sin(elapsedTime * 0.05) * 0.1);

      // Pulse pins scale
      pins.forEach((pin, index) => {
        const scaleVal = motionDisabled ? 1 : (1 + Math.sin(elapsedTime * 5 + index) * 0.15);
        pin.scale.set(scaleVal, scaleVal, scaleVal);
      });

      // Flowing light along the curve path
      const t = motionDisabled ? 0.5 : ((elapsedTime * 0.3) % 1.0);
      const lightPos = curve.getPointAt(t);
      flowingLight.position.copy(lightPos);

      // Mouse reactivity tilt
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      globeGroup.rotation.x = motionDisabled ? 0 : (targetY * 0.4);
      globeGroup.rotation.y += motionDisabled ? 0 : (targetX * 0.2);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Clean up
    return () => {
      cancelAnimationFrame(reqId);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.innerHTML = '';
      }
      window.removeEventListener('motion-toggle', handleMotionToggle);
      dotGeometry.dispose();
      dotMaterial.dispose();
      globeGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div ref={containerRef} className="w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px]" />
      
      {/* Dynamic Key Info below the Globe */}
      <div className="flex gap-6 mt-4 text-xs font-semibold">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Nigeria Operations</span>
        </div>
        <div className="flex items-center gap-1.5 text-blue-400">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
          <span>UK Integrations</span>
        </div>
      </div>
    </div>
  );
}
