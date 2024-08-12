'use client'

import { useEffect, useState } from "react"
import FloorLayout, { IRoomData } from "./FloorLayout"
import { GENDER } from "../../Const"
import GlobalContext from "../../GlobalContext"
import NavBar from "./NavBar"
import RoomDetails from "./RoomDetails"
import ActivityIndicator from "./ActivityIndicator"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import StudentForm from "./StudentForm"
import { useFloorData } from "@/hooks/useFloorData"



const Main = () => {

    const [students, setStudents] = useState<Array<any>>([])
    const [selectedRoom, setSelectedRoom] = useState<IRoomData>()
    const [gender, setGender] = useState<GENDER>(GENDER.NONE)
    const [floorData, setFloorData] =  useState<IRoomData[] | null>([])
    const [correctForm, setCorrectForm] = useState<boolean>(true)
    const [formsVisible, setFormsVisible] = useState<boolean>(true)

    const contextValue = {
      students: students,
      setStudents: setStudents,
      selectedRoom: selectedRoom,
      setSelectedRoom: setSelectedRoom,
      gender: gender,
      setGender: setGender,
      correctForm: correctForm,
      setCorrectForm: setCorrectForm,
      floorData: floorData,
      setFloorData: setFloorData,
      formsVisible: formsVisible,
      setFormsVisible: setFormsVisible,
    }
    
    return (
      <main className=' select-none bg-stone-200 h-screen w-screen flex flex-col justify-between'>
        <GlobalContext.Provider value={contextValue}>
        <NavBar/>
        <article className=" flex flex-row h-[80vh] bg-stone-200 w-full ">

          {formsVisible && <StudentForm/>}
          
          <section className={` w-[60vw]  ${!formsVisible && 'ml-[20vw]'} `}>

            <div className=" flex flex-row justify-start w-full h-[90%]">
              <FloorLayout/> 
            </div>

            
          </section>
          <RoomDetails data={selectedRoom} />
        </article>
  
        <footer className=" bg-[#272D2D] h-[10%] flex flex-row justify-between px-10 items-center">
          <h6 className=" font-fira-sans font-medium text-stone-200">Samuel Dubík 2023</h6>
          <h6 className=" font-fira-sans font-medium text-stone-200">V prípade problémov s rezerváciou nás kontaktujte na rada.jedlikova9@gmail.com</h6>
        </footer>
        </GlobalContext.Provider>
      </main>
    )
  }

  export default Main
  