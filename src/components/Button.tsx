import { IconDefinition, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BUTTONBORDER, BUTTONTYPE } from '../../Const';

type Props = {
  label: string;
  icon: IconDefinition;
  action: () => void;
  type?: BUTTONTYPE;
  border: BUTTONBORDER;
  black?: boolean;
  loading?: boolean;
};

const Button = ({
  label,
  icon,
  action,
  border,
  type = BUTTONTYPE.DEFAULT,
  black = false,
  loading = false,
}: Props) => {
  const textColorsBlack = ['text-stone-800', 'text-[#edc949]', 'text-[#80ff4a]', 'text-[#e13941]'];
  const textColorsWhite = ['text-stone-200', 'text-[#edc949]', 'text-[#80ff4a]', 'text-[#e13941]'];

  const borderColor = ['border-stone-800', 'border-stone-200', 'border-red-600'];

  return (
    <div
      onClick={!loading ? action : () => console.log('LOADING...')}
      className={`mx-2 mt-2 flex h-[5vh] cursor-pointer flex-row items-center justify-start border-4 shadow-lg lg:mx-5 lg:mt-5 lg:h-[7vh] lg:border-8 ${borderColor[border]} hover:brightness-150`}
    >
      {!loading && (
        <FontAwesomeIcon
          icon={icon}
          className={
            black
              ? `h-[60%] w-[20%] lg:h-4/5 ${textColorsBlack[type]}`
              : `h-[60%] w-[20%] lg:h-4/5 ${textColorsWhite[type]}`
          }
        />
      )}
      {!loading ? (
        <h2
          className={
            black
              ? `w-[60%] text-center ${textColorsBlack[type]} font-fira-sans text-lg font-extrabold lg:text-xl`
              : `w-[60%] text-center ${textColorsWhite[type]} font-fira-sans text-lg font-extrabold lg:text-xl`
          }
        >
          {label}
        </h2>
      ) : (
        <FontAwesomeIcon icon={faSpinner} spin className="absolute left-[45%] h-5" />
      )}
    </div>
  );
};

export default Button;
