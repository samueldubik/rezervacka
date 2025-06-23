import { GENDER, Student } from '@prisma/client';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { RoomData } from './Types';

interface GlobalState {
  students: Student[];
  setStudents: Dispatch<SetStateAction<Student[]>>;
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

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [students, setStudents] = useState<Array<any>>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomData>();
  const [gender, setGender] = useState<GENDER>(GENDER.NONE);
  const [floorData, setFloorData] = useState<RoomData[] | null>([]);
  const [correctForm, setCorrectForm] = useState<boolean>(true);
  const [formsVisible, setFormsVisible] = useState<boolean>(true);

  return (
    <GlobalContext.Provider
      value={{
        students,
        setStudents,
        selectedRoom,
        setSelectedRoom,
        gender,
        setGender,
        floorData,
        setFloorData,
        correctForm,
        setCorrectForm,
        formsVisible,
        setFormsVisible,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};
