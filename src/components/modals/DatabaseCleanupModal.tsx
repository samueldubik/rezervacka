import { Modal } from '../Modal';
import React from 'react';

type DatabaseCleanupModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const DatabaseCleanupModal: React.FC<DatabaseCleanupModalProps> = ({
  isOpen,
  isLoading,
  onCancel,
  onConfirm,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onCancel}
    actions={
      <>
        <button
          className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 active:bg-gray-500"
          onClick={onCancel}
          type="button"
          disabled={isLoading}
        >
          Zrušiť
        </button>
        <button
          className="rounded bg-rose-600 px-4 py-2 text-white hover:bg-rose-700 active:bg-rose-800"
          onClick={onConfirm}
          type="button"
          disabled={isLoading}
        >
          Vyčistiť
        </button>
      </>
    }
    isLoading={isLoading}
    showCloseButton
    closeOnOverlayClick
    closeOnEsc
  >
    <section className="mb-5 flex flex-col items-start gap-4">
      <h1 className="font-quicksand text-2xl font-semibold">Vyčistiť databázu</h1>
      <p>Tento krok vymaže všetky dáta o rezerváciach. Chcete pokračovať?</p>
    </section>
  </Modal>
);
