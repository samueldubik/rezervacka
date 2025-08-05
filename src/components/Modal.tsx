import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  actions?: React.ReactNode; // Buttons or custom actions
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  actions,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  isLoading = false,
  children,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeOnOverlayClick && onClose ? () => onClose() : undefined}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative max-w-[80vw] rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && onClose && (
          <button
            className="absolute right-4 top-4 text-xl text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        )}
        <div className="mb-4">{children}</div>
        {actions && <div className="flex justify-center gap-2">{actions}</div>}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
            <FontAwesomeIcon className="text-7xl text-dark" icon={faCircleNotch} spin />
          </div>
        )}
      </div>
    </div>
  );
};
