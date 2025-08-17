import { useEffect, useState } from 'react';
import Button from './Button';
import { faBook, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { BUTTONBORDER, RESERVATIONRESPONSE } from '../../Types';
import { GENDER } from '@prisma/client';
import { useWhitelist } from '@/hooks/useWhitelist';
import { hasBalcony } from '@/utils/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGlobalContext } from '@/app/contexts/GlobalContext';
import { useFloorDataContext } from '@/app/contexts/FloorDataContext';

const RoomDetails = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const { gender, selectedRoomName, students, correctForm } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [available, setAvailable] = useState(false);
  const [feedBack, setFeedBack] = useState<{ message: string; status: number } | null>(null);

  const { whitelist } = useWhitelist();
  const { floorData, refetch } = useFloorDataContext();
  const selectedRoom = floorData?.find((r) => r.name === selectedRoomName);

  const isAvailable = () => {
    if (!selectedRoom) {
      return false;
    }

    if (selectedRoom.studentsCount + students.length > 4) {
      return false;
    }
    if (gender !== selectedRoom?.gender && selectedRoom?.gender !== GENDER.NONE) {
      return false;
    }
    if (students.length < 2) {
      return false;
    }
    if (whitelist.length > 0) {
      const studentEmails = students.map((student) => student.email);
      const hasWhitelistedStudent = studentEmails.some((email) => whitelist.includes(email));
      return hasWhitelistedStudent;
    }
    return true;
  };

  const toggleRoomBlock = async () => {
    try {
      await fetch('/api/admin/blockRoom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName: selectedRoom?.name }),
      });
    } catch (error) {
      console.error('Error blocking/unblocking room:', error);
    } finally {
      refetch(); // Refresh floor data after blocking/unblocking
    }
  };

  useEffect(() => {
    setAvailable(isAvailable());
  }, [students, selectedRoom, gender, whitelist]);

  const getGenderCaption = () => {
    switch (selectedRoom?.gender) {
      case GENDER.MALE:
        return 'MUŽSKÁ';
      case GENDER.FEMALE:
        return 'ŽENSKÁ';
      default:
        return '';
    }
  };

  const balcony = hasBalcony(selectedRoom?.name);

  const reserveRoom = async () => {
    try {
      setIsLoading(true);
      const requestData = {
        gender: gender,
        roomName: selectedRoom?.name,
        students: [...students],
      };
      const response = await fetch('/api/reserveRoom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        setFeedBack(RESERVATIONRESPONSE.SUCCESS);
      } else {
        const errorData = await response.json();
        if (errorData.error === RESERVATIONRESPONSE.ALREADYUSED) {
          setFeedBack(RESERVATIONRESPONSE.ALREADYUSED);
        } else {
          setFeedBack(RESERVATIONRESPONSE.ERROR);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setFeedBack(RESERVATIONRESPONSE.ERROR);
      setIsLoading(false);
    } finally {
      refetch();
    }
  };

  const getButtonLabel = () => {
    if (selectedRoom?.isBlocked) {
      return 'Zablokované';
    }

    if (!correctForm || students.length < 2 || gender === GENDER.NONE) {
      return 'Vyplňte formulár';
    }
    if (!available) {
      if (whitelist.length > 0) {
        return 'Nepovolené';
      }
      return 'Obsadené';
    }
    return 'Rezervovať';
  };

  if (!selectedRoom) return null;

  return (
    <section className="relative flex h-[35vh] w-full flex-col bg-slate-200">
      {/* Tab-like header */}
      <header className="flex h-[5vh] w-full flex-row items-center justify-center bg-form text-slate-200">
        <h2 className="font-tektur text-2xl font-bold tracking-wide">IZBA {selectedRoom.name}</h2>
        {isAdmin && (
          <button onClick={toggleRoomBlock} className="absolute right-5 cursor-pointer text-xl">
            <FontAwesomeIcon icon={selectedRoom?.isBlocked ? faLock : faUnlock} />
          </button>
        )}
      </header>

      {/* Room details grid */}
      <div className="flex flex-1 flex-col justify-center gap-4 px-6 py-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="pr-4 text-right font-fira-sans text-lg font-semibold text-form">
            BALKÓN:
          </div>
          <div className="font-fira-sans text-lg font-semibold text-form">
            {balcony ? 'ÁNO' : 'NIE'}
          </div>
          <div className="pr-4 text-right font-fira-sans text-lg font-semibold text-form">
            IZBA:
          </div>
          <div className="font-fira-sans text-lg font-semibold text-form">{getGenderCaption()}</div>
          <div className="pr-4 text-right font-fira-sans text-lg font-semibold text-form">
            MIESTA:
          </div>
          <div className="font-fira-sans text-lg font-semibold text-form">
            {4 - selectedRoom.studentsCount}
          </div>
        </div>
      </div>

      {/* Action button and feedback */}
      <div className="mb-6 flex w-full flex-col items-center">
        <Button
          label={getButtonLabel()}
          icon={faBook}
          loading={isLoading}
          action={
            correctForm && available && !selectedRoom?.isBlocked
              ? reserveRoom
              : () => console.log('Form Error')
          }
          border={
            correctForm && available && !selectedRoom?.isBlocked
              ? BUTTONBORDER.BLACK
              : BUTTONBORDER.ERROR
          }
          black
        />
        {feedBack === RESERVATIONRESPONSE.SUCCESS && (
          <h2 className="mt-2 text-center font-fira-sans text-sm font-semibold text-green-500">
            REZERVÁCIA ÚSPEŠNÁ
          </h2>
        )}
        {feedBack === RESERVATIONRESPONSE.ERROR && (
          <h2 className="mt-2 text-center font-fira-sans text-sm font-semibold text-red-500">
            REZERVÁCIA NEÚSPEŠNÁ
          </h2>
        )}
        {feedBack === RESERVATIONRESPONSE.ALREADYUSED && (
          <h2 className="mt-2 text-center font-fira-sans text-sm font-semibold text-red-500">
            ŠTUDENT UŽ JE REGISTROVANÝ
          </h2>
        )}
      </div>
    </section>
  );
};

export default RoomDetails;
