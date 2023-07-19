'use client'

import { faChevronDown, faChevronUp, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction, useState } from "react"
import StudentForm from "./StudentForm"



const NavBar = () => {

    const [formsVisible, setFormsVisible] = useState<boolean>(true)

    return (
        <nav className=' bg-[#272D2D] border-b-8 border-stone-200 h-[10%] flex flex-row justify-items-start w-screen relative'>
        
          <div 
          onClick={() => setFormsVisible(prev => !prev)}
          className=' flex flex-row justify-between bg-[#1C5464] w-[20%] align-middle px-2 hover:cursor-pointer '
          >
            <FontAwesomeIcon icon={faUsers} className=" h-[55%] my-auto text-stone-200 " />
            <h4 className=" w-[70%] text-center font-fira-sans font-medium text-stone-200 my-auto text-xl px-2">Registrovaní študenti</h4>
            { formsVisible ?
                <FontAwesomeIcon icon={faChevronUp} className=" h-[75%] my-auto text-stone-200" />
                :
                <FontAwesomeIcon icon={faChevronDown} className=" h-[75%] my-auto text-stone-200" />
            }
          </div>
          <h3 className=" text-4xl font-nav-name text-center w-[60%] my-auto text-stone-200 ">REZERVÁCIE IZIEB J9</h3>
        

          {formsVisible && 
            <StudentForm/>

          }
      </nav>
    )
}

export default NavBar