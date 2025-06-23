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
    <nav className="nav-normal">
      <div onClick={() => setFormsVisible((prev) => !prev)} className="form-button-normal">
        <FontAwesomeIcon icon={faUsers} className="icon-form-button-normal" />

        <div className="form-text-container">
          <h4 className="h4-small lg:h4-normal">Registrovaní študenti</h4>
        </div>

        <FontAwesomeIcon
          icon={formsVisible ? faChevronUp : faChevronDown}
          className="icon-form-button-normal"
        />
      </div>

      <h3 className="my-auto w-[60%] text-center font-nav-name text-4xl text-stone-200">
        {headerLabel}
      </h3>

      <img className="w-[20%] bg-form px-[5%]" src={'/assets/SRJ9_logo2.png'} />
    </nav>
  );
};

export default NavBar;
