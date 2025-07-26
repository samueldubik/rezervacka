import { Settings } from '@prisma/client';
import { useEffect, useState } from 'react';

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    id: -1,
    reservationsEnabled: false,
  });

  useEffect(() => {
    const fetchSettings = async () => {
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
    };

    fetchSettings();
  }, []);

  return settings;
};
