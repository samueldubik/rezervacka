'use client';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGlobalContext } from '../../GlobalContext';
import { usePathname } from 'next/navigation';

const headers: { [key: string]: string } = {
  '/': 'REZERVÁCIE IZIEB J9',
  '/admin': 'ADMIN PANEL',
};

const NavBar = () => {
  const pathname = usePathname() || ' ';
  const headerLabel: string = headers[pathname] || 'Default Header';

  const { formsVisible, setFormsVisible } = useGlobalContext();

  return (
    <nav className="relative flex h-[10vh] min-h-[70px] flex-row items-center justify-items-start bg-slate-400 lg:h-[7vh]">
      <div
        onClick={() => setFormsVisible((prev) => !prev)}
        className="flex h-full w-[30%] flex-row items-center px-5"
      >
        <FontAwesomeIcon
          icon={faEnvelope}
          className={`my-auto h-12 cursor-pointer px-2 ${formsVisible ? 'text-dark' : 'text-stone-200'}`}
        />
        <h4 className="font-quicksand hidden text-xl font-bold lg:flex">Napíšte nám</h4>
      </div>

      <h3 className="font-bebas my-auto w-[50%] px-5 py-2 text-center text-3xl text-dark sm:text-3xl lg:text-4xl">
        {headerLabel}
      </h3>

      <div className="my-auto flex h-full w-[30%] items-center justify-center px-2">
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
