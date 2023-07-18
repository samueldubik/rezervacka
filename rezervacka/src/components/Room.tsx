import { EnumDeclaration } from "typescript"
import { roomType } from "../../Const"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"

type Props = {
    roomType: roomType
} 

const Room = ({roomType}: Props) => {
    
    switch(roomType) {
        case 0 : return (
            <div className="bg-red-600 w-[13%] h-[100%] border-black border-solid border-2 flex justify-center items-center">
                <h5 className=" font-tektur text-2xl">C000</h5>
            </div>
        )

        case 1 : return (
            <div className="bg-red-600 w-[22%] h-[100%] border-black border-solid border-2 flex justify-center items-center">
                <h1>KUCHYNKA</h1>
            </div>
        )

        case 2 : return (
            <div className="bg-red-600 w-[22%] h-[100%] border-black border-solid border-2 flex flex-col items-center">
                <FontAwesomeIcon icon={faCaretUp} className=" h-[50%] w-full border-solid border-2 border-black"/>
                <FontAwesomeIcon icon={faCaretDown} className=" h-[50%] w-full border-solid border-2 border-black"/>
            </div>
        )

    }
}

export default Room