"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SplashContextType {
  isSplashDone: boolean;
  setSplashDone: (done: boolean) => void;
}

const SplashContext = createContext<SplashContextType>({
  isSplashDone: false,
  setSplashDone: () => {},
});

export const useSplash = () => useContext(SplashContext);

export default function SplashProvider({ children }: { children: ReactNode }) {
  const [isSplashDone, setSplashDone] = useState(false);

  return (
    <SplashContext.Provider value={{ isSplashDone, setSplashDone }}>
      {children}
    </SplashContext.Provider>
  );
}
