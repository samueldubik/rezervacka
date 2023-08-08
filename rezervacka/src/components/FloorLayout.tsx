import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { GENDER, ROOMTYPE } from "../../Const"
import Room from "./Room"
import GlobalContext from "../../GlobalContext"

export interface IRoomData {
    room: string,
    gender: GENDER,
    students: number
}

type Props = { 
    selectedFloor : number
    setSelectedFloor : Dispatch<SetStateAction<number>>
}


const FloorLayout = ({selectedFloor, setSelectedFloor}: Props) => {


    const context = useContext(GlobalContext)

    const { floorData } = context

    if(floorData)
        return (
            <section className=" w-[80%] h-[55%] mt-5 mx-auto flex flex-col justify-between">
                
                <div className=" w-full h-[40%] flex flex-row border-8 border-stone-800 border-r-0">
                    <Room roomType={ROOMTYPE.ROOM} index={9}/>
                    <Room roomType={ROOMTYPE.ROOM} index={8} balcony={true}/>
                    <Room roomType={ROOMTYPE.ROOM} index={7}/>

                    <Room roomType={ROOMTYPE.KITCHEN}/>

                    <Room roomType={ROOMTYPE.ROOM} index={5}/>
                    <Room roomType={ROOMTYPE.ROOM} index={4} balcony={true}/>
                    <Room roomType={ROOMTYPE.ROOM} index={3}/>
                </div>
                

                <div className=" w-full h-[40%] flex flex-row border-8 border-stone-800 border-r-0">
                    <Room roomType={ROOMTYPE.ROOM} index={10}/>
                    <Room roomType={ROOMTYPE.ROOM} index={11} balcony={true}/>
                    <Room roomType={ROOMTYPE.ROOM} index={12}/>

                    <Room roomType={ROOMTYPE.ELEVATOR} selectedFloor={selectedFloor} setSelectedFloor={setSelectedFloor}/>

                    <Room roomType={ROOMTYPE.ROOM} index={0}/>
                    <Room roomType={ROOMTYPE.ROOM} index={1} balcony={true}/>
                    <Room roomType={ROOMTYPE.ROOM} index={2}/>
                </div>
            </section> 
        )
}

export default FloorLayout