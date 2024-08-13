import { useContext } from "react"
import RoomDetails from "./RoomDetails"
import StudentForm from "./StudentForm"
import GlobalContext from "../../GlobalContext"
import FloorLayout from "./FloorLayout"


const ReservationWindow = ({isAdmin = false}) => {

    const {formsVisible, selectedRoom} = useContext(GlobalContext);

    return (
    <article className=" flex flex-row h-[80vh] bg-stone-200 w-full ">

      {formsVisible && <StudentForm/>}
        
      <section className={` w-[60vw]  ${!formsVisible && 'ml-[20vw]'} `}>
        <div className=" flex flex-row justify-start w-full h-[90%]">
          <FloorLayout isAdmin={isAdmin}/> 
        </div>     
      </section>

      <RoomDetails data={selectedRoom}/>
    </article>
    )
}

export default ReservationWindow;