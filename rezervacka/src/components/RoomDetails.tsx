import { useContext } from "react"
import GlobalContext from "../../GlobalContext"
import Button from "./Button"
import { faBook, faCheck } from "@fortawesome/free-solid-svg-icons"

const RoomDetails = () => {
    const context = useContext(GlobalContext)

    const {gender, selectedRoom, students} = context

    //console.log(`gender: ${gender}, selectedRoom: ${selectedRoom}, students: ${students}`)

    if(selectedRoom && students.length > 0)
        return(
            <div className= " absolute top-[21vh] right-[2vw] border-8 border-stone-800 w-[20vw] h-[40vh]">
                <h2 className=" text-center mt-5 text-3xl font-tektur font-bold mb-10">IZBA {selectedRoom?.room}</h2>
                
                <div className=" flex flex-row ml-2 mt-2">
                    <h3 className="  font-fira-sans font-medium text-form  w-1/2 ">BALKÓN:</h3>
                    <h3 className="  font-fira-sans font-medium text-form">ÁNO</h3>
                </div>

                <div className=" flex flex-row ml-2 mt-2">
                    <h3 className="  font-fira-sans font-medium text-form  w-1/2 ">POHLAVIE:</h3>
                    <h3 className="  font-fira-sans font-medium text-form">MUŽSKÁ IZBA</h3>
                </div>  

                <div className=" flex flex-row ml-2 mt-2">
                    <h3 className="  font-fira-sans font-medium text-form w-1/2 ">VOĽNÉ MIESTA:</h3>
                    <h3 className="  font-fira-sans font-medium text-form">2</h3>
                </div> 

                <div className=" absolute w-full bottom-[2vh]">
                    <Button label="Rezervovať" icon={faBook} action={() => {console.log('REZERVOVANE')}} black/>
                </div>

            </div>
        )
    
    else return (
        <div></div>
    )
}

export default RoomDetails