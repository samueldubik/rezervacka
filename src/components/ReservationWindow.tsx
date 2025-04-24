import { useContext } from 'react';
import RoomDetails from './RoomDetails';
import StudentForm from './StudentForm';
import GlobalContext from '../../GlobalContext';
import FloorLayout from './FloorLayout';

const ReservationWindow = ({ isAdmin = false }) => {
  const { formsVisible, selectedRoom } = useContext(GlobalContext);

  return (
    <article className="flex h-[80vh] w-full flex-row bg-stone-200">
      {formsVisible && <StudentForm />}

      <section className={`w-[60vw] ${!formsVisible && 'ml-[20vw]'} `}>
        <div className="flex h-[90%] w-full flex-row justify-start">
          <FloorLayout isAdmin={isAdmin} />
        </div>
      </section>

      <RoomDetails data={selectedRoom} />
    </article>
  );
};

export default ReservationWindow;
