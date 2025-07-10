import { RoomData, ROOMTYPE } from '../../Types';
import { useGlobalContext } from '../../GlobalContext';
import { GENDER } from '@prisma/client';
import { use, useEffect, useState } from 'react';
import { useRoomAvail } from '@/hooks/useRoomAvail';

type Props = {
  data?: RoomData;
  roomType?: ROOMTYPE;
  balcony?: boolean;
};

const Room = ({ data, roomType = ROOMTYPE.ROOM, balcony = false }: Props) => {
  const { selectedRoom, setSelectedRoom } = useGlobalContext();
  const available = useRoomAvail(data);

  const roomColorFalse = 'bg-[#ce4341]';
  const roomColorTrue = 'bg-[#37ba5e]';

  const renderPeopleIndicators = () => {
    const arr = [];

    if (!data?.studentsCount) {
      return [];
    }

    for (let i = 0; i < data.studentsCount; i++) {
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
    }

    return arr;
  };

  const people = renderPeopleIndicators();

  const selectRoom = () => {
    console.log(data);

    if (data) {
      setSelectedRoom(data);
    }
  };

  switch (roomType) {
    case ROOMTYPE.ROOM:
      return (
        <div
          onClick={selectRoom}
          className={
            data?.name === selectedRoom?.name
              ? `brightness-150 ${available ? roomColorTrue : roomColorFalse} relative flex h-[10vh] min-h-[100px] w-full border-collapse flex-col items-center justify-center border-b-8 border-r-8 border-stone-800`
              : `cursor-pointer ${available ? roomColorTrue : roomColorFalse} relative flex h-[10vh] min-h-[100px] w-full border-collapse flex-col items-center justify-center border-b-8 border-r-8 border-stone-800 hover:brightness-150`
          }
        >
          <h5 className="z-30 font-tektur text-2xl font-bold">{data?.name}</h5>

          {balcony && <h6 className="font-tekur text-sm font-semibold opacity-80">BALKÓN</h6>}
          <div className="flex w-full flex-row justify-center">{people}</div>
        </div>
      );

    case ROOMTYPE.KITCHEN:
      return (
        <div className="flex h-[10vh] min-h-[100px] w-full border-collapse cursor-pointer items-center justify-center border-b-8 border-r-8 border-stone-800 bg-stone-400">
          <h1 className="font-tektur text-xl font-semibold">KUCHYNKA</h1>
        </div>
      );
  }
};

export default Room;
