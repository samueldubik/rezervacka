import ActivityIndicator from '@/components/ActivityIndicator';
import FloorLayout, { IRoomData } from '@/components/FloorLayout';
import NavBar from '@/components/NavBar';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import StudentForm from '@/components/StudentForm';
import FileHandler from '@/components/FileHandler';
import ReservationWindow from '@/components/ReservationWindow';
import ToggleReservationButton from '@/components/ToogleReservationButton';
import GlobalContext from '../../../GlobalContext';
import { GENDER } from '../../../Const';

const Admin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [settings, setSettings] = useState<{ key: string; value: boolean }[]>([]);

  const [students, setStudents] = useState<Array<any>>([]);
  const [selectedRoom, setSelectedRoom] = useState<IRoomData>();
  const [gender, setGender] = useState<GENDER>(GENDER.NONE);
  const [floorData, setFloorData] = useState<IRoomData[] | null>([]);
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

  useEffect(() => {
    if (status === 'unauthenticated') {
      console.log('status:', status, 'isAdmin:', session);
      router.push('/login');
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/fetch-settings');
        const data = await res.json();
        if (res.ok) {
          setSettings(data);
        } else {
          console.error('Failed to fetch settings');
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session || !session.user?.isAdmin) {
    return null;
  }

  const createTables = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/create-tables', {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Failed to create tables');
      }
    } catch (error) {
      setMessage('Failed to create tables');
    } finally {
      setLoading(false);
    }
  };

  const reservationEnabled =
    settings.find((setting) => setting.key === 'reservations_enabled')?.value || false;

  return (
    <GlobalContext.Provider value={contextValue}>
      <main className="flex h-screen w-screen select-none flex-col items-center bg-stone-200">
        <NavBar />

        <ReservationWindow isAdmin={true} />
        <FileHandler />
        <ToggleReservationButton reservationEnabled={reservationEnabled} />

        <button className="button98 mt-10 h-[10vh] w-[30vw] items-center" onClick={createTables}>
          Vyčistiť databázu
        </button>

        <div className="mt-10">
          <h2 className="text-xl font-bold">Settings</h2>
          {settings.length > 0 ? (
            <ul>
              {settings.map((setting) => (
                <li key={setting.key}>
                  {setting.key}: {setting.value ? 'Enabled' : 'Disabled'}
                </li>
              ))}
            </ul>
          ) : (
            <p>No settings available</p>
          )}
        </div>
        <button onClick={() => signOut()}>Logout</button>
      </main>
    </GlobalContext.Provider>
  );
};

export default Admin;
