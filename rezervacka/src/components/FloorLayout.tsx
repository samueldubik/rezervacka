import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { GENDER, ROOMTYPE } from "../../Const"
import Room from "./Room"

export interface IRoomData {
    room: string,
    gender: GENDER,
    students: number
}




const FloorLayout = () => {

    const [floorData, setFloorData] =  useState<undefined | Array<IRoomData>>()
    const [selectedFloor, setSelectedFloor] = useState<number>(1)


    useEffect(() => {

        console.log(selectedFloor)
        fetch(`/api/fetch-floor-data?floorNumber=${selectedFloor}`)
        .then((response) => response.json())
        .then((data) => {
            setFloorData(data.map((item: { room_name: any; gender: boolean; number_of_students: string }) => {
                console.log(item)
                return {
                    room: item.room_name,
                    gender: item.gender ? item.gender === true ? GENDER.MALE : GENDER.FEMALE : GENDER.NONE,
                    students: parseInt(item.number_of_students)
                }
            }))
            
        })
    },[selectedFloor])



    if(floorData)
        return (
            <section className=" w-[50%] h-[50%] mt-5 mx-auto flex flex-col justify-between">
                
                <div className=" w-full h-[40%] flex flex-row">
                    <Room ROOMTYPE={ROOMTYPE.ROOM} data={floorData[8]} />
                    <Room ROOMTYPE={ROOMTYPE.ROOM} balcony={true} data={floorData[7]}/>
                    <Room ROOMTYPE={ROOMTYPE.ROOM} data={floorData[6]}/>

                    <Room ROOMTYPE={ROOMTYPE.KITCHEN}/>

                    <Room ROOMTYPE={ROOMTYPE.ROOM} data={floorData[5]}/>
                    <Room ROOMTYPE={ROOMTYPE.ROOM} balcony={true} data={floorData[4]}/>
                    <Room ROOMTYPE={ROOMTYPE.ROOM} data={floorData[3]}/>
                </div>
                

                <div className=" w-full h-[40%] flex flex-row">
                    <Room ROOMTYPE={ROOMTYPE.ROOM} data={floorData[9]}/>
                    <Room ROOMTYPE={ROOMTYPE.ROOM} balcony={true} data={floorData[10]}/>
                    <Room ROOMTYPE={ROOMTYPE.ROOM} data={floorData[11]}/>

                    <Room ROOMTYPE={ROOMTYPE.ELEVATOR} selectedFloor={selectedFloor} setSelectedFloor={setSelectedFloor}/>

                    <Room ROOMTYPE={ROOMTYPE.ROOM} data={floorData[0]}/>
                    <Room ROOMTYPE={ROOMTYPE.ROOM} balcony={true} data={floorData[1]}/>
                    <Room ROOMTYPE={ROOMTYPE.ROOM} data={floorData[2]}/>
                </div>
            </section> 
        )
}

export default FloorLayout