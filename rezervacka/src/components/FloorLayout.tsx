import { GENDER, ROOMTYPE } from "../../Const"
import Room from "./Room"

export interface IRoomData {
    room: string,
    gender: GENDER,
    students: number
}

const FloorLayout = () => {



    const mockJSON: IRoomData[] = [
        {
        room: 'C101',
        gender: GENDER.NONE,
        students: 0,
        },
        
        {
        room: 'C102',
        gender: GENDER.MALE,
        students: 2,
        },
        {
        room: 'C103',
        gender: GENDER.FEMALE,
        students: 3,
        },
        {
        room: 'C104',
        gender: GENDER.NONE,
        students: 0,
        },
        {
        room: 'C105',
        gender: GENDER.NONE,
        students: 0,
        },
        {
        room: 'C106',
        gender: GENDER.FEMALE,
        students: 3,
        },
        {
        room: 'C108',
        gender: GENDER.NONE,
        students: 0,
        },
        {
        room: 'C109',
        gender: GENDER.NONE,
        students: 0,
        },
        {
        room: 'C110',
        gender: GENDER.FEMALE,
        students: 3,
        },
        {
        room: 'C111',
        gender: GENDER.NONE,
        students: 0,
        },
        {
        room: 'C112',
        gender: GENDER.NONE,
        students: 0,
        },
        {
        room: 'C113',
        gender: GENDER.NONE,
        students: 0,
        },

        

    ]

    return (
        <section className=" w-[50%] h-[50%] mt-5 mx-auto flex flex-col justify-between">
            <div className=" w-full h-[40%] flex flex-row">
                <Room ROOMTYPE={ROOMTYPE.ROOM} data={mockJSON[8]} />
                <Room ROOMTYPE={ROOMTYPE.ROOM} balcony={true} data={mockJSON[7]}/>
                <Room ROOMTYPE={ROOMTYPE.ROOM} data={mockJSON[6]}/>

                <Room ROOMTYPE={ROOMTYPE.KITCHEN}/>

                <Room ROOMTYPE={ROOMTYPE.ROOM} data={mockJSON[5]}/>
                <Room ROOMTYPE={ROOMTYPE.ROOM} balcony={true} data={mockJSON[4]}/>
                <Room ROOMTYPE={ROOMTYPE.ROOM} data={mockJSON[3]}/>
            </div>

            <div className=" w-full h-[40%] flex flex-row">
                <Room ROOMTYPE={ROOMTYPE.ROOM} data={mockJSON[9]}/>
                <Room ROOMTYPE={ROOMTYPE.ROOM} balcony={true} data={mockJSON[10]}/>
                <Room ROOMTYPE={ROOMTYPE.ROOM} data={mockJSON[11]}/>

                <Room ROOMTYPE={ROOMTYPE.ELEVATOR}/>

                <Room ROOMTYPE={ROOMTYPE.ROOM} data={mockJSON[0]}/>
                <Room ROOMTYPE={ROOMTYPE.ROOM} balcony={true} data={mockJSON[1]}/>
                <Room ROOMTYPE={ROOMTYPE.ROOM} data={mockJSON[2]}/>
            </div>
        </section>
    )
}

export default FloorLayout