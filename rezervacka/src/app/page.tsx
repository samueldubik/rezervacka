import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faUsers } from '@fortawesome/free-solid-svg-icons'
import FloorLayout from '@/components/FloorLayout'


export default function Home() {
  return (
    <main className=' bg-stone-200 h-screen flex flex-col justify-between'>
      <nav className=' bg-blue-300 h-[10%] flex flex-row justify-center'>
        <div className= ' flex justify-items-start w-screen '>

          <div className=' flex bg-blue-500 w-[30%] align-middle pl-3 rounded-md '>
            <FontAwesomeIcon icon={faUsers} className=" w-14" />
            <h4 className=" pl-3 font-fira-sans font-extrabold my-auto text-2xl w-[30%] ">Registrovaní študenti</h4>
            <FontAwesomeIcon icon={faChevronDown} className=" w-14 ml-48" />
          </div>

          <h3 className=" text-4xl font-nav-name text-center w-[40%] my-auto ">REZERVÁCIE IZIEB J9</h3>
        </div>
      </nav>

      <section className=" h-[80%]">
        <header className= "  mx-auto h-50 w-72 mt-5">
          <h2 className= " text-center font-tektur text-6xl">BLOK C1</h2>
        </header>

        <FloorLayout/>
      </section>

      <footer className=" bg-blue-300 h-[10%] flex flex-row justify-between px-10 items-center">
        <h6>Samuel Dubík 2023</h6>
        <h6>V prípade problémov s rezerváciou kontaktujte ???</h6>
      </footer>

    </main>
  )
}
