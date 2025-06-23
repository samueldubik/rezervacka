import { useContext, useEffect, useState } from 'react';
import Button from './Button';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { BUTTONBORDER, RESERVATIONRESPONSE, RoomData } from '../../Types';
import { GENDER } from '@prisma/client';
import { useWhitelist } from '@/hooks/useWhitelist';
import { useGlobalContext } from '../../GlobalContext';

const RoomDetails = () => {
  const line = 'flex flex-row mx-auto w-[85%] shadow-lg border-4 border-stone-800 h-[6vh] mt-2';
  const label = 'font-fira-sans font-semibold text-form w-1/2 text-center pt-[1vh]';
  const value = 'font-fira-sans font-semibold text-form w-1/2 text-center pt-[1vh]';

  const { gender, selectedRoom, students, correctForm } = useGlobalContext();
  console.log('GENDER', gender);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [available, setAvailable] = useState<boolean>(false);
  const [feedBack, setFeedBack] = useState<{ message: string; status: number }>();

  // Fetch whitelist data
  const { whitelist } = useWhitelist();

  // Check if reservation is available
  const isAvailable = () => {
    if (!selectedRoom) {
      return false;
    }

    // Check student count
    if (selectedRoom.studentsCount + students.length > 4) {
      return false;
    }

    // Check gender
    console.log('gender: ', gender);
    console.log('selectedRoom?.gender: ', selectedRoom?.gender);
    if (gender !== selectedRoom?.gender && selectedRoom?.gender !== GENDER.NONE) {
      return false;
    }

    // Maybe this will be more complex in the future
    if (students.length < 2) {
      return false;
    }

    // Check whitelist
    if (whitelist.length > 0) {
      const studentEmails = students.map((student) => student.email);
      const hasWhitelistedStudent = studentEmails.some((email) => whitelist.includes(email));
      return hasWhitelistedStudent;
    }

    return true;
  };

  useEffect(() => {
    setAvailable(isAvailable());
  }, [students, selectedRoom, gender, whitelist]);

  // Determine if the selected room has a balcony
  const hasBalcony = () => {
    if (!selectedRoom?.name) return false;
    const balconyRooms = ['2', '5', '9', '12'];
    return balconyRooms.includes(selectedRoom.name.charAt(3));
  };

  // Get gender caption
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

  const balcony = hasBalcony();

  // Reserve room
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log('Reservation and gender update successful.');
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
      console.error('Error triggering API:', error);
      setIsLoading(false);
    }
  };

  const getButtonLabel = () => {
    if (!correctForm) return 'Chyba';
    if (!available) {
      if (whitelist.length > 0) {
        return 'Nepovolené';
      }
      return 'Obsadené';
    }
    return 'Rezervovať';
  };

  if (selectedRoom) {
    return (
      <div className="mt-[10vh] h-[50vh] w-[20vw] border-8 border-stone-800 shadow-lg">
        <h2 className="mb-5 mt-5 text-center font-tektur text-3xl font-bold">
          IZBA {selectedRoom?.name}
        </h2>

        <div className={line}>
          <h3 className={label}>BALKÓN:</h3>
          <h3 className={value}>{balcony ? 'ÁNO' : 'NIE'}</h3>
        </div>

        <div className={line}>
          <h3 className={label}>IZBA:</h3>
          <h3 className={value}>{getGenderCaption()}</h3>
        </div>

        <div className={line}>
          <h3 className={label}>MIESTA:</h3>
          <h3 className={value}>{4 - selectedRoom?.studentsCount}</h3>
        </div>

        <div className="mb-10 w-full">
          <Button
            label={getButtonLabel()}
            icon={faBook}
            loading={isLoading}
            action={correctForm && available ? reserveRoom : () => console.log('Form Error')}
            border={correctForm && available ? BUTTONBORDER.BLACK : BUTTONBORDER.ERROR}
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
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default RoomDetails;
