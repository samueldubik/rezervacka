import { useState } from "react";
import Student from "./Student";
import Button from "./Button";
import { faBan, faCheck, faUserPlus } from "@fortawesome/free-solid-svg-icons";


const StudentForm = () => {


    return (
        <div className=" bg-[#1C5464] absolute top-[10vh] h-[80vh] w-[20%] overflow-auto pb-10">
            <Student/>
            <Student/>
            <Student/>
            <Student/>


            <Button label="Pridať" icon={faUserPlus}/>
            <Button label="Potvrdiť" icon={faCheck}/>
            <Button label="Zrušiť" icon={faBan}/>
        </div>
    )
}

export default StudentForm;