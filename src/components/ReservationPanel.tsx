import RoomDetails from './RoomDetails';
import { StudentForm } from './StudentForm';

export const ReservationPanel = () => {
  return (
    <article className="mx-auto mb-5 mt-10 flex w-[90%] flex-col gap-4 lg:w-[90%] lg:flex-row">
      <StudentForm />
      <RoomDetails />
    </article>
  );
};
