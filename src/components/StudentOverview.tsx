import { GENDER, Student } from '@prisma/client';
import GenderSelector from './GenderSelector';
import { BUTTONBORDER, BUTTONTYPE } from '../../Types';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { StudentFormValues } from './StudentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Button from './Button';
import { faCalendar, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { EtaModal } from './modals/EtaModal';
import { useState } from 'react';

export type StudentOverviewProps = {
  students: Student[];
  border: BUTTONBORDER;
  value: GENDER;
  onChange: (value: GENDER) => void;
  onSubmit: () => void; // <-- Add this line
  control: Control<StudentFormValues, any, StudentFormValues> | undefined;
  errors: FieldErrors<StudentFormValues>;
  handleAddStudent: () => void;
};

export const StudentOverview: React.FC<StudentOverviewProps> = ({
  students,
  border,
  control,
  onSubmit,
  errors,
  handleAddStudent,
}) => {
  const [isEtaModalOpen, setIsEtaModalOpen] = useState(false);

  const handleEtaPress = () => {
    setIsEtaModalOpen(true);
  };

  return (
    <section className="flex h-full w-full flex-col items-center">
      <h1 className="text-2xl font-bold text-form">Prehľad študentov</h1>
      <div className="mt-5 flex w-[90%] flex-col justify-start overflow-x-auto">
        {students.map((student, index) =>
          student.name && student.email ? (
            <div key={index} className="flex w-full items-center gap-2 rounded px-2">
              <FontAwesomeIcon
                icon={faUser}
                className={` ${border === BUTTONBORDER.ERROR ? 'text-red-600' : 'text-dark'}`}
              />
              <p className="w-[40%] text-left font-fira-sans font-semibold text-dark">
                {student.name}
              </p>
              <p className="w-[40%] text-start font-fira-sans font-medium text-dark">
                {student.email}
              </p>
            </div>
          ) : null,
        )}
        {students.length === 0 && (
          <div className="flex items-center justify-center">
            <Button
              type={BUTTONTYPE.SUCCESS}
              label="Pridať študentov"
              icon={faUserPlus}
              action={handleAddStudent}
              border={BUTTONBORDER.BLACK}
            />
          </div>
        )}
      </div>
      <div className="mt-5 flex w-[90%] flex-col items-center justify-center">
        <Controller
          control={control}
          name="gender"
          rules={{
            validate: (value) => value !== GENDER.NONE || 'Vyberte pohlavie',
          }}
          render={({ field }) => (
            <section className="flex w-full flex-row justify-center gap-2">
              {/* TODO: FINISH ETA */}
              {false && (
                <button
                  onClick={handleEtaPress}
                  className="flex flex-1 cursor-pointer flex-col items-center justify-start gap-2 border border-gray-300 p-2 shadow-xl"
                >
                  <h3 className="text-center font-quicksand font-bold text-dark">
                    Predpokladaný termín ubytovania
                  </h3>
                  <div className="flex flex-row items-center gap-2">
                    <FontAwesomeIcon icon={faCalendar} />
                    <h4>
                      {new Date().toLocaleString('sk-SK', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </h4>
                  </div>
                </button>
              )}
              <div className="mb-5 flex flex-1 flex-col items-center justify-start gap-2 border border-gray-300 p-2 shadow-xl">
                <h3 className="text-center font-quicksand font-bold text-dark">Vyberte pohlavie</h3>
                <GenderSelector
                  {...field}
                  border={errors.gender ? BUTTONBORDER.ERROR : BUTTONBORDER.WHITE}
                  onSubmit={onSubmit} // <-- Pass here
                />
              </div>
            </section>
          )}
        />
      </div>
      <EtaModal
        isOpen={isEtaModalOpen}
        onClose={() => setIsEtaModalOpen(false)}
        onSubmit={(eta) => console.log(eta)}
      />
    </section>
  );
};
