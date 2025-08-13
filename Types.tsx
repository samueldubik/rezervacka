import { $Enums } from '@prisma/client';

export enum ROOMTYPE {
  ROOM,
  KITCHEN,
  ELEVATOR,
}

export enum VALIDATION {
  SUCCESS,
  LESSTHAN2,
  NONAME,
  NOEMAIL,
  NAMEWRONG,
  EMAILNOTUKE,
  NOGENDER,
}

export enum ROLE {
  STUDENT,
  ADMIN,
}

export enum BUTTONTYPE {
  DEFAULT,
  ADD,
  SUCCESS,
  ERROR,
}

export enum BUTTONBORDER {
  BLACK,
  WHITE,
  ERROR,
}

export const RESERVATIONRESPONSE = {
  NONE: { message: 'Missing parameters: gender, roomName, or students.', status: 400 },
  SUCCESS: { message: 'Reservation successfully completed.', status: 200 },
  ERROR: { message: 'Internal Server Error', status: 500 },
  ALREADYUSED: { message: 'Room already reserved.', status: 400 },
  NOTFOUND: { message: 'Room not found.', status: 404 },
  MORETHAN4: { message: 'Room capacity exceeded. Maximum 4 students allowed.', status: 400 },
  GENDERMISSMATCH: { message: 'Room gender mismatch.', status: 400 },
};

export type RoomData = {
  name: string;
  studentsCount: number;
  gender: $Enums.GENDER;
  isBlocked: boolean;
};
