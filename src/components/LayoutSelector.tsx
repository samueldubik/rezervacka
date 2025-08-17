import { useGlobalContext } from '@/app/contexts/GlobalContext';
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const blockNames = ['A', 'C', 'D'];

export const LayoutSelector = () => {
  const { block, setBlock, selectedFloor, setSelectedFloor } = useGlobalContext();

  const blockLeft = () => {
    if (block > 0) setBlock((prev) => prev - 1);
  };

  const blockRight = () => {
    if (block < 2) setBlock((prev) => prev + 1);
  };

  const floorUp = () => {
    if (selectedFloor < 7) setSelectedFloor((prev) => prev + 1);
  };

  const floorDown = () => {
    if (selectedFloor > 1) setSelectedFloor((prev) => prev - 1);
  };

  return (
    <header className="flex w-full flex-row items-center justify-center gap-4 py-4">
      {/* Block Left */}
      <button
        onClick={blockLeft}
        className="rounded-xl bg-slate-300 px-4 py-2 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
        aria-label="Predošlí blok"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-3xl text-blue-700" />
      </button>

      {/* Floor Up/Down and Centered Block/Floor Text */}
      <div className="flex flex-col items-center justify-center gap-4">
        <button
          onClick={floorUp}
          className="rounded-xl bg-slate-300 px-6 py-2 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600"
          aria-label="Poschodie hore"
        >
          <FontAwesomeIcon icon={faChevronUp} className="text-3xl text-green-700" />
        </button>

        <h3 className="rounded-xl bg-slate-50 px-8 py-2 font-quicksand text-3xl font-bold text-slate-900 shadow-lg">
          BLOK {blockNames[block]}
          {selectedFloor}
        </h3>
        <button
          onClick={floorDown}
          className="rounded-xl bg-slate-300 px-6 py-2 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600"
          aria-label="Poschodie dolu"
        >
          <FontAwesomeIcon icon={faChevronDown} className="text-3xl text-green-700" />
        </button>
      </div>

      {/* Block Right */}
      <button
        onClick={blockRight}
        className="rounded-xl bg-slate-300 px-4 py-2 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
        aria-label="Ďalší blok"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-3xl text-blue-700" />
      </button>
    </header>
  );
};
