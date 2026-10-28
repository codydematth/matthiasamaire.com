'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import FloatingNav from '@/components/floating-nav';
import ThreeBackground from '@/components/three-background';
import CursorGlow from '@/components/cursor-glow';
import Footer from '@/components/footer';
import { usePortfolioView } from '@/components/portfolio-view-store';

/**
 * Layout shell for the portfolio.
 * When playing the 2D simulator (default on root `/` or `/simulator`),
 * external navigation chrome and footers are suppressed so the game has
 * a clean, responsive viewport with its dedicated in-game HUD.
 */
export default function PortfolioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { viewMode } = usePortfolioView();

  const isGameActive = pathname === '/simulator' || (pathname === '/' && viewMode === 'game');

  if (isGameActive) {
    return (
      <main className="w-full h-full min-h-screen overflow-hidden flex flex-col bg-[#080B13]">
        {children}
      </main>
    );
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[99] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <FloatingNav />
      <ThreeBackground />
      <CursorGlow />
      <main id="main-content" className="flex-1 flex flex-col pt-0">
        {children}
      </main>
      <Footer />
    </>
  );
}
