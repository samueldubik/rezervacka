import { useState } from 'react';
import { ROOMTYPE } from '../../Types';
import Room from './Room';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { useFloorData } from '@/hooks/useFloorData';
import ActivityIndicator from './ActivityIndicator';
import { useSettings } from '@/hooks/useSettings';
import Elevator from './Elevator';
import { LayoutSelector } from './LayoutSelector';

const blockNames = ['A', 'C', 'D'];

const FloorLayout = ({ isAdmin = false }) => {
  const [block, setBlock] = useState<number>(0);
  const [selectedFloor, setSelectedFloor] = useState(1);

  const { floorData, loading, error } = useFloorData(selectedFloor, blockNames[block]);
  const { reservationsEnabled } = useSettings();

  if (loading) {
    return <ActivityIndicator />;
  } else if (error || !reservationsEnabled) {
    return (
      <h1 className="mx-auto mt-24 flex h-[15vh] w-[70vw] items-center justify-center border-[12px] border-[#a33737] px-8 text-center font-nav-name text-xl text-dark lg:w-[40vw] lg:text-2xl">
        REGISTRÁCIA NIE JE SPRÍSTUPNENÁ
      </h1>
    );
    // HAPPY PATH
  } else if (floorData && floorData.length > 0) {
    return (
      <section className="relative mx-auto mt-5 flex w-[90%] flex-col justify-between overflow-auto">
        <LayoutSelector
          selectedFloor={selectedFloor}
          setSelectedFloor={setSelectedFloor}
          block={block}
          setBLock={setBlock}
        />

        <div className="mt-5 flex flex-row items-center justify-center gap-6 lg:flex-col">
          <div className="flex w-[40%] flex-col border-4 border-b-0 border-r-0 border-stone-800 lg:w-full lg:flex-row">
            <Room data={floorData[9]} />
            <Room data={floorData[8]} balcony={true} />
            <Room data={floorData[7]} />
            <Room roomType={ROOMTYPE.KITCHEN} />
            <Room data={floorData[5]} />
            <Room data={floorData[4]} balcony={true} />
            <Room data={floorData[3]} />
          </div>
          <div className="flex w-[40%] flex-col border-4 border-b-0 border-r-0 border-stone-800 lg:w-full lg:flex-row">
            <Room data={floorData[10]} />
            <Room data={floorData[11]} balcony={true} />
            <Room data={floorData[12]} />
            <Elevator selectedFloor={selectedFloor} setSelectedFloor={setSelectedFloor} />
            <Room data={floorData[0]} />
            <Room data={floorData[1]} balcony={true} />
            <Room data={floorData[2]} />
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <h1 className="mx-auto mt-24 flex h-[15vh] w-[70vw] items-center justify-center border-[12px] border-[#a33737] px-8 font-nav-name text-xl text-dark">
        VYSKYTOL SA PROBLÉM S NAČÍTANÍM DÁT
      </h1>
    );
  }
};

export default FloorLayout;
