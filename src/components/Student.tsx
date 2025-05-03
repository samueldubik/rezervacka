import { faCircleXmark, faRectangleXmark, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IStudent } from '../../GlobalContext';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { VALIDATION } from '../../Types';
import { IValidation } from './StudentForm';

type Props = {
  index: number;
  studentsForm: IStudent[];
  setStudentsForm: Dispatch<SetStateAction<IStudent[]>>;
  destroyForm: (index: number) => void;
  error?: IValidation[];
};

const Student = ({ index, studentsForm, setStudentsForm, destroyForm, error }: Props) => {
  const [noNameError, setNoNameError] = useState<boolean>(false);
  const [noEmailError, setNoEmailError] = useState<boolean>(false);
  const [nameWrongError, setNameWrongError] = useState<boolean>(false);
  const [emailWrongError, setEmailWrongError] = useState<boolean>(false);

  useEffect(() => {
    setErrors();
  });

  const isError = (status: VALIDATION) => {
    if (error)
      return error.some((obj) => {
        return obj.status === status;
      });

    return false;
  };

  const setErrors = () => {
    setNoNameError(isError(VALIDATION.NONAME));
    setNoEmailError(isError(VALIDATION.NOEMAIL));
    setNameWrongError(isError(VALIDATION.NAMEWRONG));
    setEmailWrongError(isError(VALIDATION.EMAILNOTUKE));
  };

  const HandleChangeName = (input: string) => {
    setStudentsForm((prev) => {
      prev[index].name = input;
      return [...prev];
    });
  };

  const HandleChangeEmail = (input: string) => {
    setStudentsForm((prev) => {
      prev[index].email = input;
      return [...prev];
    });
  };

  return (
    <form className="relative flex h-[35vh] w-full snap-center flex-col border-b-8 border-stone-200">
      <header className="flex h-[6vh] w-full flex-row items-center justify-between bg-[#174450]">
        <section className="flex h-full w-[25%] flex-row items-center justify-center">
          <FontAwesomeIcon icon={faUser} className="h-[75%] text-stone-200" />
        </section>

        <section className="flex h-full w-[50%] flex-col justify-center">
          <h2 className="mt-1 text-center font-fira-sans text-xl font-bold text-stone-200">
            Študent {index + 1}
          </h2>
        </section>

        <section
          className="flex h-full w-[25%] flex-row items-center justify-center"
          onClick={() => destroyForm(index)}
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
          className={`font-fira-sans font-medium ${noNameError || nameWrongError ? 'text-red-600' : 'text-stone-200'} mx-[5%] w-[90%] text-lg`}
        >
          Meno a Priezvisko
        </label>
        <input
          placeholder="Ján Novák"
          spellCheck={false}
          value={studentsForm[index].name}
          onChange={(event) => HandleChangeName(event.target.value)}
          className={`h-12 border-8 px-1 font-fira-sans ${noNameError || nameWrongError ? 'border-red-600' : 'border-stone-200'} mx-[5%] w-[90%] bg-form font-semibold text-stone-200`}
          type="text"
        />

        {noNameError && (
          <h3 className="-mb-5 w-full text-center font-fira-sans font-medium text-[#ff3535]">
            Zadajte meno
          </h3>
        )}

        {nameWrongError && (
          <h3 className="-mb-5 w-full text-center font-fira-sans font-medium text-[#ff3535]">
            Nesprávny formát
          </h3>
        )}

        <label
          className={`font-fira-sans font-medium ${noEmailError || emailWrongError ? 'text-red-600' : 'text-stone-200'} mx-[5%] mt-4 w-[90%] text-lg`}
        >
          Študentský email
        </label>
        <input
          placeholder="jan.novak@student.tuke.sk"
          spellCheck={false}
          value={studentsForm[index].email}
          onChange={(event) => HandleChangeEmail(event.target.value)}
          className={`h-12 border-8 px-1 font-fira-sans ${noEmailError || emailWrongError ? 'border-red-600' : 'border-stone-200'} mx-[5%] w-[90%] bg-form font-semibold text-stone-200`}
          type="text"
        />

        {noEmailError && (
          <h3 className="-mb-5 w-full text-center font-fira-sans font-medium text-[#ff3535]">
            Zadajte email
          </h3>
        )}

        {emailWrongError && (
          <h3 className="-mb-5 w-full text-center font-fira-sans font-medium text-[#ff3535]">
            Nesprávny formát
          </h3>
        )}
      </article>
    </form>
  );
};

export default Student;
