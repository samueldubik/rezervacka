import { roomType } from "../../Const"
import Room from "./Room"



const FloorLayout = () => {

    const mockJSON = [
        {
        room: 'C101',
        female: false,
        balcony: false,
        students: 0,
        },
        
        {
        room: 'C102',
        female: false,
        balcony: true,
        students: 2,
        },

        {
        room: 'C103',
        female: false,
        balcony: false,
        students: 0,
        },
        {
        room: 'C104',
        female: false,
        balcony: false,
        students: 0,
        },

    ]

    return (
        <section className=" w-[75%] h-[50%] mt-5 bg-slate-600 mx-auto flex flex-col justify-between">
            <div className=" bg-yellow-300 w-full h-[40%] flex flex-row">
                <Room roomType={roomType.ROOM}/>
                <Room roomType={roomType.ROOM}/>
                <Room roomType={roomType.ROOM}/>

                <Room roomType={roomType.KITCHEN}/>

                <Room roomType={roomType.ROOM}/>
                <Room roomType={roomType.ROOM}/>
                <Room roomType={roomType.ROOM}/>
            </div>

            <div className=" bg-cyan-400 w-full h-[40%] flex flex-row">
                <Room roomType={roomType.ROOM}/>
                <Room roomType={roomType.ROOM}/>
                <Room roomType={roomType.ROOM}/>

                <Room roomType={roomType.ELEVATOR}/>

                <Room roomType={roomType.ROOM}/>
                <Room roomType={roomType.ROOM}/>
                <Room roomType={roomType.ROOM}/>
            </div>
        </section>
    )
}

export default FloorLayout