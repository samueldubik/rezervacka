import { useState } from 'react';
import { ROOMTYPE } from '../../Types';
import Room from './Room';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useFloorData } from '@/hooks/useFloorData';
import ActivityIndicator from './ActivityIndicator';
import { useSettings } from '@/hooks/useSettings';
import Elevator from './Elevator';

const blockNames = ['A', 'C', 'D'];

const FloorLayout = ({ isAdmin = false }) => {
  const [block, setBlock] = useState<number>(0);
  const [selectedFloor, setSelectedFloor] = useState(1);

  const blockLeft = () => {
    if (block) setBlock((prev) => prev - 1);
  };

  const blockRight = () => {
    if (block < 2) setBlock((prev) => prev + 1);
  };

  const floorData = useFloorData(selectedFloor, blockNames[block]);
  const { reservationEnabled } = useSettings();

  if (!reservationEnabled && !isAdmin) {
    return (
      <h1 className="mt-24 flex h-[15vh] w-[50vw] items-center justify-center border-[12px] border-[#6b7e6f] font-nav-name text-3xl text-[#252525]">
        Registrácia nie je dostupná
      </h1>
    );
  }

  if (floorData && floorData.length > 0) {
    return (
      <section className="mx-auto mt-5 flex h-[55%] w-[90%] flex-col justify-between">
        <header className="mx-auto mt-5 flex h-[10%] w-[50%] flex-row items-center justify-center">
          <FontAwesomeIcon
            onClick={blockLeft}
            icon={faChevronLeft}
            className="h-[75%] w-[10%] cursor-pointer hover:text-green-600"
          />

          <h2 className="text-center font-tektur text-6xl font-semibold">
            BLOK {blockNames[block]}
            {selectedFloor}
          </h2>

          <FontAwesomeIcon
            onClick={blockRight}
            icon={faChevronRight}
            className="h-[75%] w-[10%] cursor-pointer hover:text-green-600"
          />
        </header>
        <div className="mt-10 flex h-[40%] w-full flex-row border-8 border-r-0 border-stone-800">
          <Room data={floorData[9]} />
          <Room data={floorData[8]} balcony={true} />
          <Room data={floorData[7]} />

          <Room roomType={ROOMTYPE.KITCHEN} />

          <Room data={floorData[5]} />
          <Room data={floorData[4]} balcony={true} />
          <Room data={floorData[3]} />
        </div>

        <div className="mt-2 flex h-[40%] w-full flex-row border-8 border-r-0 border-stone-800">
          <Room data={floorData[10]} />
          <Room data={floorData[11]} balcony={true} />
          <Room data={floorData[12]} />

          <Elevator selectedFloor={selectedFloor} setSelectedFloor={setSelectedFloor} />

          <Room data={floorData[0]} />
          <Room data={floorData[1]} balcony={true} />
          <Room data={floorData[2]} />
        </div>
      </section>
    );
  } else if (floorData === null) {
    return <ActivityIndicator />;
  } else {
    return (
      <h1
        onClick={() => {
          const res = fetch('/api/admin/resetReservation', {
            method: 'POST',
          });

          console.log(res);
        }}
        className="mt-24 flex h-[15vh] w-[50vw] items-center justify-center border-[12px] border-[#6b7e6f] font-nav-name text-3xl text-[#252525]"
      >
        REGISTRÁCIA NIE JE SPRÍSTUPNENÁ
      </h1>
    );
  }
};

export default FloorLayout;
