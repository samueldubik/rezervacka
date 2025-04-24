export interface IRoomData {
  room: string;
  gender: GENDER;
  students: number;
}

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

export enum GENDER {
  NONE,
  MALE,
  FEMALE,
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

export enum DATABASERESPONSE {
  NONE,
  SUCCESS,
  ERROR,
  ALREADYUSED,
  MORETHAN4,
  GENDERMISSMATCH,
}
