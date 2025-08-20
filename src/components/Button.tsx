import { IconDefinition, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BUTTONBORDER, BUTTONTYPE } from '../../Types';

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
      className={`mt-2 flex h-[7vh] w-[50%] cursor-pointer flex-row items-center justify-center gap-2 border-4 px-2 shadow-lg lg:mx-5 lg:mt-5 lg:h-[7vh] lg:border-8 ${borderColor[border]} hover:brightness-150`}
    >
      {!loading && <FontAwesomeIcon icon={icon} size="xl" />}
      {!loading ? (
        <h2
          className={
            black
              ? `text-center font-fira-sans text-lg font-extrabold lg:text-xl`
              : `text-center font-fira-sans text-lg font-extrabold lg:text-xl`
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
