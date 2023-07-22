import { EnumDeclaration } from "typescript"
import { ROOMTYPE } from "../../Const"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"

type Props = {
    ROOMTYPE: ROOMTYPE
} 

const Room = ({ROOMTYPE}: Props) => {
    
    switch(ROOMTYPE) {
        case 0 : return (
            <div className=" bg-[#6FD08C] w-[13%] h-[100%] border-collapse border-solid border-2 border-stone-600 flex justify-center items-center">
                <h5 className=" font-tektur text-2xl">C000</h5>
            </div>
        )

        case 1 : return (
            <div className="bg-stone-400 w-[22%] h-[100%] border-stone-600 border-solid border-collapse border-2 flex justify-center items-center">
                <h1>KUCHYNKA</h1>
            </div>
        )

        case 2 : return (
            <div className="bg-[#A2C3A4] w-[22%] h-[100%] border-stone-600 border-collapse border-solid border-2 flex flex-col items-center">
                <FontAwesomeIcon icon={faCaretUp} className=" h-1/2 w-full border-b-2 border-stone-600"/>
                <FontAwesomeIcon icon={faCaretDown} className=" h-1/2 w-full"/>
            </div>
        )

    }
}

export default Room