'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSimStore } from '@/components/simulator/store';

const SimulatorView = dynamic(() => import('@/components/simulator/simulator-view'), {
  ssr: false,
});

export default function SimulatorPage() {
  const simulatorActive = useSimStore((s) => s.simulatorActive);
  const startSimulator = useSimStore((s) => s.start);

  useEffect(() => {
    startSimulator();
  }, [startSimulator]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0B0F19] text-white">
      {simulatorActive && <SimulatorView />}
    </div>
  );
}
