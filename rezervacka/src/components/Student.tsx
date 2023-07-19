import { faCircleXmark, faRectangleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Student = () => {
    return (
        <form className=" h-[25vh] pt-2.5 flex flex-col pl-2 pr-5 border-b-8 border-stone-200 shadow-lg relative">
            <label className=" font-fira-sans text-stone-200 text-lg mt-2">Meno a Priezvisko</label>
            <input className=" font-fira-sans font-normal px-1 rounded-md bg-stone-200 " type="text" />

            <label className=" font-fira-sans text-stone-200 text-lg mt-2">Študentský email</label>
            <input className=" font-fira-sans font-normal px-1 rounded-md bg-stone-200" type="text" />

            <FontAwesomeIcon icon={faRectangleXmark} className=" absolute top-0 right-0 h-8 text-red-600"/>
        </form>
    )
}

export default Student