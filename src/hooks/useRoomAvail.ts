import { useEffect, useState } from 'react';
import { RoomData } from '../../Types';
import { useGlobalContext } from '../../GlobalContext';
import { GENDER } from '@prisma/client';

export const useRoomAvail = (room: RoomData | undefined) => {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const { gender, students } = useGlobalContext();

  useEffect(() => {
    if (!room) {
      setIsAvailable(false);
      return;
    }

    if (room.studentsCount + students.length > 4) {
      setIsAvailable(false);
      return;
    }

    if (gender !== room.gender && room.gender !== GENDER.NONE) {
      setIsAvailable(false);
      return;
    }

    setIsAvailable(true);
  }, [students, room, gender]);

  return isAvailable;
};
