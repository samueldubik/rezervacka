import { useFloorDataContext } from '@/app/contexts/FloorDataContext';
import { useGlobalContext } from '@/app/contexts/GlobalContext';

export const ReservationsToggle = () => {
  const { reservationsEnabled, refetchSettings } = useGlobalContext();
  const { refetch: refetchFloorData } = useFloorDataContext();

  const handleToggle = async () => {
    try {
      await fetch('/api/admin/toggleReservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !reservationsEnabled }),
      });

      await refetchSettings();
      await refetchFloorData();
    } catch (error) {
      console.error('Error toggling reservations:', error);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative flex w-full flex-row ${reservationsEnabled ? 'justify-end' : 'justify-start'} items-center gap-4 rounded-full bg-gray-50`}
    >
      <div
        className={`flex h-full w-[60%] cursor-pointer flex-col items-center justify-center rounded-full font-fira-sans font-bold text-white ${reservationsEnabled ? 'bg-emerald-600' : 'bg-slate-800'}`}
      >
        {reservationsEnabled ? '1' : '0'}
      </div>
    </button>
  );
};
