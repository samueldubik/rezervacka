import { Modal } from '../Modal';

type ContactModalProps = {
  isContactModalOpen: boolean;
  setIsContactModalOpen: (isOpen: boolean) => void;
};

export const ContactModal: React.FC<ContactModalProps> = ({
  isContactModalOpen,
  setIsContactModalOpen,
}) => {
  return (
    <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)}>
      <div className="flex h-[10vh] min-h-[200px] w-[60vw] flex-col items-center p-4">
        <h2 className="font-quicksand text-xl font-bold">Kontaktujte nás</h2>
        <p className="mt-5 font-quicksand">rada.jedlikova9@gmail.com</p>
      </div>
    </Modal>
  );
};
