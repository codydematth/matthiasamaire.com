'use client';
import { Html } from '@react-three/drei';
import { STATIONS, WORLD } from './config';
import { useSimStore } from './store';
import styles from './city.module.css';

export default function DestinationMarkers() {
  const cameraMode = useSimStore(s => s.cameraMode);
  const setAutopilot = useSimStore(s => s.setAutopilot);
  if (cameraMode === 'interior') return null;
  return <>{STATIONS.map(station => <Html key={station.id}
    position={[station.x, station.height + 2.5, station.side * (WORLD.front + station.depth / 2)]}
    center zIndexRange={[25, 0]}>
    <button className={styles.marker} aria-label={`Drive to ${station.label}`} onClick={() => setAutopilot(station.id)}>
      <span>{station.emoji}</span><small>{station.shortLabel}</small>
    </button>
  </Html>)}</>;
}
