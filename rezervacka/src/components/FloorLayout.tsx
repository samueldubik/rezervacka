import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { GENDER, ROOMTYPE } from "../../Const"
import Room from "./Room"
import GlobalContext from "../../GlobalContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { useFloorData } from "@/hooks/useFloorData"
import ActivityIndicator from "./ActivityIndicator"

export interface IRoomData {
    room: string,
    gender: GENDER,
    students: number
}

const blockNames = ['A', 'C', 'D']

const FloorLayout = () => {

    const [block, setBlock] = useState<number>(0)
    const [selectedFloor, setSelectedFloor] = useState(1);

    const context = useContext(GlobalContext)

    const { floorData, setFloorData } = context

    const blockLeft = () => {
        if(block)
          setBlock(prev => prev - 1)
      }
  
      const blockRight = () => {
        if(block < 2)
          setBlock(prev => prev + 1)
      }

      const fetchFloorData = useFloorData(selectedFloor, block)

      useEffect(() => {
        setFloorData(fetchFloorData);
      }, [fetchFloorData])

    if(fetchFloorData) {
        return (
            <section className=" w-[80%] h-[55%] mt-5 mx-auto flex flex-col justify-between">
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
    } else if (floorData && floorData.length === 0) {
        return (
            <ActivityIndicator/>
        )
    } else {
        return (
            <h1 className=" text-3xl font-nav-name text-[#252525] mt-24 border-[#6b7e6f] border-[12px] w-[50vw] h-[15vh] flex items-center justify-center">REGISTRÁCIA NIE JE SPRÍSTUPNENÁ</h1>
        )
    }

}

export default FloorLayout