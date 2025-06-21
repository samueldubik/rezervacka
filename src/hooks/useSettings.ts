import { useEffect, useState } from 'react';

export const useSettings = () => {
  const [settings, setSettings] = useState<{ key: string; value: boolean }[]>([]);
  const [reservationEnabled, setReservationsEnabled] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/fetchSettings');
        const data = await res.json();
        if (res.ok) {
          const reservationsSetting = data.find((s: any) => s.key === 'reservations_enabled');
          setReservationsEnabled(reservationsSetting?.value || false);
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

  return { settings, reservationEnabled };
};
