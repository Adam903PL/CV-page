import { create } from "zustand";

interface LinksState {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useLinks = create<LinksState>((set) => ({
  activeSection: window.location.hash, // Początkowa wartość na podstawie URL
  setActiveSection: (section) => set({ activeSection: section }),
}));
