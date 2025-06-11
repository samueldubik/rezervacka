import { Dispatch, SetStateAction, createContext } from 'react';
import { GENDER, Room } from '@prisma/client';
import { RoomData } from './Types';

export interface IStudent {
  name: string;
  email: string;
}

export interface GlobalContextValue {
  students: IStudent[];
  setStudents: Dispatch<SetStateAction<IStudent[]>>;
  selectedRoom: RoomData | undefined;
  setSelectedRoom: Dispatch<SetStateAction<RoomData | undefined>>;
  gender: GENDER;
  setGender: Dispatch<SetStateAction<GENDER>>;
  correctForm: boolean;
  setCorrectForm: Dispatch<SetStateAction<boolean>>;
  floorData: RoomData[] | null;
  setFloorData: Dispatch<SetStateAction<RoomData[] | null>>;
  formsVisible: boolean;
  setFormsVisible: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextValue>({
  students: [],
  setStudents: () => {},
  selectedRoom: undefined,
  setSelectedRoom: () => {},
  gender: GENDER.NONE,
  setGender: () => {},
  correctForm: false,
  setCorrectForm: () => {},
  floorData: [],
  setFloorData: () => {},
  formsVisible: false,
  setFormsVisible: () => {},
});

export default GlobalContext;
