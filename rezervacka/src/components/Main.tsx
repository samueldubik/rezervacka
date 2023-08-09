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



const Main = () => {

    const blockNames = ['A', 'C', 'D']

    const [students, setStudents] = useState<Array<any>>([])
    const [selectedRoom, setSelectedRoom] = useState<IRoomData>()
    const [gender, setGender] = useState<GENDER>(GENDER.NONE)
    const [floorData, setFloorData] =  useState<IRoomData[]>([])
    const [selectedFloor, setSelectedFloor] = useState<number>(1)
    const [correctForm, setCorrectForm] = useState<boolean>(true)
    const [block, setBlock] = useState<number>(0)
    const [formsVisible, setFormsVisible] = useState<boolean>(true)


    useEffect(() => {

        console.log('FIRE')
        fetch(`/api/fetch-floor-data?floorNumber=${selectedFloor}&blockName=${blockNames[block]}`)
        .then((response) => response.json())
        .then((data) => {
            setFloorData(data.map((item: { room_name: any; gender: boolean; number_of_students: string }) => {

                let tmp : GENDER

                if(item.gender === null){
                  //console.log('NONE')
                  tmp = GENDER.NONE
                
                } else if(item.gender === true){
                  //console.log('MALE')
                  tmp = GENDER.MALE

                } else{
                  //console.log('FEMALE')
                  tmp = GENDER.FEMALE
                }

                //console.log(item, tmp)
                return {
                    room: item.room_name,
                    gender: tmp,
                    students: parseInt(item.number_of_students)
                }
            }))
            
        })
    },[selectedFloor, selectedRoom, block])

    const blockLeft = () => {
      if(block)
        setBlock(prev => prev - 1)
    }

    const blockRight = () => {
      if(block < 2)
        setBlock(prev => prev + 1)
    }
    
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
    


    //console.log(floorData)

    return (
      <main className=' select-none bg-stone-200 h-screen w-screen flex flex-col justify-between'>
        <GlobalContext.Provider value={contextValue}>
        <NavBar/>
        <article className=" flex flex-row h-[80vh] bg-stone-200 w-full ">

          {formsVisible && <StudentForm/>}
          
          <section className={` w-[60vw]  ${!formsVisible && 'ml-[20vw]'} `}>
            <header className=" flex flex-row justify-center items-center h-[10%] mt-5 mx-auto w-[50%]">
              <FontAwesomeIcon 
              onClick={blockLeft}
              icon={faChevronLeft}  
              className=" h-[75%] w-[10%] cursor-pointer hover:text-green-600" 
              />

              <h2 className= " text-center font-tektur font-semibold text-6xl">BLOK {blockNames[block]}{selectedFloor}</h2>
              
              <FontAwesomeIcon 
              onClick={blockRight}
              icon={faChevronRight} 
              className=" h-[75%] w-[10%] cursor-pointer hover:text-green-600" 
              />
            </header>

            <div className=" flex flex-row justify-start w-full h-[90%]">
              {floorData.length > 0 ? 
              <FloorLayout selectedFloor={selectedFloor} setSelectedFloor={setSelectedFloor}/>
              :
              <ActivityIndicator/>
              }
              
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
  