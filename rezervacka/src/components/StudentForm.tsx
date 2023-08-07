import { useContext, useEffect, useState } from "react";
import Student from "./Student";
import Button from "./Button";
import { faBan, faCheck, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import GlobalContext, { IStudent } from "../../GlobalContext";
import { BUTTONBORDER, BUTTONTYPE, GENDER, VALIDATION } from "../../Const";
import GenderSelector from "./GenderSelector";

export interface IValidation {
    status: VALIDATION,
    index: number
}


const StudentForm = () => {


    

    const context = useContext(GlobalContext)
    const {students, setStudents} = context
    const [studentsForm, setStudentsForm] = useState<IStudent[]>([])
    const [noGenderError, setNoGenderError] = useState<boolean>(false)
    const [lessThan2Error, setLessThan2Error] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(true)
    const [validation, setValidation] = useState<IValidation[][]>([])


    
    const { gender, correctForm, setCorrectForm }  = context

    useEffect(() => {
        setStudentsForm(students)
        if(students.length < 1)
            addStudent()
    },[])

    const addStudent = () => {
        //console.log('Add Student')

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

    const isStudentEmailValid = (email: string) => {
        const emailRegex = /^[^@]+(\.[^@]+)?@student\.tuke\.sk$/;
        return emailRegex.test(email);
      }

    const isErrorFound = (result: IValidation[] ,status: VALIDATION) => {
        return (result.some((obj) => {
            return obj.status === status
        }))
    }

    const assignStudentErrors = (result: IValidation[]) => {
        const arr = []
        for(let i = 0; i < studentsForm.length; i++){
            arr.push(result.filter((obj) => {
                return obj.index === i
            }))
        }

        //console.log(arr)
        return arr
    }



    const validateForms = () => {

        const arr : IValidation[] = []

        for(let i = 0; i < studentsForm.length; i++){
    
            if(!studentsForm[i].name)
                arr.push({status: VALIDATION.NONAME, index: i})
            else if(!studentsForm[i].name.includes(' '))
                arr.push({status: VALIDATION.NAMEWRONG, index: i})


            if(!studentsForm[i].email)
                arr.push({status: VALIDATION.NOEMAIL, index: i})
            else if(!isStudentEmailValid(studentsForm[i].email))
                arr.push({status: VALIDATION.EMAILNOTUKE, index: i})

        }
        
        if(studentsForm.length < 2)
            arr.push({status: VALIDATION.LESSTHAN2, index: -1})

        if(!gender)
            arr.push({status: VALIDATION.NOGENDER, index: -1})

        
        if(arr.length > 1)
            return arr

        return [{status: VALIDATION.SUCCESS, index: -1}]
    }

    const confirmForms = () => {
        const result = validateForms()
        setValidation(assignStudentErrors(result))

        //console.log(result)

        //NOGENDER
        if(isErrorFound(result, VALIDATION.NOGENDER))
            setNoGenderError(true)
        else
            setNoGenderError(false)


        //LESSTHAN2
        if(isErrorFound(result, VALIDATION.LESSTHAN2))
            setLessThan2Error(true)
        else
            setLessThan2Error(false)

        
        //ALL GOOD
        if(isErrorFound(result, VALIDATION.SUCCESS))
            setCorrectForm(true)
        else
            setCorrectForm(false)

        

        setStudents(studentsForm)
    }

    const cancelAll = () => {
        setStudents([])
        setStudentsForm([])
    }


    return (
        <div className=" bg-[#1C5464] absolute top-[10vh] h-[80vh] w-[20%] pb-10">

            <section className=" overflow-y-auto overflow-x-hidden snap-y snap-proximity h-[35vh]">
            {studentsForm.map((item, index) => {
                return <Student 
                        key={index} 
                        index={index} 
                        studentsForm={studentsForm} 
                        setStudentsForm={setStudentsForm} 
                        destroyForm={destroyForm} 
                        error={validation[index]}
                        />
            })}
            </section>

            

            <section className=" absolute h-[50vh] flex flex-col justify-center bottom-0 w-full">
                <GenderSelector border={noGenderError ? BUTTONBORDER.ERROR : BUTTONBORDER.WHITE}/>

                {noGenderError && 
                <h3 className=" w-full text-center -mb-5 text-[#ff3535] font-fira-sans font-medium">
                    Vyberte pohlavie
                </h3>
                }

                <Button 
                type={BUTTONTYPE.ADD} 
                label="Pridať" icon={faUserPlus} 
                action={addStudent} 
                border={lessThan2Error ? BUTTONBORDER.ERROR : BUTTONBORDER.WHITE}/>

                {lessThan2Error && 
                <h3 className=" w-full text-center -mb-5 text-[#ff3535] font-fira-sans font-medium">
                    Málo študentov
                </h3>
                }

                <Button 
                type={BUTTONTYPE.SUCCESS} 
                label="Potvrdiť" 
                icon={faCheck} 
                action={confirmForms} 
                border={correctForm ? BUTTONBORDER.WHITE : BUTTONBORDER.ERROR}
                />
                
                {!(lessThan2Error || noGenderError) && !correctForm && 
                <h3 className=" w-full text-center -mb-5 text-[#ff3535] font-fira-sans font-medium">
                    Nesprávne vyplnený formulár
                </h3>
                }

                <Button 
                type={BUTTONTYPE.ERROR} 
                label="Zrušiť" 
                icon={faBan} 
                action={cancelAll} 
                border={BUTTONBORDER.WHITE}
                />
            </section>
        </div>
    )
}

export default StudentForm;