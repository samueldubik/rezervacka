'use client'

import { useEffect, useState } from "react"
import FloorLayout, { IRoomData } from "./FloorLayout"
import { GENDER } from "../../Const"
import GlobalContext from "../../GlobalContext"
import NavBar from "./NavBar"
import RoomDetails from "./RoomDetails"
import { QueryResultRow } from "@vercel/postgres"



const Main = () => {

    const [students, setStudents] = useState<Array<any>>([])
    const [selectedRoom, setSelectedRoom] = useState<IRoomData | undefined>()
    const [gender, setGender] = useState<GENDER>(GENDER.NONE)
    const [floorData, setFloorData] =  useState<undefined | Array<IRoomData>>()
    const [selectedFloor, setSelectedFloor] = useState<number>(1)


    useEffect(() => {

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
    
    console.log(floorData)
    const contextValue = {
      students: students,
      setStudents: setStudents,
      selectedRoom: selectedRoom,
      setSelectedRoom: setSelectedRoom,
      gender: gender,
      setGender: setGender
    }
    
    return (
      <main className=' select-none bg-stone-200 h-screen flex flex-col justify-between'>
        <GlobalContext.Provider value={contextValue}>
        <NavBar/>
        <article className=" flex flex-col h-[80%] bg-stone-200 w-full mx-auto ">
          
          <h2 className= " text-center font-tektur font-semibold text-6xl mt-5 h-[10%]">BLOK C1</h2>
  
          <section className=" flex flex-row justify-start w-full h-[90%]">
            <FloorLayout floorData={floorData} setFloorData={setFloorData} selectedFloor={selectedFloor} setSelectedFloor={setSelectedFloor}/>
            <RoomDetails data={selectedRoom} />
          </section>
  
        </article>
  
        <footer className=" bg-[#272D2D] h-[10%] flex flex-row justify-between px-10 items-center">
          <h6 className=" font-fira-sans font-medium text-stone-200">Samuel Dubík 2023</h6>
          <h6 className=" font-fira-sans font-medium text-stone-200">V prípade problémov s rezerváciou kontaktujte ???</h6>
        </footer>
        </GlobalContext.Provider>
      </main>
    )
  }

  export default Main
  