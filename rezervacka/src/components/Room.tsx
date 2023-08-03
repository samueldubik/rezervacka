import { EnumDeclaration } from "typescript"
import { ROOMTYPE } from "../../Const"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { IRoomData } from "./FloorLayout"
import { Dispatch, SetStateAction, useContext } from "react"
import GlobalContext from "../../GlobalContext"

type Props = {
    ROOMTYPE: ROOMTYPE
    balcony?: boolean
    data?: IRoomData
    selectedFloor?: number
    setSelectedFloor?: Dispatch<SetStateAction<number>>
} 

const Room = ({ROOMTYPE, balcony = false, data, selectedFloor, setSelectedFloor}: Props) => {
    
    const context = useContext(GlobalContext)
    const {setSelectedRoom} = context

    const selectRoom = () => {
        if(data)
            setSelectedRoom(data)
    }

    const floorUp = () => {
        
        if(selectedFloor && setSelectedFloor)
            if(selectedFloor < 7)
                setSelectedFloor(prev => {
                return prev + 1
                })
            
    }

    const floorDown = () => {
        if(selectedFloor && setSelectedFloor)
            if(selectedFloor > 1)
                setSelectedFloor(prev => {
                    return prev - 1
                })
    }


    switch(ROOMTYPE) {
        case 0 : return (
            
            <div
            onClick={selectRoom}
            className=" cursor-pointer bg-[#6FD08C] w-[13%] h-[100%] border-collapse border-solid border-2 border-stone-600 flex justify-center items-center relative"
            >
                <h5 className=" font-tektur text-2xl z-30">{data?.room}</h5>

                {balcony && 
                    <h6 className=' absolute bottom-[35%] opacity-40 text-red-600 left-0 font-nav-name text-2xl -rotate-45'>BALKÓN</h6>
                }
            </div>
        )

        case 1 : return (
            <div className=" cursor-pointer bg-stone-400 w-[22%] h-[100%] border-stone-600 border-solid border-collapse border-2 flex justify-center items-center">
                <h1>KUCHYNKA</h1>
            </div>
        )

        case 2 : return (
            <div className="bg-[#A2C3A4] w-[22%] h-[100%] border-stone-600 border-collapse border-solid border-2 flex flex-col items-center">

                <FontAwesomeIcon
                onClick={floorUp}
                icon={faCaretUp}
                className=" cursor-pointer h-1/2 w-full border-b-2 border-stone-600"
                />

                <FontAwesomeIcon 
                onClick={floorDown}
                icon={faCaretDown} 
                className=" cursor-pointer h-1/2 w-full"
                />
            </div>
        )

    }
}

export default Room