import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  selectedFloor?: number;
  setSelectedFloor?: Dispatch<SetStateAction<number>>;
};

const Elevator = ({ selectedFloor, setSelectedFloor }: Props) => {
  const floorUp = () => {
    if (selectedFloor && setSelectedFloor)
      if (selectedFloor < 7)
        setSelectedFloor((prev) => {
          return prev + 1;
        });
  };

  const floorDown = () => {
    if (selectedFloor && setSelectedFloor)
      if (selectedFloor > 1)
        setSelectedFloor((prev) => {
          return prev - 1;
        });
  };

  return (
    <div className="relative flex h-[100%] w-[22%] border-collapse flex-col border-r-8 border-stone-800">
      <div
        onClick={floorUp}
        className="flex h-1/2 w-full cursor-pointer flex-col items-center justify-center border-stone-800 bg-[#A2C3A4] hover:brightness-125"
      >
        <FontAwesomeIcon icon={faCaretUp} size={'2xl'} />
      </div>

      <div className="absolute top-[48%] z-20 h-[8px] w-full bg-stone-800"></div>

      <div
        onClick={floorDown}
        className="flex h-1/2 w-full cursor-pointer flex-col items-center justify-center border-stone-800 bg-[#A2C3A4] hover:brightness-125"
      >
        <FontAwesomeIcon icon={faCaretDown} size={'2xl'} />
      </div>
    </div>
  );
};

export default Elevator;
