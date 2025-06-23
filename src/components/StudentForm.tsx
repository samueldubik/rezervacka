import { GENDER, Student } from '@prisma/client';
import { useGlobalContext } from '../../GlobalContext';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { BUTTONBORDER, BUTTONTYPE } from '../../Types';
import { faBan, faCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import GenderSelector from './GenderSelector';
import StudentField from './StudentField';

type StudentFormValues = {
  students: Student[];
  gender: GENDER;
};

const StudentForm = () => {
  const { setStudents, setGender } = useGlobalContext();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<StudentFormValues>({
    defaultValues: {
      students: [{ name: '', email: '' }],
      gender: GENDER.NONE,
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'students',
  });

  const onSubmit = (data: StudentFormValues) => {
    console.log('Form Submitted: ', data);
    setStudents(data.students);
    setGender(data.gender);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onMouseLeave={handleSubmit(onSubmit)}
      className="mt-[1vh] h-[79vh] w-[20vw] bg-[#1C5464]"
    >
      <section className="h-[35vh] snap-y snap-proximity overflow-y-auto overflow-x-hidden">
        {fields.map((field, index) => (
          <StudentField
            key={field.id}
            index={index}
            control={control}
            remove={remove}
            errors={errors.students?.[index] || {}}
          />
        ))}
      </section>

      <section className="flex h-[45vh] w-full flex-col justify-center">
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
        {errors.gender && (
          <h3 className="-mb-5 w-full text-center font-fira-sans font-medium text-[#ff3535]">
            {errors.gender.message}
          </h3>
        )}

        <Button
          type={BUTTONTYPE.ADD}
          label="Pridať"
          icon={faUserPlus}
          action={() => append({ id: Date.now(), name: '', email: '', roomName: '' })}
          border={BUTTONBORDER.WHITE}
        />

        <Button
          type={BUTTONTYPE.SUCCESS}
          label="Skontrolovať"
          icon={faCheck}
          action={handleSubmit(onSubmit)}
          border={isValid ? BUTTONBORDER.WHITE : BUTTONBORDER.ERROR}
        />

        <Button
          type={BUTTONTYPE.ERROR}
          label="Zrušiť"
          icon={faBan}
          action={() => {
            setValue('students', []);
            setValue('gender', GENDER.NONE);
          }}
          border={BUTTONBORDER.WHITE}
        />
      </section>
    </form>
  );
};

export default StudentForm;
