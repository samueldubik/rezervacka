import { useGlobalContext } from '@/app/contexts/GlobalContext';
import { Modal } from '../Modal';
import React from 'react';

type ReservationSuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ReservationSuccessModal = ({ isOpen, onClose }: ReservationSuccessModalProps) => {
  const { students, selectedRoomName } = useGlobalContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative flex h-[60vh] flex-col overflow-y-auto p-4">
        <h2 className="text-center text-lg font-bold">Vaša rezervácia prebehla úspešne</h2>

        <div className="mt-4 flex flex-col items-start justify-center gap-2">
          <h3 className="mb-5">
            Rezervovaná izba: <span className="font-bold">{selectedRoomName}</span>
          </h3>
          {students.map((student, index) => (
            <div key={index}>
              <p className="font-bold">{student.name}</p>
              <p>{student.email}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
