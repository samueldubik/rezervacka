import { faPaperPlane, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FaqItemProps = {
  id: number;
  question: string;
  answer: string;
  isAdmin?: boolean;
  fetchFaq?: () => Promise<void>;
  isEditing?: boolean;
  onAddSubmit?: (data: { question: string; answer: string }) => void;
  onCancelAdd?: () => void;
};

type EditFormInputs = {
  question: string;
  answer: string;
};

export const FaqItem: React.FC<FaqItemProps> = ({
  id,
  question,
  answer,
  isAdmin,
  fetchFaq,
  isEditing = false,
  onAddSubmit,
  onCancelAdd,
}) => {
  const [editing, setEditing] = useState(isEditing);
  const { register, handleSubmit, reset } = useForm<EditFormInputs>({
    defaultValues: { question, answer },
  });

  const handleDelete = async () => {
    try {
      const res = await fetch('/api/faq/removeQuestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Failed to delete FAQ');
      if (fetchFaq) await fetchFaq();
    } catch (error) {
      console.error(error);
    }
  };

  const onEditSubmit = async (data: EditFormInputs) => {
    try {
      const res = await fetch('/api/faq/editQuestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data }),
      });
      if (!res.ok) throw new Error('Failed to edit FAQ');
      if (fetchFaq) await fetchFaq();
      setEditing(false);
      reset(data); // update form values
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSubmit = async (data: EditFormInputs) => {
    if (onAddSubmit) {
      await onAddSubmit(data);
      reset({ question: '', answer: '' });
    }
  };

  return (
    <div className="relative my-4 mr-32 rounded-lg bg-slate-300 p-4 shadow-xl">
      {isAdmin && (editing || isEditing) ? (
        <form
          onSubmit={handleSubmit(id === -1 ? handleAddSubmit : onEditSubmit)}
          className="flex flex-col"
        >
          <input
            type="text"
            {...register('question', { required: true })}
            className="mb-2 rounded border border-gray-300 p-2"
            placeholder="Otázka"
          />
          <textarea
            {...register('answer', { required: true })}
            className="rounded border border-gray-300 p-2"
            placeholder="Odpoveď"
          />
          <div className="mt-4 flex flex-row gap-4">
            <button
              type="submit"
              className="flex flex-row items-center justify-center gap-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              <h3>{id === -1 ? 'Pridať' : 'Potvrdiť'}</h3>
            </button>
            <button
              type="button"
              onClick={() => {
                if (id === -1 && onCancelAdd) onCancelAdd();
                else {
                  setEditing(false);
                  reset({ question, answer });
                }
              }}
              className="flex flex-row items-center justify-center gap-2 rounded bg-gray-500 p-2 text-white hover:bg-gray-700"
            >
              Zrušiť
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col">
          <h3 className="font-quicksand text-lg font-bold">{question}</h3>
          <div className="relative mt-2 rounded-lg bg-slate-50 p-2 font-quicksand text-gray-900 shadow-md">
            <p>{answer}</p>
            {isAdmin && !editing && (
              <div className="absolute right-2 top-2 flex gap-2">
                <button
                  onClick={() => setEditing(true)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {isAdmin && !editing && (
        <button
          onClick={handleDelete}
          className="absolute right-4 top-4 text-red-500 hover:text-red-700"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </div>
  );
};
