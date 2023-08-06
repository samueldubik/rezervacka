import { useContext, useState } from "react"
import GlobalContext from "../../GlobalContext"
import Button from "./Button"
import { faBook, faCheck } from "@fortawesome/free-solid-svg-icons"
import { BUTTONBORDER, GENDER } from "../../Const"
import { IRoomData } from "./FloorLayout"


type Props = {
    data: IRoomData | undefined
}

const RoomDetails = ({data}: Props) => {

  const line = 'flex flex-row mx-auto w-[85%] shadow-lg border-4 border-stone-800 h-[6vh] mt-2'
  const label = "  font-fira-sans font-semibold text-form w-1/2 text-center pt-[1vh] "
  const value = "  font-fira-sans font-semibold text-form w-1/2 text-center pt-[1vh]"
  
    const context = useContext(GlobalContext)

    const {gender, selectedRoom, students} = context
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //console.log(`gender: ${gender}, selectedRoom: ${selectedRoom}, students: ${students}`)
    //console.log(data)
    //console.log(selectedRoom)

    


    const hasBalcony = () => {
      if(!selectedRoom?.room)
        return false

      const balconyRooms = ['2', '4', '9', '12']
      return balconyRooms.includes(selectedRoom.room.charAt(3))
    }

    const getGenderCaption = () => {
      switch(data?.gender) {
        case GENDER.MALE : return "MUŽSKÁ"
        case GENDER.FEMALE : return "ŽENSKÁ"
        default : return ''
      }
    }

    const balcony = hasBalcony()
    

    const reserveRoom = async () => {
        try {
            setIsLoading(true);
            
            const requestData = {
              gender: gender === GENDER.MALE ? true : false, // Set the desired gender value
              roomName: selectedRoom?.room, // Set the desired room name
              students: [...students],
            };
            
            console.log('reservation:',requestData)

            

            const response = await fetch("/api/reserve-rooms", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestData),
            });
      
            // Handle the API response status code
            if (response.ok) {
              console.log("Reservation and gender update successful.");
            } else {
              console.log("Reservation and gender update failed. HERE?");
            }
      
            setIsLoading(false);
          } catch (error) {
            console.error("Error triggering API:", error);
            setIsLoading(false);
          }
    }

    if(selectedRoom && students.length > 0)
        return(
            <div className= " absolute top-[18vh] right-[2vw] border-8 shadow-lg border-stone-800 w-[20vw] h-[45vh]">
                <h2 className=" text-center mt-5 text-3xl font-tektur font-bold mb-5">IZBA {selectedRoom?.room}</h2>
                
                <div className={line}>
                    <h3 className={label}>BALKÓN:</h3>
                    <h3 className={value}>{balcony ? 'ÁNO' : 'NIE'}</h3>
                </div>

                <div className={line}>
                    <h3 className={label}>IZBA:</h3>
                    <h3 className={value}>{getGenderCaption()}</h3>
                </div>  

                <div className={line}>
                    <h3 className={label}>MIESTA:</h3>
                    <h3 className={value}>{4 - selectedRoom?.students}</h3>
                </div> 

                <div className=" w-full mb-10">
                    <Button label="Rezervovať" icon={faBook} action={reserveRoom} border={BUTTONBORDER.BLACK}/>
                </div>

            </div>
        )
    
    else return (
        <div></div>
    )
}

export default RoomDetails

