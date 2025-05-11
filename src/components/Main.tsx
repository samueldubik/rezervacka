'use client';

import { useState } from 'react';
import GlobalContext from '../../GlobalContext';
import NavBar from './NavBar';
import ReservationWindow from './ReservationWindow';
import { RoomData } from '../../Types';
import { GENDER } from '@prisma/client';

const Main = () => {
  const [students, setStudents] = useState<Array<any>>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomData>();
  const [gender, setGender] = useState<GENDER>(GENDER.NONE);
  const [floorData, setFloorData] = useState<RoomData[] | null>([]);
  const [correctForm, setCorrectForm] = useState<boolean>(true);
  const [formsVisible, setFormsVisible] = useState<boolean>(true);

  const contextValue = {
    students: students,
    setStudents: setStudents,
    selectedRoom: selectedRoom,
    setSelectedRoom: setSelectedRoom,
    gender: gender,
    setGender: setGender,
    correctForm: correctForm,
    setCorrectForm: setCorrectForm,
    floorData: floorData,
    setFloorData: setFloorData,
    formsVisible: formsVisible,
    setFormsVisible: setFormsVisible,
  };

  return (
    <main className="flex h-screen w-screen select-none flex-col justify-between bg-stone-200">
      <GlobalContext.Provider value={contextValue}>
        <NavBar />
        <ReservationWindow />

        <footer className="flex h-[10%] flex-row items-center justify-between bg-[#272D2D] px-10">
          <h6 className="font-fira-sans font-medium text-stone-200">Samuel Dubík 2023</h6>
          <h6 className="font-fira-sans font-medium text-stone-200">
            V prípade problémov s rezerváciou nás kontaktujte na rada.jedlikova9@gmail.com
          </h6>
        </footer>
      </GlobalContext.Provider>
    </main>
  );
};

export default Main;
