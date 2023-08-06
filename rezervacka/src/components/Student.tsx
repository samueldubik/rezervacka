import { faCircleXmark, faRectangleXmark, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IStudent } from "../../GlobalContext"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { VALIDATION } from "../../Const"
import { IValidation } from "./StudentForm"

type Props = {
    index: number,
    studentsForm: IStudent[],
    setStudentsForm: Dispatch<SetStateAction<IStudent[]>>,
    destroyForm: (index: number) => void
    error?: IValidation[]
}


const Student = ({index, studentsForm, setStudentsForm, destroyForm, error}: Props) => {

    const [noNameError, setNoNameError] = useState<boolean>(false)
    const [noEmailError, setNoEmailError] = useState<boolean>(false)
    const [nameWrongError, setNameWrongError] = useState<boolean>(false)
    const [emailWrongError, setEmailWrongError] = useState<boolean>(false)

    useEffect(() => {
        setErrors()
    })

    const isError = (status: VALIDATION) => {
        if(error)
            return (error.some((obj) => {
                return obj.status === status
            }))
        
        return false
    }

    const setErrors = () => {
        setNoNameError(isError(VALIDATION.NONAME))
        setNoEmailError(isError(VALIDATION.NOEMAIL))
        setNameWrongError(isError(VALIDATION.NAMEWRONG))
        setEmailWrongError(isError(VALIDATION.EMAILNOTUKE))
    }


    const HandleChangeName = (input: string) => {
        setStudentsForm(prev => {
            prev[index].name = input
            return [...prev]
        })
    }

    const HandleChangeEmail = (input: string) => {
        setStudentsForm(prev => {
            prev[index].email = input
            return [...prev]
        })
    }

    return (
        <form className=" h-[35vh] w-full snap-center border-b-8 border-stone-200 flex flex-col relative">

            <header className=" h-[6vh] w-full bg-[#174450] flex flex-row justify-between items-center">
                
                <section className=" h-full w-[25%] flex flex-row justify-center items-center">
                    <FontAwesomeIcon icon={faUser} className= " text-stone-200 h-[75%]"/>
                </section>

                <section className=" w-[50%] h-full flex flex-col justify-center ">
                    <h2 className=" text-center mt-1 text-xl font-fira-sans font-bold text-stone-200">Študent {index + 1}</h2>
                </section>
                
                <section 
                className=" w-[25%] h-full flex flex-row justify-center items-center"
                onClick={() => destroyForm(index)}  
                >
                    <div className=" bg-gray-400 h-[75%] w-[75%] flex flex-col justify-center border-4 border-t-stone-200 border-l-stone-200 border-b-stone-600 border-r-stone-600 cursor-pointer hover:bg-red-600 ">
                        <h2 className=" w-full mt-0.5 text-center text-xl text-stone-800 font-fira-sans font-extrabold ">X</h2>
                    </div>
                </section>
            </header>

            <article className=" w-full h-full flex flex-col mt-1 ">
                <label className={`font-fira-sans font-medium ${(noNameError || nameWrongError) ?'text-red-600' :'text-stone-200'} w-[90%] mx-[5%] text-lg `}>Meno a Priezvisko</label>
                <input 
                spellCheck={false}
                value={studentsForm[index].name}
                onChange={(event) => HandleChangeName(event.target.value)}
                className={` font-fira-sans h-12  px-1 border-8  ${(noNameError || nameWrongError) ?'border-red-600' :'border-stone-200'} bg-form text-stone-200 font-semibold w-[90%] mx-[5%]`} type="text" 
                />

                {noNameError && 
                <h3 className=" w-full text-center -mb-5 text-[#ff3535] font-fira-sans font-medium">
                    Zadajte meno
                </h3>
                }

                {nameWrongError && 
                <h3 className=" w-full text-center -mb-5 text-[#ff3535] font-fira-sans font-medium">
                    Nesprávny formát
                </h3>
                }

                <label className={` font-fira-sans font-medium ${(noEmailError || emailWrongError) ? 'text-red-600' : 'text-stone-200'} text-lg mt-4 w-[90%] mx-[5%]`}>Študentský email</label>
                <input
                spellCheck={false} 
                value={studentsForm[index].email}
                onChange={(event) => HandleChangeEmail(event.target.value)}
                className={` font-fira-sans h-12 px-1 border-8 ${(noEmailError || emailWrongError) ? 'border-red-600' : 'border-stone-200'} bg-form text-stone-200 font-semibold w-[90%] mx-[5%]`} type="text" 
                />
                
                {noEmailError && 
                <h3 className=" w-full text-center -mb-5 text-[#ff3535] font-fira-sans font-medium">
                    Zadajte email
                </h3>
                }

                {emailWrongError && 
                <h3 className=" w-full text-center -mb-5 text-[#ff3535] font-fira-sans font-medium">
                    Nesprávny formát
                </h3>
                }
            </article>


        </form>
    )
}

export default Student