import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { GENDER, ROOMTYPE } from "../../Const"
import Room from "./Room"

export interface IRoomData {
    room: string,
    gender: GENDER,
    students: number
}

type Props = { 
    floorData : IRoomData[] | undefined
    setFloorData : Dispatch<SetStateAction<IRoomData[] | undefined>>
    selectedFloor : number
    setSelectedFloor : Dispatch<SetStateAction<number>>
}


const FloorLayout = ({floorData, setFloorData, selectedFloor, setSelectedFloor}: Props) => {


    // Idea
    const rooms = [
        {
            roomType: ROOMTYPE.ROOM,
            data: {}, //floorData[9],
            balcony: false
        },
        // ...
    ];
    // Idea 2 - use grid template cols

    if(floorData)
        return (
            <section className=" w-[50%] h-[50%] mt-5 mx-auto flex flex-col justify-between">
                
                <div className=" w-full h-[40%] flex flex-row border-8 border-stone-800 border-r-0">
                    <Room roomType={ROOMTYPE.ROOM} data={floorData[9]} />
                    <Room roomType={ROOMTYPE.ROOM} balcony={true} data={floorData[8]}/>
                    <Room roomType={ROOMTYPE.ROOM} data={floorData[7]}/>

                    <Room roomType={ROOMTYPE.KITCHEN}/>

                    <Room roomType={ROOMTYPE.ROOM} data={floorData[4]}/>
                    <Room roomType={ROOMTYPE.ROOM} balcony={true} data={floorData[3]}/>
                    <Room roomType={ROOMTYPE.ROOM} data={floorData[2]}/>
                </div>
                

                <div className=" w-full h-[40%] flex flex-row border-8 border-stone-800 border-r-0">
                    <Room roomType={ROOMTYPE.ROOM} data={floorData[10]}/>
                    <Room roomType={ROOMTYPE.ROOM} balcony={true} data={floorData[11]}/>
                    <Room roomType={ROOMTYPE.ROOM} data={floorData[12]}/>

                    <Room roomType={ROOMTYPE.ELEVATOR} selectedFloor={selectedFloor} setSelectedFloor={setSelectedFloor}/>

                    <Room roomType={ROOMTYPE.ROOM} data={floorData[0]}/>
                    <Room roomType={ROOMTYPE.ROOM} balcony={true} data={floorData[1]}/>
                    <Room roomType={ROOMTYPE.ROOM} data={floorData[2]}/>
                </div>
            </section> 
        )
}

export default FloorLayout