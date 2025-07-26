import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

type ModalProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  children,
  isLoading = false,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onCancel();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-[60vw] rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4">{children}</div>
        <div className="flex justify-center gap-2">
          <button
            onClick={onCancel}
            className="w-[20%] rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
          >
            Zrušiť
          </button>
          <button
            onClick={onConfirm}
            className="w-[20%] rounded bg-form px-4 py-2 text-white hover:brightness-125 active:brightness-50"
          >
            {isLoading ? <FontAwesomeIcon icon={faCircleNotch} spin size="lg" /> : 'Potvrdiť'}
          </button>
        </div>
      </div>
    </div>
  );
};
