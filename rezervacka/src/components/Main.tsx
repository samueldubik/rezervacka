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
            <FloorLayout/>
            <RoomDetails/>
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
  