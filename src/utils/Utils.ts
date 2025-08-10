import { RoomData } from '../../Types';

export const hasBalcony = (roomName: string | undefined) => {
  if (!roomName) {
    return false;
  }
  const balconyRooms = ['2', '5', '9', '12'];

  return balconyRooms.includes(roomName.charAt(3));
};
