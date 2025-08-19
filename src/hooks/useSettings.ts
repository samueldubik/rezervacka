import { Settings } from '@prisma/client';
import { useEffect, useState, useCallback } from 'react';

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    id: -1,
    reservationsEnabled: false,
  });

  // Define fetchSettings with useCallback so it's stable
  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/fetchSettings');
      const data = await res.json();
      if (res.ok) {
        setSettings(data);
      } else {
        console.error('Failed to fetch settings');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    reservationsEnabled: settings.reservationsEnabled,
    refetch: fetchSettings,
    settings, // optionally return the full settings object
  };
};
