import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getSettings } from "./client";
import type { Settings } from "./types";

const SettingsContext = createContext<Settings | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    getSettings()
      .then(setSettings)
      .catch(() => setSettings(null));
  }, []);

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}

export function useSettings(): Settings | null {
  return useContext(SettingsContext);
}

export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+995${digits}`;
}
