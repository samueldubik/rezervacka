import { GENDER } from '@prisma/client';
import GlobalContext, { IStudent } from '../../GlobalContext';
import { Controller, set, useFieldArray, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { BUTTONBORDER, BUTTONTYPE } from '../../Types';
import { faBan, faCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import GenderSelector from './GenderSelector';
import Student from './Student';

type StudentFormValues = {
  students: { name: string; email: string }[];
  gender: GENDER;
};

const StudentForm = () => {
  const { setStudents } = useContext(GlobalContext);

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
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'students',
  });

  const onSubmit = (data: StudentFormValues) => {
    console.log('Form Submitted: ', data);
    setStudents(data.students);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-[1vh] h-[79vh] w-[20vw] bg-[#1C5464]">
      <section className="h-[35vh] snap-y snap-proximity overflow-y-auto overflow-x-hidden">
        {fields.map((field, index) => (
          <Student
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
          rules={{ required: 'Vyberte pohlavie' }}
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
          action={() => append({ name: '', email: '' })}
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
