import { faCircleXmark, faRectangleXmark, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IStudent } from "../../GlobalContext"
import { Dispatch, SetStateAction } from "react"

type Props = {
    index: number,
    studentsForm: IStudent[],
    setStudentsForm: Dispatch<SetStateAction<IStudent[]>>,
    destroyForm: (index: number) => void
}


const Student = ({index, studentsForm, setStudentsForm, destroyForm}: Props) => {


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
        <form className=" h-[35vh] snap-center border-b-8 border-stone-200 pt-4 flex flex-col pl-5 pr-5 relative">

            <div className=" h-[5vh] w-full flex flex-row items-center">
                <FontAwesomeIcon icon={faUser} className=" h-7 w-8 text-stone-200"/>
                <h2 className=" text-xl ml-4 font-fira-sans mt-1 font-bold text-stone-200">Študent {index + 1}</h2>
            </div>

            <label className=" font-fira-sans font-medium text-stone-200 text-lg mt-4">Meno a Priezvisko</label>
            <input 
            spellCheck={false}
            value={studentsForm[index].name}
            onChange={(event) => HandleChangeName(event.target.value)}
            className=" font-fira-sans h-12  px-1 border-8 border-stone-200 bg-form text-stone-200 font-semibold " type="text" 
            />

            <label className=" font-fira-sans font-medium text-stone-200 text-lg mt-4">Študentský email</label>
            <input
            spellCheck={false} 
            value={studentsForm[index].email}
            onChange={(event) => HandleChangeEmail(event.target.value)}
            className=" font-fira-sans h-12 px-1 border-8 border-stone-200 bg-form text-stone-200 font-semibold" type="text" 
            />

            <div 
            className=" absolute top-1 right-1 w-12 h-8 bg-gray-400 border-t-4 border-t-stone-200
                        border-l-4 border-l-stone-100 border-b-4 border-b-stone-600 border-r-4 border-r-stone-600 
                        text-xl text-center font-tektur font-extrabold text-stone-800
                        hover:cursor-pointer hover:bg-red-600"
            onClick={() => destroyForm(index)}  
                >
            <h2>X</h2>
            </div>
        </form>
    )
}

export default Student