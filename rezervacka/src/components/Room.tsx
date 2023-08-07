import { EnumDeclaration } from "typescript"
import { GENDER, ROOMTYPE } from "../../Const"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { IRoomData } from "./FloorLayout"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import GlobalContext from "../../GlobalContext"

type Props = {
    roomType: ROOMTYPE
    balcony?: boolean
    data?: IRoomData
    selectedFloor?: number
    setSelectedFloor?: Dispatch<SetStateAction<number>>
} 

const Room = ({roomType, balcony = false, data, selectedFloor, setSelectedFloor}: Props) => {
    
    const context = useContext(GlobalContext)
    const {selectedRoom, setSelectedRoom, students, gender} = context

    const [available, setAvailable] = useState<boolean>(false)

    const roomColorFalse = 'bg-[#ce4341]'
    const roomColorTrue = 'bg-[#37ba5e]'

    //console.log('Students:',students.length)
    //console.log('Data',data?.gender)
    

    useEffect(() => {
        setAvailable(isAvailable())
    })

    const isAvailable = () => {
        if(!data)
            return false

        if(data?.students + students.length > 4)
            return false

        if((gender && data?.gender) && (data?.gender !== gender))
            return false

        
        return true        
    }


    const countPeople = () => {

        const arr = []

        if(!data?.students)
            return []

        for(let i = 0; i < data.students; i++)
            arr.push(<div key={i} className={data?.gender === GENDER.FEMALE ? " h-[13px] w-[13px] bg-[#ff6b6b] border-2 border-stone-800 mx-1 " : " h-[13px] w-[13px] bg-[#45c7db] border-2 border-stone-800 mx-1 " }></div>)

        return arr
    }

    const people = countPeople()

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



    switch(roomType) {
        case ROOMTYPE.ROOM : return (
            
            <div
            onClick={selectRoom}
            className= {data === selectedRoom ? ` brightness-150 ${available ? roomColorTrue : roomColorFalse} w-[13%] h-[100%] border-r-8 border-collapse border-stone-800 flex justify-center items-center relative` : `cursor-pointer ${available ? roomColorTrue : roomColorFalse} w-[13%] h-[100%] border-r-8 border-collapse border-stone-800 flex justify-center items-center relative hover:brightness-150`}
            >
                <h5 className=" font-tektur font-bold text-2xl z-30">{data?.room}</h5>

                {balcony && 
                    <h6 className=' absolute top-3 opacity-80 text-sm  font-tekur font-semibold'>BALKÓN</h6>
                }
                <div className=' w-full absolute bottom-4 flex flex-row justify-center'>
                {people}
                </div>
            </div>
            
        )

        case ROOMTYPE.KITCHEN : return (
            <div className=" cursor-pointer bg-stone-400 w-[22%] h-[100%] border-stone-800 border-collapse border-r-8 flex justify-center items-center">
                <h1 className=" font-tektur font-semibold text-xl">KUCHYNKA</h1>
            </div>
        )

        case ROOMTYPE.ELEVATOR : return (
            <div className=" w-[22%] h-[100%] border-stone-800 border-collapse border-r-8 flex flex-col relative">

                <FontAwesomeIcon
                onClick={floorUp}
                icon={faCaretUp}
                className=" cursor-pointer h-1/2 bg-[#A2C3A4]   border-stone-800 w-full hover:brightness-125 "
                />
                
                <div className=' absolute w-full bg-stone-800 top-[48%] h-[8px] z-20 '></div>

                <FontAwesomeIcon 
                onClick={floorDown}
                icon={faCaretDown} 
                className=" cursor-pointer bg-[#A2C3A4] h-1/2 w-full border-stone-800 hover:brightness-125"
                />
            </div>
        )

    }
}

export default Room