import { GENDER, Student } from '@prisma/client';
import GenderSelector from './GenderSelector';
import { BUTTONBORDER, BUTTONTYPE } from '../../Types';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { StudentFormValues } from './StudentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Button from './Button';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

export type StudentOverviewProps = {
  students: Student[];
  border: BUTTONBORDER;
  value: GENDER;
  onChange: (value: GENDER) => void;
  control: Control<StudentFormValues, any, StudentFormValues> | undefined; // Assuming control is passed from a parent component
  errors: FieldErrors<StudentFormValues>;
  handleAddStudent: () => void; // Function to handle adding a student
};

export const StudentOverview: React.FC<StudentOverviewProps> = ({
  students,
  border,
  value,
  onChange,
  control,
  errors,
  handleAddStudent,
}) => {
  return (
    <section className="mt-5 flex w-full flex-col items-center">
      <h1 className="text-2xl font-bold text-form">Prehľad študentov</h1>
      <div className="mt-5 flex w-[90%] flex-col items-center justify-center">
        <Controller
          control={control}
          name="gender"
          rules={{
            validate: (value) => value !== GENDER.NONE || 'Vyberte pohlavie',
          }}
          render={({ field }) => (
            <GenderSelector
              {...field}
              border={errors.gender ? BUTTONBORDER.ERROR : BUTTONBORDER.WHITE}
            />
          )}
        />
      </div>
      <div className="mt-5 flex w-[90%] flex-col justify-start">
        {students.map((student, index) =>
          student.name && student.email ? (
            <div key={index} className="mb-2 flex w-full items-center gap-4 rounded px-4">
              <FontAwesomeIcon
                icon={faUser}
                className={` ${border === BUTTONBORDER.ERROR ? 'text-red-600' : 'text-dark'}`}
              />
              <p className="w-[50%] text-left font-fira-sans font-semibold text-dark">
                {student.name}
              </p>
              <p className="text-start font-fira-sans font-medium text-dark">{student.email}</p>
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
    </section>
  );
};
