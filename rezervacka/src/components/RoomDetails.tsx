import { useContext, useState } from "react"
import GlobalContext from "../../GlobalContext"
import Button from "./Button"
import { faBook, faCheck } from "@fortawesome/free-solid-svg-icons"
import { GENDER } from "../../Const"
import { IRoomData } from "./FloorLayout"


type Props = {
    data: IRoomData | undefined
}

const RoomDetails = ({data}: Props) => {
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
      console.log(gender)
      switch(gender) {
        case GENDER.MALE : return "MUŽSKÁ IZBA"
        case GENDER.FEMALE : return "ŽENSKÁ IZBA"
        default : return ''
      }
    }

    const balcony = hasBalcony()
    const genderCaption = getGenderCaption()

    const reserveRoom = async () => {
        try {
            setIsLoading(true);
            
            const requestData = {
              gender: gender === GENDER.MALE ? true : false, // Set the desired gender value
              roomName: selectedRoom?.room, // Set the desired room name
              students: [...students],
            };
            
            console.log(requestData)

            

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
            <div className= " absolute top-[21vh] right-[2vw] border-8 border-stone-800 w-[20vw] h-[40vh]">
                <h2 className=" text-center mt-5 text-3xl font-tektur font-bold mb-10">IZBA {selectedRoom?.room}</h2>
                
                <div className=" flex flex-row ml-2 mt-2">
                    <h3 className="  font-fira-sans font-medium text-form  w-1/2 ">BALKÓN:</h3>
                    <h3 className="  font-fira-sans font-medium text-form">{balcony ? 'ÁNO' : 'NIE'}</h3>
                </div>

                <div className=" flex flex-row ml-2 mt-2">
                    <h3 className="  font-fira-sans font-medium text-form  w-1/2 ">POHLAVIE:</h3>
                    <h3 className="  font-fira-sans font-medium text-form">{genderCaption}</h3>
                </div>  

                <div className=" flex flex-row ml-2 mt-2">
                    <h3 className="  font-fira-sans font-medium text-form w-1/2 ">VOĽNÉ MIESTA:</h3>
                    <h3 className="  font-fira-sans font-medium text-form">2</h3>
                </div> 

                <div className=" absolute w-full bottom-[2vh]">
                    <Button label="Rezervovať" icon={faBook} action={reserveRoom} black/>
                </div>

            </div>
        )
    
    else return (
        <div></div>
    )
}

export default RoomDetails