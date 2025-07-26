import { use, useEffect, useState } from 'react';
import { useGlobalContext } from '../../../GlobalContext';
import { useSettings } from '@/hooks/useSettings';

export const ReservationsToggle = () => {
  const { reservationsEnabled } = useSettings();
  const [isEnabled, setIsEnabled] = useState(reservationsEnabled);

  useEffect(() => {
    setIsEnabled(reservationsEnabled);
  }, [reservationsEnabled]);

  const handleToggle = async () => {
    const newEnabled = !isEnabled;
    setIsEnabled(newEnabled);
    await fetch('/api/admin/toggleReservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: newEnabled }),
    });
    // Optionally refetch settings here if your hook supports it
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative flex w-full flex-row ${isEnabled ? 'justify-end' : 'justify-start'} items-center gap-4 rounded-full bg-gray-50`}
    >
      <div
        className={`flex h-full w-[60%] cursor-pointer flex-col items-center justify-center rounded-full font-fira-sans font-bold text-white ${isEnabled ? 'bg-emerald-600' : 'bg-slate-800'}`}
      >
        {isEnabled ? '1' : '0'}
      </div>
    </button>
  );
};
