import { useState } from 'react';
import { Modal } from '../Modal';

type EtaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eta: Date) => void;
};

export const EtaModal: React.FC<EtaModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [eta, setEta] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (eta) {
      onSubmit(eta);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Predpokladaný termín ubytovania</h2>
      <p>Vyberte prosím predpokladaný termín ubytovania</p>
      <button onClick={handleSubmit}>Potvrdiť</button>
    </Modal>
  );
};
