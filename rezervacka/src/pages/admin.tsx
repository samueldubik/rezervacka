import ActivityIndicator from '@/components/ActivityIndicator';
import FloorLayout, { IRoomData } from '@/components/FloorLayout';
import NavBar from '@/components/NavBar';
import { useFloorData } from '@/hooks/useFloorData';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import { GENDER } from '../../Const';
import GlobalContext from '../../GlobalContext';
import StudentForm from '@/components/StudentForm';
import FileHandler from '@/components/FileHandler';

const Admin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [students, setStudents] = useState<Array<any>>([])
  const [selectedRoom, setSelectedRoom] = useState<IRoomData>()
  const [gender, setGender] = useState<GENDER>(GENDER.NONE)
  const [floorData, setFloorData] =  useState<IRoomData[] | null>([])
  const [correctForm, setCorrectForm] = useState<boolean>(true)
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

  useEffect(() => {
    if (status === 'unauthenticated') {
      console.log('status:', status, 'isAdmin:', session);
      router.push('/login');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session || !session.user?.isAdmin) {
    return null;
  }

  const createTables = async () => {
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/create-tables', {
        method: 'POST',
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(data.message)
      } else {
        setMessage(data.message || 'Failed to create tables')
      }
    } catch (error) {
      setMessage('Failed to create tables')
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlobalContext.Provider value={contextValue} >

    <main className=' select-none bg-stone-200 h-screen w-screen flex flex-col items-center'>
      <NavBar/>
      
      <button 
      className=" button98 mt-10 w-[30vw] h-[10vh] items-center"
      onClick={createTables}
      >
        Vyčistiť databázu
      </button>

      <button onClick={() => signOut()}>Logout</button>

      <FloorLayout/>
      <FileHandler/>


      <section>
        <h3>Pridať termín</h3>
        <form>
        </form>
      </section>
    </main>
    </GlobalContext.Provider>
  );
};

export default Admin;
