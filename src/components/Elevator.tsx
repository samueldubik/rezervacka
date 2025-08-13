import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction } from 'react';
import { useGlobalContext } from '../../GlobalContext';

const Elevator = () => {
  const { selectedFloor, setSelectedFloor } = useGlobalContext();

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
    <div className="relative flex h-[10vh] min-h-[100px] w-full border-collapse flex-col items-center justify-center border-b-4 border-r-4 border-stone-800">
      <button
        className="flex h-1/2 w-full cursor-pointer items-center justify-center border-b-4 border-stone-800 bg-slate-200 text-stone-800"
        onClick={floorUp}
      >
        <FontAwesomeIcon icon={faCaretUp} size={'2xl'} />
      </button>
      <button
        className="flex h-1/2 w-full cursor-pointer items-center justify-center border-stone-800 bg-slate-200 text-stone-800"
        onClick={floorDown}
      >
        <FontAwesomeIcon icon={faCaretDown} size={'2xl'} />
      </button>
    </div>
  );
};

export default Elevator;
