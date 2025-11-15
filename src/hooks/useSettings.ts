import { useState, useEffect } from 'react';

interface Settings {
  soundEnabled: boolean;
  communicationEnabled: boolean;
}

const SETTINGS_KEY = 'app-settings';

const defaultSettings: Settings = {
  soundEnabled: true,
  communicationEnabled: true,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      try {
        return { ...defaultSettings, ...JSON.parse(stored) };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const toggleSound = () => {
    setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const toggleCommunication = () => {
    setSettings(prev => ({ ...prev, communicationEnabled: !prev.communicationEnabled }));
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return {
    settings,
    toggleSound,
    toggleCommunication,
    updateSettings,
  };
}
