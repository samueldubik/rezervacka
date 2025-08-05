import { useEffect } from 'react';
import { Modal } from '../Modal';
import { useFaq } from '../../hooks/useFaq';

type FaqModalProps = {
  isOpen: boolean;
  isAdmin: boolean;
  onClose: () => void;
};

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, isAdmin, onClose }) => {
  const { faq, loading, error } = useFaq();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      children={
        <div className="h-[60vh] w-[80vw] overflow-y-auto p-4">
          <h2 className="font-quicksand text-xl font-bold">Často kladené otázky</h2>
          <p className="mt-2 font-quicksand text-gray-700">
            To môžete nájsť odpovede na niektoré otázky o rezervačnom portály
          </p>
        </div>
      }
    />
  );
};
