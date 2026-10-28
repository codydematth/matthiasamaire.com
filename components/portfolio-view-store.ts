import { create } from 'zustand';

export type PortfolioViewMode = 'game' | 'portfolio';

interface PortfolioViewState {
  viewMode: PortfolioViewMode;
  setViewMode: (mode: PortfolioViewMode) => void;
}

/**
 * Global store controlling whether the user is playing the 2D Simulator Game
 * or browsing the text content portfolio.
 * Default is 'game' (2D simulator) per user requirement.
 */
export const usePortfolioView = create<PortfolioViewState>((set) => ({
  viewMode: 'game',
  setViewMode: (mode) => set({ viewMode: mode }),
}));
