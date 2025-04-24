import { EnumDeclaration } from 'typescript';
import { GENDER, ROOMTYPE } from '../../Const';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { IRoomData } from './FloorLayout';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import GlobalContext from '../../GlobalContext';

type Props = {
  roomType: ROOMTYPE;
  balcony?: boolean;
  index?: number;
  selectedFloor?: number;
  setSelectedFloor?: Dispatch<SetStateAction<number>>;
};

const Room = ({
  roomType,
  balcony = false,
  index = -1,
  selectedFloor,
  setSelectedFloor,
}: Props) => {
  const context = useContext(GlobalContext);
  const { selectedRoom, setSelectedRoom, students, gender, floorData } = context;

  const [available, setAvailable] = useState<boolean>(false);

  const data = floorData ? floorData[index] : null;
  const roomColorFalse = 'bg-[#ce4341]';
  const roomColorTrue = 'bg-[#37ba5e]';

  useEffect(() => {
    setAvailable(isAvailable());
  });

  const isAvailable = () => {
    if (!data) return false;

    if (data?.students + students.length > 4) return false;
    if (gender && data?.gender && data?.gender !== gender) return false;

    return true;
  };

  const countPeople = () => {
    const arr = [];

    if (!data?.students) return [];

    for (let i = 0; i < data.students; i++)
      arr.push(
        <div
          key={i}
          className={
            data?.gender === GENDER.FEMALE
              ? 'mx-1 h-[13px] w-[13px] border-2 border-stone-800 bg-[#ff6b6b]'
              : 'mx-1 h-[13px] w-[13px] border-2 border-stone-800 bg-[#45c7db]'
          }
        ></div>,
      );

    return arr;
  };

  const people = countPeople();

  const selectRoom = () => {
    console.log(data);

    if (data) setSelectedRoom(data);
  };

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

  switch (roomType) {
    case ROOMTYPE.ROOM:
      return (
        <div
          onClick={selectRoom}
          className={
            data?.room === selectedRoom?.room
              ? `brightness-150 ${available ? roomColorTrue : roomColorFalse} relative flex h-[100%] w-[13%] border-collapse items-center justify-center border-r-8 border-stone-800`
              : `cursor-pointer ${available ? roomColorTrue : roomColorFalse} relative flex h-[100%] w-[13%] border-collapse items-center justify-center border-r-8 border-stone-800 hover:brightness-150`
          }
        >
          <h5 className="z-30 font-tektur text-2xl font-bold">{data?.room}</h5>

          {balcony && (
            <h6 className="font-tekur absolute top-3 text-sm font-semibold opacity-80">BALKÓN</h6>
          )}
          <div className="absolute bottom-4 flex w-full flex-row justify-center">{people}</div>
        </div>
      );

    case ROOMTYPE.KITCHEN:
      return (
        <div className="flex h-[100%] w-[22%] border-collapse cursor-pointer items-center justify-center border-r-8 border-stone-800 bg-stone-400">
          <h1 className="font-tektur text-xl font-semibold">KUCHYNKA</h1>
        </div>
      );

    case ROOMTYPE.ELEVATOR:
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
  }
};

export default Room;
