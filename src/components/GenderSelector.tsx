import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import { BUTTONBORDER, GENDER } from '../../Types';

type Props = {
  border: BUTTONBORDER;
};

const GenderSelector = ({ border }: Props) => {
  const context = useContext(GlobalContext);

  const { gender, setGender } = context;

  const borderColor = ['border-stone-800', 'border-stone-200', 'border-red-600'];

  return (
    <div className="mx-5 flex h-[7vh] flex-row items-center justify-start shadow-lg">
      <div
        onClick={() => setGender(GENDER.MALE)}
        className={
          gender === GENDER.MALE
            ? `h-full w-[50%] border-8 border-r-4 bg-[#3055e7] ${borderColor[border]} flex items-center justify-center`
            : `h-full w-[50%] border-8 border-r-4 bg-blue-200 ${borderColor[border]} flex items-center justify-center hover:cursor-pointer hover:bg-blue-400 ${GENDER.MALE ? 'hover bg-blue-300' : ''}`
        }
      >
        <FontAwesomeIcon
          icon={faMars}
          className={gender === GENDER.MALE ? 'h-[75%] text-stone-200' : 'h-[75%] text-form'}
        />
      </div>

      <div
        onClick={() => setGender(GENDER.FEMALE)}
        className={
          gender === GENDER.FEMALE
            ? `h-full w-[50%] border-8 border-l-4 bg-[#f93b3b] ${borderColor[border]} flex items-center justify-center`
            : `h-full w-[50%] border-8 border-l-4 bg-red-200 ${borderColor[border]} flex items-center justify-center hover:cursor-pointer hover:bg-red-400`
        }
      >
        <FontAwesomeIcon
          icon={faVenus}
          className={gender === GENDER.FEMALE ? 'h-[75%] text-stone-200' : 'h-[75%] text-form'}
        />
      </div>
    </div>
  );
};

export default GenderSelector;
