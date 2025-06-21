import { RoomData, ROOMTYPE } from '../../Types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import GlobalContext from '../../GlobalContext';
import { GENDER } from '@prisma/client';

type Props = {
  data?: RoomData;
  roomType?: ROOMTYPE;
  balcony?: boolean;
};

const Room = ({ data, roomType = ROOMTYPE.ROOM, balcony = false }: Props) => {
  const context = useContext(GlobalContext);
  const { selectedRoom, setSelectedRoom, gender, students } = context;

  const [available, setAvailable] = useState<boolean>(false);

  const roomColorFalse = 'bg-[#ce4341]';
  const roomColorTrue = 'bg-[#37ba5e]';

  useEffect(() => {
    setAvailable(isAvailable());
  });

  const isAvailable = () => {
    console.log('gender: ', gender);
    console.log('data?.gender: ', data?.gender);
    console.log('data: ', data);

    if (!data) {
      return false;
    }

    if (data.studentsCount + students.length > 4) {
      return false;
    }

    if (gender !== data?.gender && data?.gender !== GENDER.NONE) {
      return false;
    }

    return true;
  };

  const countPeople = () => {
    const arr = [];

    if (!data?.studentsCount) return [];

    for (let i = 0; i < data.studentsCount; i++)
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

  switch (roomType) {
    case ROOMTYPE.ROOM:
      return (
        <div
          onClick={selectRoom}
          className={
            data?.name === selectedRoom?.name
              ? `brightness-150 ${available ? roomColorTrue : roomColorFalse} relative flex h-[100%] w-[13%] border-collapse items-center justify-center border-r-8 border-stone-800`
              : `cursor-pointer ${available ? roomColorTrue : roomColorFalse} relative flex h-[100%] w-[13%] border-collapse items-center justify-center border-r-8 border-stone-800 hover:brightness-150`
          }
        >
          <h5 className="z-30 font-tektur text-2xl font-bold">{data?.name}</h5>

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
  }
};

export default Room;
