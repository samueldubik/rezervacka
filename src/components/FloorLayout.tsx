import { useContext, useEffect, useState } from 'react';
import { ROOMTYPE } from '../../Types';
import Room from './Room';
import GlobalContext from '../../GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useFloorData } from '@/hooks/useFloorData';
import ActivityIndicator from './ActivityIndicator';

const blockNames = ['A', 'C', 'D'];

const FloorLayout = ({ isAdmin = false }) => {
  const [block, setBlock] = useState<number>(0);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [reservationsEnabled, setReservationsEnabled] = useState<boolean | null>(null);

  const context = useContext(GlobalContext);
  const { floorData, setFloorData } = context;

  const blockLeft = () => {
    if (block) setBlock((prev) => prev - 1);
  };

  const blockRight = () => {
    if (block < 2) setBlock((prev) => prev + 1);
  };

  const fetchFloorData = useFloorData(selectedFloor, block);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/fetchSettings');
        const settings = await response.json();
        const reservationsSetting = settings.find((s: any) => s.key === 'reservations_enabled');
        setReservationsEnabled(reservationsSetting?.value || false);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    setFloorData(fetchFloorData);
  }, [fetchFloorData, setFloorData]);

  if (reservationsEnabled === null) {
    return <ActivityIndicator />;
  }

  if (!reservationsEnabled && !isAdmin) {
    return (
      <h1 className="mt-24 flex h-[15vh] w-[50vw] items-center justify-center border-[12px] border-[#6b7e6f] font-nav-name text-3xl text-[#252525]">
        Registrácia nie je dostupná
      </h1>
    );
  }

  if (fetchFloorData) {
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
          <Room roomType={ROOMTYPE.ROOM} index={9} />
          <Room roomType={ROOMTYPE.ROOM} index={8} balcony={true} />
          <Room roomType={ROOMTYPE.ROOM} index={7} />

          <Room roomType={ROOMTYPE.KITCHEN} />

          <Room roomType={ROOMTYPE.ROOM} index={5} />
          <Room roomType={ROOMTYPE.ROOM} index={4} balcony={true} />
          <Room roomType={ROOMTYPE.ROOM} index={3} />
        </div>

        <div className="mt-2 flex h-[40%] w-full flex-row border-8 border-r-0 border-stone-800">
          <Room roomType={ROOMTYPE.ROOM} index={10} />
          <Room roomType={ROOMTYPE.ROOM} index={11} balcony={true} />
          <Room roomType={ROOMTYPE.ROOM} index={12} />

          <Room
            roomType={ROOMTYPE.ELEVATOR}
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
          />

          <Room roomType={ROOMTYPE.ROOM} index={0} />
          <Room roomType={ROOMTYPE.ROOM} index={1} balcony={true} />
          <Room roomType={ROOMTYPE.ROOM} index={2} />
        </div>
      </section>
    );
  } else if (floorData && floorData.length === 0) {
    return <ActivityIndicator />;
  } else {
    return (
      <h1 className="mt-24 flex h-[15vh] w-[50vw] items-center justify-center border-[12px] border-[#6b7e6f] font-nav-name text-3xl text-[#252525]">
        REGISTRÁCIA NIE JE SPRÍSTUPNENÁ
      </h1>
    );
  }
};

export default FloorLayout;
