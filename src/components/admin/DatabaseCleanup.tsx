import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Modal } from '../Modal';
import { DatabaseCleanupModal } from '../modals/DatabaseCleanupModal';

export const DatabaseCleanup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCleanup = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/resetReservation', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to reset reservations');
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error resetting reservations:', error);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        className="flex flex-row items-center justify-center gap-2 rounded-md border-2 border-stone-900 bg-rose-600 px-4 py-2 font-fira-sans text-xl font-bold text-slate-200 shadow-md hover:bg-rose-500 active:bg-rose-800"
        onClick={() => setIsModalOpen(true)}
        type="button"
      >
        <FontAwesomeIcon icon={faXmark} />
        <h2>Vyčistiť databázu</h2>
      </button>
      <DatabaseCleanupModal
        isOpen={isModalOpen}
        isLoading={isLoading}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleCleanup}
      />
    </>
  );
};
