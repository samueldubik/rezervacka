import { Controller, Control } from 'react-hook-form';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type StudentProps = {
  index: number;
  control: Control<any>;
  remove: (index: number) => void;
  errors?: {
    name?: { message?: string };
    email?: { message?: string };
  };
  onSubmit: () => void; // new: parent passes handleSubmit(onSubmit)
  setSelectedField: (idx: number) => void; // new: parent passes this
};

const StudentField = ({
  index,
  control,
  remove,
  errors,
  onSubmit,
  setSelectedField,
}: StudentProps) => (
  <div className="relative flex h-full w-full flex-col bg-slate-200">
    <article className="flex flex-1 flex-col justify-center">
      <label
        className={`font-fira-sans font-medium ${errors?.name ? 'text-red-600' : 'text-form'} mx-[5%] w-[90%] text-lg`}
      >
        Meno a Priezvisko
      </label>
      <Controller
        control={control}
        name={`students.${index}.name`}
        rules={{
          required: 'Zadajte meno',
          validate: (value: string) => {
            const words = value.trim().split(/\s+/);
            if (words.length < 2) return 'Zadajte celé meno a priezvisko';
            if (/\d/.test(value)) return 'Meno nesmie obsahovať čísla';
            return true;
          },
        }}
        render={({ field }) => (
          <input
            {...field}
            placeholder="Ján Novák"
            spellCheck={false}
            className={`h-12 border-4 px-4 font-fira-sans ${errors?.name ? 'border-red-600' : 'border-dark'} mx-[5%] w-[90%] bg-slate-200 font-semibold text-dark`}
            type="text"
          />
        )}
      />
      {errors?.name && (
        <h3 className="w-full text-center font-fira-sans font-medium text-[#ff3535]">
          {errors.name.message}
        </h3>
      )}

      <label
        className={`font-fira-sans font-medium ${errors?.email ? 'text-red-600' : 'text-form'} mx-[5%] mt-4 w-[90%] text-lg`}
      >
        Študentský email
      </label>
      <Controller
        control={control}
        name={`students.${index}.email`}
        rules={{
          required: 'Zadajte email',
          pattern: {
            value:
              /^[a-zA-Z0-9._%+-]+@(student\.tuke\.sk|student\.uvlf\.sk|smail\.unipo\.sk|upjs\.sk|student\.upjs\.sk)$/,
            message: 'Nesprávny formát',
          },
        }}
        render={({ field }) => (
          <input
            {...field}
            placeholder="jan.novak@student.tuke.sk"
            spellCheck={false}
            className={`h-12 border-4 px-4 font-fira-sans ${errors?.email ? 'border-red-600' : 'border-dark'} mx-[5%] w-[90%] bg-slate-200 font-semibold text-dark`}
            type="text"
          />
        )}
      />
      {errors?.email && (
        <h3 className="-mb-2 w-full text-center font-fira-sans font-medium text-[#ff3535]">
          {errors.email.message}
        </h3>
      )}
    </article>

    {/* Bottom buttons */}
    <div className="flex w-full justify-center gap-8 pb-4 pt-2">
      {/* Submit/validate button */}
      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center rounded bg-green-500 shadow-lg hover:bg-green-600"
        onClick={onSubmit}
        title="Uložiť"
      >
        <FontAwesomeIcon icon={faCheck} className="text-2xl text-white" />
      </button>
      {/* Delete button */}
      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center rounded bg-red-500 shadow-lg hover:bg-red-600"
        onClick={() => {
          remove(index);
        }}
        title="Vymazať študenta"
      >
        <FontAwesomeIcon icon={faTimes} className="text-2xl text-white" />
      </button>
    </div>
  </div>
);

export default StudentField;
