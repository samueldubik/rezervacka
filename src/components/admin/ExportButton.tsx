import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ExportButton = () => {
  return (
    <>
      <button className="flex flex-row items-center justify-center gap-2 rounded-md border-2 border-stone-900 bg-emerald-600 px-4 py-2 font-fira-sans text-xl font-bold text-slate-200 shadow-md hover:bg-emerald-500 active:bg-emerald-800">
        <FontAwesomeIcon icon={faFileExport} />
        <h2>Exportovať</h2>
      </button>
    </>
  );
};
