import { GENDER, Student } from '@prisma/client';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface GlobalState {
  isAdmin: boolean;
  students: Student[];
  setStudents: Dispatch<SetStateAction<Student[]>>;
  selectedRoomName: string | undefined;
  setSelectedRoomName: Dispatch<SetStateAction<string | undefined>>;
  gender: GENDER;
  setGender: Dispatch<SetStateAction<GENDER>>;
  correctForm: boolean;
  setCorrectForm: Dispatch<SetStateAction<boolean>>;
  formsVisible: boolean;
  setFormsVisible: Dispatch<SetStateAction<boolean>>;
  block: number;
  setBlock: Dispatch<SetStateAction<number>>;
  selectedFloor: number;
  setSelectedFloor: Dispatch<SetStateAction<number>>;
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalContextProvider = ({
  isAdmin = false,
  children,
}: {
  isAdmin?: boolean;
  children: React.ReactNode;
}) => {
  const [students, setStudents] = useState<Array<any>>([]);
  const [selectedRoomName, setSelectedRoomName] = useState<string | undefined>();
  const [gender, setGender] = useState<GENDER>(GENDER.NONE);
  const [correctForm, setCorrectForm] = useState<boolean>(false);
  const [formsVisible, setFormsVisible] = useState<boolean>(true);
  const [block, setBlock] = useState<number>(0);
  const [selectedFloor, setSelectedFloor] = useState(1);

  return (
    <GlobalContext.Provider
      value={{
        isAdmin,
        students,
        setStudents,
        selectedRoomName,
        setSelectedRoomName,
        gender,
        setGender,
        correctForm,
        setCorrectForm,
        formsVisible,
        setFormsVisible,
        block,
        setBlock,
        selectedFloor,
        setSelectedFloor,
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
