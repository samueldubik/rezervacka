'use client'

import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faUsers } from '@fortawesome/free-solid-svg-icons'
import FloorLayout from '@/components/FloorLayout'
import { useState } from 'react'
import NavBar from '@/components/NavBar'


export default function Home() {


  return (
    <main className=' bg-stone-200 h-screen flex flex-col justify-between'>
      <NavBar/>
      <article className=" flex flex-col h-[80%] bg-stone-200 w-full mx-auto ">
        
        <h2 className= " text-center font-tektur text-6xl mt-5 h-[10%]">BLOK C1</h2>

        <section className=" flex flex-row justify-start w-full h-[90%]">
          <FloorLayout/>

        </section>

      </article>

      <footer className=" bg-[#272D2D] h-[10%] flex flex-row justify-between px-10 items-center">
        <h6 className=" font-fira-sans font-medium text-stone-200">Samuel Dubík 2023</h6>
        <h6 className=" font-fira-sans font-medium text-stone-200">V prípade problémov s rezerváciou kontaktujte ???</h6>
      </footer>

    </main>
  )
}
