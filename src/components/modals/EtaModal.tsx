import { useState } from 'react';
import { Modal } from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-date-picker';

type EtaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eta: Date) => void;
};

export const EtaModal: React.FC<EtaModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [eta, setEta] = useState<Date | null>(new Date());

  const handleSubmit = () => {
    if (eta) {
      onSubmit(eta);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <section className="flex h-[60vh] w-[60vw] flex-col items-center p-4">
        <h2 className="font-quicksand text-2xl font-bold">Predpokladaný termín ubytovania</h2>
        <h3 className="mt-2 px-16 text-center text-xl">
          Vyberte si prosím orientačný dátum, kedy by ste sa chceli prísť ubytovať. Dátum je
          nezáväzný, pomôže nám však s ubytovavánim. Ďakujeme
        </h3>

        <DatePicker
          value={eta}
          onChange={(date) => setEta(date as Date)}
          className="mt-4 rounded border p-2"
          locale="sk"
        />

        <button
          className="mt-5 flex items-center justify-center gap-2 border border-gray-500 bg-green-600 p-4 font-quicksand font-bold text-white"
          onClick={handleSubmit}
        >
          <FontAwesomeIcon icon={faCheck} />
          <h2 className="text-lg">Potvrdiť</h2>
        </button>
      </section>
    </Modal>
  );
};
