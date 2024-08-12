import '../app/globals.css'
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { GENDER, IRoomData } from '../../Const';
import GlobalContext from '../../GlobalContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  
  const [students, setStudents] = useState<Array<any>>([])
  const [selectedRoom, setSelectedRoom] = useState<IRoomData>()
  const [gender, setGender] = useState<GENDER>(GENDER.NONE)
  const [floorData, setFloorData] =  useState<IRoomData[] | null>([])
  const [selectedFloor, setSelectedFloor] = useState<number>(1)
  const [correctForm, setCorrectForm] = useState<boolean>(true)
  const [block, setBlock] = useState<number>(0)
  const [formsVisible, setFormsVisible] = useState<boolean>(true)

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
  }

  return (
    <SessionProvider session={session}>
      <GlobalContext.Provider value={contextValue}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
