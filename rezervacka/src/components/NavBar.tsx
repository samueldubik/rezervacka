'use client'

import { faChevronDown, faChevronUp, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import StudentForm from "./StudentForm"
import GlobalContext from "../../GlobalContext"



const NavBar = () => {

    const context = useContext(GlobalContext)

    const {formsVisible, setFormsVisible} = context

    return (
        <nav className=' nav-normal'>
          <div 
          onClick={() => setFormsVisible(prev => !prev)}
          className=' form-button-normal '
          >
            <FontAwesomeIcon icon={faUsers} className=" icon-form-button-normal " />
            
            <div className=" form-text-container ">
              <h4 className=" h4-small lg:h4-normal ">Registrovaní študenti</h4>
            </div>
            
            { formsVisible ?
                <FontAwesomeIcon icon={faChevronUp} className=" icon-form-button-normal " />
                :
                <FontAwesomeIcon icon={faChevronDown} className=" icon-form-button-normal" />
            }
          </div>

          <h3 className=" text-4xl font-nav-name text-center w-[60%] my-auto text-stone-200 ">REZERVÁCIE IZIEB J9</h3>
            
          <img
          className="w-[20%] px-[5%] bg-form"
          src={"/assets/SRJ9_logo2.png"}
          />

      </nav>
    )
}

export default NavBar