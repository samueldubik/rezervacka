import { Controller, Control, FieldErrors } from 'react-hook-form';

type StudentProps = {
  index: number;
  control: Control<any>;
  remove: (index: number) => void;
  errors?: {
    name?: { message?: string };
    email?: { message?: string };
  };
};

const StudentField = ({ index, control, remove, errors }: StudentProps) => (
  <div className="relative flex h-[35vh] w-full snap-center flex-col border-b-8 border-stone-200">
    <header className="flex h-[6vh] w-full flex-row items-center justify-between bg-[#174450]">
      <section
        className="flex h-full w-[25%] flex-row items-center justify-center"
        onClick={() => remove(index)}
      >
        <div className="button98">
          <h2 className="mt-0.5 w-full text-center font-fira-sans text-xl font-extrabold text-stone-800">
            X
          </h2>
        </div>
      </section>
    </header>

    <article className="mt-1 flex h-full w-full flex-col">
      <label
        className={`font-fira-sans font-medium ${errors?.name ? 'text-red-600' : 'text-stone-200'} mx-[5%] w-[90%] text-lg`}
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

            if (words.length < 2) {
              return 'Zadajte celé meno a priezvisko';
            }

            if (/\d/.test(value)) {
              return 'Meno nesmie obsahovať čísla';
            }

            return true;
          },
        }}
        render={({ field }) => (
          <input
            {...field}
            placeholder="Ján Novák"
            spellCheck={false}
            className={`h-12 border-8 px-1 font-fira-sans ${errors?.name ? 'border-red-600' : 'border-stone-200'} mx-[5%] w-[90%] bg-form font-semibold text-stone-200`}
            type="text"
          />
        )}
      />
      {errors?.name && (
        <h3 className="-mb-5 w-full text-center font-fira-sans font-medium text-[#ff3535]">
          {errors.name.message}
        </h3>
      )}

      <label
        className={`font-fira-sans font-medium ${errors?.email ? 'text-red-600' : 'text-stone-200'} mx-[5%] mt-4 w-[90%] text-lg`}
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
            className={`h-12 border-8 px-1 font-fira-sans ${errors?.email ? 'border-red-600' : 'border-stone-200'} mx-[5%] w-[90%] bg-form font-semibold text-stone-200`}
            type="text"
          />
        )}
      />
      {errors?.email && (
        <h3 className="-mb-5 w-full text-center font-fira-sans font-medium text-[#ff3535]">
          {errors.email.message}
        </h3>
      )}
    </article>
  </div>
);

export default StudentField;
