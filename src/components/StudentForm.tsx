import { faUser, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GENDER, Student } from '@prisma/client';
import { set, useFieldArray, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import StudentField from './StudentField';
import { StudentOverview } from './StudentOverview';
import { BUTTONBORDER } from '../../Types';
import { useGlobalContext } from '@/app/contexts/GlobalContext';
import { useFloorDataContext } from '@/app/contexts/FloorDataContext';

export type StudentFormValues = {
  students: Student[];
  gender: GENDER;
};

export const StudentForm = () => {
  const { setStudents, setGender, setCorrectForm, isAdmin, selectedRoomName } = useGlobalContext();
  const { floorData } = useFloorDataContext();
  const [selectedField, setSelectedField] = useState(-1);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<StudentFormValues>({
    defaultValues: {
      students: [],
      gender: GENDER.NONE,
    },
    mode: 'onSubmit',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'students',
  });

  useEffect(() => {
    console.log('EFFECT TRIGGERED');
    console.log('isAdmin:', isAdmin);
    console.log('floorData:', floorData);

    if (!isAdmin || !floorData) {
      return;
    }

    console.log('Admin & data ok');

    const room = floorData.find((r) => r.name === selectedRoomName);

    console.log('Selected Room:', room);

    if (!room || !room.students || room.students.length === 0) {
      return;
    }
    console.log('Setting students from room:', room);

    setValue(
      'students',
      room.students.map((student) => ({
        id: student.id,
        name: student.name,
        email: student.email,
        roomName: student.roomName,
        arrivalId: student.arrivalId ?? null,
      })),
    );
  }, [isAdmin, selectedRoomName, floorData]);

  const onSubmit = (data: StudentFormValues) => {
    console.log('Form Submitted: ', data);
    setStudents(data.students);
    setGender(data.gender);
    setCorrectForm(isValid);
  };

  console.log('students: ', watch('students'));

  const handleAddStudent = () => {
    setSelectedField(watch('students').length);
    append({ id: Date.now(), name: '', email: '', roomName: '', arrivalId: null });
  };

  return (
    <section className="relative flex h-[35vh] w-full flex-col bg-slate-200 pb-10">
      <header className="flex flex-row">
        {/* Overview */}
        <div
          className={`flex h-[5vh] w-1/5 items-center justify-center ${selectedField === -1 ? 'bg-form text-slate-200' : 'bg-slate-200 text-form'}`}
          onClick={() => setSelectedField(-1)}
        >
          <FontAwesomeIcon icon={faUsers} />
        </div>
        {/* Students */}
        {watch('students').map((item, index) => (
          <div
            key={item.id}
            className={`flex h-[5vh] w-1/5 items-center justify-center ${selectedField === index ? 'bg-form text-slate-200' : 'bg-slate-200 text-form'}`}
            onClick={() => setSelectedField(index)}
          >
            <FontAwesomeIcon icon={faUser} />
          </div>
        ))}
        {/* Add Students Button */}
        {watch('students').length < 4 && (
          <div
            onClick={handleAddStudent}
            className="flex h-[5vh] w-1/5 cursor-pointer items-center justify-center bg-slate-300 text-form hover:bg-slate-400"
          >
            <FontAwesomeIcon icon={faUserPlus} />
          </div>
        )}
      </header>
      {selectedField === -1 ? (
        <StudentOverview
          students={watch('students')}
          border={BUTTONBORDER.BLACK}
          value={watch('gender')}
          onChange={(val) => setValue('gender', val)}
          control={control}
          errors={errors}
          handleAddStudent={handleAddStudent}
          onSubmit={handleSubmit(onSubmit)}
        />
      ) : (
        <StudentField
          setSelectedField={setSelectedField}
          key={fields[selectedField].id}
          index={selectedField}
          control={control}
          remove={() => {
            setSelectedField((prev) => prev - 1);
            remove(selectedField); // <-- Pass the correct index!
          }}
          errors={errors.students?.[selectedField] || {}}
          onSubmit={handleSubmit(onSubmit)}
        />
      )}
    </section>
  );
};
