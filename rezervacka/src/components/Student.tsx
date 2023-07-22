import { faCircleXmark, faRectangleXmark } from "@fortawesome/free-solid-svg-icons"
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
        <form className=" h-[25vh] pt-2.5 flex flex-col pl-2 pr-5 border-b-8 border-stone-200 relative">
            <label className=" font-fira-sans text-stone-200 text-lg mt-2">Meno a Priezvisko</label>
            <input 
            value={studentsForm[index].name}
            onChange={(event) => HandleChangeName(event.target.value)}
            className=" font-fira-sans font-normal px-1 rounded-md bg-stone-200 " type="text" 
            />

            <label className=" font-fira-sans text-stone-200 text-lg mt-2">Študentský email</label>
            <input 
            value={studentsForm[index].email}
            onChange={(event) => HandleChangeEmail(event.target.value)}
            className=" font-fira-sans font-normal px-1 rounded-md bg-stone-200" type="text" 
            />

            <h2 
            className=" absolute top-0 right-0 w-10 h-7 bg-[#de2929] 
                        text-center text-xl font-fira-sans text-stone-200
                        hover:cursor-pointer"
            onClick={() => destroyForm(index)}
            >
                X
            </h2>
        </form>
    )
}

export default Student