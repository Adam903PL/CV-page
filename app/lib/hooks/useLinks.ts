import { create } from "zustand";
import { useEffect, useState } from "react";

interface LinksState {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useLinks = create<LinksState>((set) => ({
  activeSection: "", // Początkowa wartość jest pusta
  setActiveSection: (section) => set({ activeSection: section }),
}));

// Użycie hooka w komponencie (np. w App.js lub innym miejscu, gdzie będziesz inicjować)
export const useInitializeActiveSection = () => {
  const { setActiveSection } = useLinks();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ustawiamy początkową wartość activeSection po stronie klienta
    setIsClient(true);
    if (typeof window !== "undefined") {
      setActiveSection(window.location.hash);
    }
  }, [setActiveSection]);

  return isClient;
};
