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
            className=" w-[50%] h-full bg-blue-200 border-8 border-r-4 rounded-l-2xl flex justify-center items-center hover:cursor-pointer hover:bg-blue-400 "
            >
                <FontAwesomeIcon icon={faMars} className=" h-[75%] text-form"/>
            </div>

            <div 
            onClick={() => setGender(GENDER.FEMALE)}
            className=" w-[50%] h-full bg-red-200 border-8 border-l-4 rounded-r-2xl flex justify-center items-center hover:cursor-pointer hover:bg-red-400"
            >
                <FontAwesomeIcon icon={faVenus} className=" h-[75%] text-form"/>
            </div>
        </div>
    )
}

export default GenderSelector