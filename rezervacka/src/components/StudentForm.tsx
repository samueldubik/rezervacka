import { useContext, useEffect, useState } from "react";
import Student from "./Student";
import Button from "./Button";
import { faBan, faCheck, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import GlobalContext, { IStudent } from "../../GlobalContext";
import { GENDER, VALIDATION } from "../../Const";
import GenderSelector from "./GenderSelector";


const StudentForm = () => {

    const context = useContext(GlobalContext)
    const {students, setStudents} = context
    const [studentsForm, setStudentsForm] = useState<IStudent[]>([])
    const [genderLocal, setGenderLocal] = useState<GENDER>(GENDER.NONE)

    useEffect(() => {
        setStudentsForm(students)
    },[])

    const addStudent = () => {
        console.log('Add Student')

        if( studentsForm.length < 4)
            setStudentsForm(prev => {
                prev.push({name: '', email: ''})
                return [...prev]
            })
    }

    const destroyForm = (index: number) => {
        setStudentsForm(prev => {
            const updated = [...prev]
            updated.splice(index, 1)
            return [...updated]
        })
    }

    const validateForms = () => {
        console.log(studentsForm)
        return VALIDATION.SUCCESS
    }

    const confirmForms = () => {
        const result = validateForms()


        console.log(result)
        /*
        0 - SUCCESS
        1 - LESS THAN 2 STUDENTS
        2 - NAME MISSING
        3 - EMAIL MISSING
        4 - WRONG FORMAT OF NAME
        5 - WRONG FORMAT OF EMAIL
        6 - USER DIDN'T USE STUDENT MAIL
        7 - NO GENDER SELECTED
        */


        setStudents(studentsForm)
    }

    const cancelAll = () => {
        setStudents([])
        setStudentsForm([])
    }


    return (
        <div className=" bg-[#1C5464] absolute top-[10vh] h-[80vh] w-[20%] pb-10">

            <section className=" overflow-auto snap-y snap-proximity h-[35vh]">
            {studentsForm.map((item, index) => {
                return <Student 
                        key={index} 
                        index={index} 
                        studentsForm={studentsForm} 
                        setStudentsForm={setStudentsForm} 
                        destroyForm={destroyForm}
                        />
            })}
            </section>

            

            <section className=" absolute h-[50vh] flex flex-col justify-center bottom-0 w-full">
                <GenderSelector/>
                <Button label="Pridať" icon={faUserPlus} action={addStudent}/>
                <Button label="Potvrdiť" icon={faCheck} action={confirmForms}/>
                <Button label="Zrušiť" icon={faBan} action={cancelAll}/>
            </section>
        </div>
    )
}

export default StudentForm;