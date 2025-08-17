'use client';

import { faEnvelope, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaqModal } from './modals/FaqModal';
import { useGlobalContext } from '@/app/contexts/GlobalContext';

const headers: { [key: string]: string } = {
  '/': 'REZERVÁCIE IZIEB J9',
  '/admin': 'ADMIN PANEL',
};

const NavBar = () => {
  const pathname = usePathname() || ' ';
  const headerLabel: string = headers[pathname] || 'Default Header';
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);

  const { formsVisible, setFormsVisible } = useGlobalContext();
  const isAdmin = pathname === '/admin';

  return (
    <nav className="relative flex h-[10vh] min-h-[70px] flex-row items-center justify-items-start bg-slate-400 lg:h-[7vh]">
      <div className="flex h-full w-[40%] flex-row items-center gap-5 px-5">
        <div
          onClick={() => setFormsVisible((prev) => !prev)}
          className="flex cursor-pointer flex-row items-center"
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            className={`my-auto h-12 px-2 ${formsVisible ? 'text-dark' : 'text-stone-200'}`}
          />
          <h4 className="hidden font-quicksand text-xl font-bold lg:flex">Napíšte nám</h4>
        </div>

        <div
          onClick={() => setIsFaqModalOpen(true)}
          className="flex cursor-pointer flex-row items-center"
        >
          <FontAwesomeIcon
            icon={faQuestion}
            className={`my-auto h-12 cursor-pointer px-2 text-dark`}
          />
          <h4 className="hidden font-quicksand text-xl font-bold lg:flex">Otázky</h4>
        </div>
      </div>

      <h3 className="my-auto w-[40%] px-5 py-2 font-bebas text-3xl text-dark sm:text-3xl lg:text-4xl">
        {headerLabel}
      </h3>

      <div className="my-auto flex h-full w-[20%] items-center justify-center px-2">
        <img
          className="h-[80%] max-h-full w-auto max-w-full object-contain"
          src={'/assets/SRJ9_logo2.png'}
          alt="Logo"
        />
      </div>

      <FaqModal
        isAdmin={isAdmin}
        isOpen={isFaqModalOpen}
        onClose={() => setIsFaqModalOpen(false)}
      />
    </nav>
  );
};

export default NavBar;
