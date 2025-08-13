import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BUTTONBORDER } from '../../Types';
import { GENDER } from '@prisma/client';

type Props = {
  border: BUTTONBORDER;
  value: GENDER;
  onChange: (value: GENDER) => void;
  onSubmit: () => void;
};

const GenderSelector = ({ border, value, onChange, onSubmit }: Props) => {
  const borderColor = ['border-stone-800', 'border-stone-200', 'border-red-600'];
  console.log('value', value);

  console.log(value === GENDER.FEMALE);
  return (
    <div className="mx-5 flex h-14 w-[30%] flex-row items-center justify-start gap-4">
      <div
        onClick={() => {
          onChange(GENDER.MALE);
          onSubmit();
        }}
        className={
          value === GENDER.MALE
            ? `h-full w-[50%] bg-[#3055e7] ${borderColor[border]} flex items-center justify-center`
            : `h-full w-[50%] bg-blue-200 ${borderColor[border]} flex items-center justify-center hover:cursor-pointer hover:bg-blue-400 ${GENDER.MALE ? 'hover bg-blue-300' : ''}`
        }
      >
        <FontAwesomeIcon
          icon={faMars}
          className={value === GENDER.MALE ? 'h-[75%] text-stone-200' : 'h-[75%] text-form'}
        />
      </div>

      <div
        onClick={() => {
          onChange(GENDER.FEMALE);
          onSubmit();
        }}
        className={
          value === GENDER.FEMALE
            ? `flex h-full w-[50%] items-center justify-center bg-red-900`
            : `flex h-full w-[50%] items-center justify-center bg-red-200 hover:cursor-pointer hover:bg-red-400`
        }
      >
        <FontAwesomeIcon
          icon={faVenus}
          className={value === GENDER.FEMALE ? 'h-[75%] text-stone-200' : 'h-[75%] text-form'}
        />
      </div>
    </div>
  );
};

export default GenderSelector;
