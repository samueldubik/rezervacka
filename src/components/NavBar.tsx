'use client';

import { faChevronDown, faChevronUp, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGlobalContext } from '../../GlobalContext';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const headers: { [key: string]: string } = {
  '/': 'REZERVÁCIE IZIEB J9',
  '/admin': 'ADMIN PANEL',
};

const NavBar = () => {
  const pathname = usePathname() || ' ';
  const headerLabel: string = headers[pathname] || 'Default Header';

  const { formsVisible, setFormsVisible } = useGlobalContext();

  return (
    // OLD LAYOUT
    // <nav className="nav-normal">
    //   <div onClick={() => setFormsVisible((prev) => !prev)} className="form-button-normal">
    //     <FontAwesomeIcon icon={faUsers} className="icon-form-button-normal" />

    //     <div className="form-text-container">
    //       <h4 className="h4-small lg:h4-normal">Registrovaní študenti</h4>
    //     </div>

    //     <FontAwesomeIcon
    //       icon={formsVisible ? faChevronUp : faChevronDown}
    //       className="icon-form-button-normal"
    //     />
    //   </div>

    //   <h3 className="my-auto w-[60%] text-center font-nav-name text-4xl text-stone-200">
    //     {headerLabel}
    //   </h3>

    //   <img className="w-[20%] bg-form px-[5%]" src={'/assets/SRJ9_logo2.png'} />
    // </nav>

    // NEW LAYOUT
    <nav className="relative flex h-[10vh] min-h-[70px] flex-row items-center justify-items-start bg-dark lg:h-[7vh]">
      <div
        onClick={() => setFormsVisible((prev) => !prev)}
        className="flex h-full w-[20%] flex-col items-center bg-form"
      >
        <FontAwesomeIcon
          icon={faUsers}
          className={`my-auto h-12 cursor-pointer px-2 ${formsVisible ? 'text-dark' : 'text-stone-200'}`}
        />
        <h4 className="hidden">Registrovaní študenti</h4>
      </div>

      <h3 className="my-auto w-[60%] px-5 text-center font-nav-name text-2xl text-stone-200 sm:text-3xl lg:text-4xl">
        {headerLabel}
      </h3>

      <div className="my-auto flex h-full w-[20%] items-center justify-center bg-form px-2">
        <img
          className="h-[80%] max-h-full w-auto max-w-full object-contain"
          src={'/assets/SRJ9_logo2.png'}
          alt="Logo"
        />
      </div>
    </nav>
  );
};

export default NavBar;
