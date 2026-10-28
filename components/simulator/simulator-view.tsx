'use client';
import React, { Component, Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Roadster from './car';
import BoulevardEnvironment from './environment';
import EstateStation from './stations/estate';
import ExperienceOffices from './stations/offices';
import ProjectCinema from './stations/cinema';
import CallCenterStation from './stations/call-center';
import CameraRig from './camera-rig';
import SimulatorHUD from './hud';
import DestinationMarkers from './destination-markers';
import StationDetails from './station-details';
import { useSimStore } from './store';
import { usePortfolioView } from '../portfolio-view-store';
import styles from './city.module.css';

function CityFallback() {
  const setViewMode = usePortfolioView(s => s.setViewMode);
  const router = useRouter();
  return <div className={styles.fallback}><span>🌴</span><h2>Your portfolio, another way.</h2>
    <p>The 3D city could not start on this device. You can still explore all of Matthias’s work.</p>
    <button onClick={() => { setViewMode('portfolio'); router.push('/'); }}>Open the portfolio</button>
  </div>;
}
class SceneBoundary extends Component<{children: React.ReactNode}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() { return {failed: true}; }
  render() { return this.state.failed ? <CityFallback /> : this.props.children; }
}
function SceneMetrics() {
  const { gl } = useThree();
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    elapsed.current += delta;
    if (elapsed.current < 1) return;
    elapsed.current = 0;
    gl.domElement.setAttribute('data-draw-calls', String(gl.info.render.calls));
    gl.domElement.setAttribute('data-triangles', String(gl.info.render.triangles));
    gl.domElement.setAttribute('data-geometries', String(gl.info.memory.geometries));
    gl.domElement.setAttribute('data-textures', String(gl.info.memory.textures));
  });
  return null;
}
export default function SimulatorView() {
  const quality = useSimStore(s => s.quality);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return <div className={styles.world}>
    <SceneBoundary>
      <Suspense fallback={<div className={styles.loading}><Loader2 className="animate-spin" /><h2>Welcome to Matthias’s City</h2><p>Getting your portfolio ready…</p></div>}>
        <Canvas dpr={quality === 'low' ? 1 : [1, 1.25]} frameloop={visible ? 'always' : 'never'}
          camera={{position: [-70, 5, 3.5], fov: 55, near: .1, far: 320}}
          gl={{antialias: false, powerPreference: 'default', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1, stencil: false}}
          fallback={<CityFallback />}>
          <Physics gravity={[0, -9.81, 0]} timeStep={1 / 60} paused={!visible}>
            <BoulevardEnvironment /><Roadster /><EstateStation /><ExperienceOffices />
            <ProjectCinema /><CallCenterStation /><CameraRig /><DestinationMarkers />
          </Physics>
          <SceneMetrics />
        </Canvas>
        <SimulatorHUD />
        <StationDetails />
      </Suspense>
    </SceneBoundary>
  </div>;
}
