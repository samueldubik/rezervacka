import { Modal } from '../Modal';
import { useFaq } from '../../hooks/useFaq';
import { FaqItem } from '../FaqItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

type FaqModalProps = {
  isOpen: boolean;
  isAdmin: boolean;
  onClose: () => void;
};

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, isAdmin, onClose }) => {
  const { faq, fetchFaq } = useFaq();
  const [adding, setAdding] = useState(false);

  const handleAddSubmit = async (data: { question: string; answer: string }) => {
    try {
      const response = await fetch('/api/faq/addQuestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to add FAQ');
      await fetchFaq();
      setAdding(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative h-[60vh] w-[80vw] overflow-y-auto overflow-x-hidden p-4">
        <h2 className="font-quicksand text-xl font-bold">Často kladené otázky</h2>
        <p className="mt-2 font-quicksand text-gray-700">
          To môžete nájsť odpovede na niektoré otázky o rezervačnom portály
        </p>
        <section className="relative mt-4 flex flex-col items-start gap-6">
          {faq.map((item) => (
            <FaqItem
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
              isAdmin={isAdmin}
              fetchFaq={fetchFaq}
            />
          ))}
          {isAdmin && !adding && (
            <button
              onClick={() => setAdding(true)}
              className="mt-4 flex flex-row items-center justify-center gap-2 rounded bg-green-500 p-2 font-quicksand font-semibold text-white hover:bg-green-700"
            >
              <FontAwesomeIcon icon={faPlus} />
              <h3>Pridať otázku</h3>
            </button>
          )}
          {isAdmin && adding && (
            <FaqItem
              id={-1}
              question=""
              answer=""
              isAdmin={true}
              isEditing={true}
              onAddSubmit={handleAddSubmit}
              onCancelAdd={() => setAdding(false)}
            />
          )}
        </section>
      </div>
    </Modal>
  );
};
