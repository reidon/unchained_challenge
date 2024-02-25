import React, { ReactNode, createContext, useContext, useState } from "react";
import { Settings } from "../models/settings";

const defaultSettings: Settings = {
  boxWidth: 200,
  boxHeight: 300,
  paletteWidth: 800,
  paletteHeight: 1200,
};

const SettingsContext = createContext<{
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}>({
  settings: defaultSettings,
  setSettings: () => {},
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
