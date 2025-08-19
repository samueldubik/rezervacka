import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { DatabaseCleanup } from './DatabaseCleanup';
import { ReservationsToggle } from './ReservationsToggle';
import { ExportButton } from './ExportButton';
import { BlocksRadioButtons } from './BlocksRadioButtons';
import { useFloorData } from '@/hooks/useFloorData';
import { useFloorDataContext } from '@/app/contexts/FloorDataContext';

export const AdminPanel = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(true);

  return (
    <article className="relative mx-auto my-5 w-[90%] rounded-lg bg-slate-200 shadow-md">
      <button
        onClick={() => setIsPanelVisible((prev) => !prev)}
        className="flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-t-lg bg-slate-400 px-4 py-2 font-quicksand text-xl font-bold"
      >
        <FontAwesomeIcon icon={faGear} />
        <h2>Konfiguračný Panel</h2>
      </button>
      {isPanelVisible && (
        <section className="items- flex flex-col gap-5 p-4">
          <div className="flex flex-row justify-center gap-32">
            <div className="flex w-[25%] flex-col items-center">
              <h3>Správa rezervácií</h3>
              <ReservationsToggle />
            </div>
            <DatabaseCleanup />
          </div>
          <div className="flex flex-row justify-center gap-64">
            <div>
              <h3>Bloky</h3>
              <BlocksRadioButtons />
            </div>
            <ExportButton />
          </div>

          <div className="flex flex-row justify-center gap-64">
            <h3></h3>
          </div>
        </section>
      )}
    </article>
  );
};
