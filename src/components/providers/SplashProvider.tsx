"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import SplashScreen from "@/components/ui/SplashScreen";

interface SplashContextType {
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
  isChatbotOpen: boolean;
  setChatbotOpen: (open: boolean) => void;
}

const SplashContext = createContext<SplashContextType>({
  showSplash: true,
  setShowSplash: () => {},
  isChatbotOpen: false,
  setChatbotOpen: () => {},
});

export const useSplash = () => useContext(SplashContext);

export default function SplashProvider({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [isChatbotOpen, setChatbotOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const seen = sessionStorage.getItem("splash-seen");
    if (seen) {
      setShowSplash(false);
    }
  }, []);

  if (!mounted) return null;

  return (
    <SplashContext.Provider value={{ showSplash, setShowSplash, isChatbotOpen, setChatbotOpen }}>
      {showSplash && <SplashScreen />}
      {children}
    </SplashContext.Provider>
  );
}
