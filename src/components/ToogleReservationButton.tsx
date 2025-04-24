import { useState } from 'react';

type ToggleReservationButtonProps = {
  reservationEnabled: boolean;
};

const ToggleReservationButton = ({ reservationEnabled }: ToggleReservationButtonProps) => {
  const [status, setStatus] = useState<'Enabled' | 'Disabled'>(
    reservationEnabled ? 'Enabled' : 'Disabled',
  );
  const [isLoading, setIsLoading] = useState(false);

  const toggleReservations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/toggle-reservations', {
        method: 'POST',
      });
      const result = await response.json();
      setStatus(result.newStatus ? 'Enabled' : 'Disabled');
    } catch (error) {
      console.error('Error toggling reservations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={toggleReservations} disabled={isLoading}>
      {isLoading ? 'Toggling...' : `Toggle Reservations`}
    </button>
  );
};

export default ToggleReservationButton;
