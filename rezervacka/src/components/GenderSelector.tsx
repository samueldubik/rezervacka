import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import GlobalContext from "../../GlobalContext"
import { GENDER } from "../../Const"

const GenderSelector = () => {

    const context = useContext(GlobalContext)

    const  {gender, setGender} = context


    return (
        <div className=" mt-5 h-[7vh] mx-5 flex flex-row justify-start items-center shadow-lg ">
            <div 
            onClick={() => setGender(GENDER.MALE)}

            className={gender === GENDER.MALE ? 'w-[50%] h-full bg-[#3055e7] border-8 border-r-4 flex justify-center items-center' :`w-[50%] h-full bg-blue-200 border-8 border-r-4 flex justify-center items-center hover:cursor-pointer hover:bg-blue-400 ${GENDER.MALE ? 'bg-blue-300 hover' : ''}`}
            >
                <FontAwesomeIcon icon={faMars} className={gender === GENDER.MALE ? " h-[75%] text-stone-200" :" h-[75%] text-form"}/>
            </div>

            <div 
            onClick={() => setGender(GENDER.FEMALE)}
            className= {gender === GENDER.FEMALE ? "w-[50%] h-full bg-[#f93b3b] border-8 border-l-4 flex justify-center items-center" :" w-[50%] h-full bg-red-200 border-8 border-l-4 flex justify-center items-center hover:cursor-pointer hover:bg-red-400"}
            >
                <FontAwesomeIcon icon={faVenus} className={gender === GENDER.FEMALE ? " h-[75%] text-stone-200" : " h-[75%] text-form"}/>
            </div>
        </div>
    )
}

export default GenderSelector