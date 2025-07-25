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
  const roomColorTrue = 'bg-form';

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
              ? `brightness-110 ${available ? 'bg-emerald-800' : 'bg-rose-800'} relative flex h-[10vh] min-h-[100px] w-full border-collapse flex-col items-center justify-center border-b-4 border-r-4 border-slate-700`
              : `cursor-pointer ${available ? 'bg-emerald-500' : 'bg-rose-500'} relative flex h-[10vh] min-h-[100px] w-full border-collapse flex-col items-center justify-center border-b-4 border-r-4 border-slate-700 hover:brightness-110`
          }
        >
          <h5 className="z-30 font-tektur text-2xl font-bold text-slate-50">{data?.name}</h5>
          {balcony && (
            <h6 className="font-tektur text-xs font-semibold text-blue-200 opacity-80">BALKÓN</h6>
          )}
          <div className="flex w-full flex-row justify-center">{people}</div>
        </div>
      );

    case ROOMTYPE.KITCHEN:
      return (
        <div className="flex h-[10vh] min-h-[100px] w-full border-collapse cursor-pointer items-center justify-center border-b-4 border-r-4 border-slate-700 bg-slate-300">
          <h1 className="font-tektur text-xl font-semibold text-slate-700">KUCHYNKA</h1>
        </div>
      );
  }
};

export default Room;
