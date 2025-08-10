import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export const ExportButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);
    const res = await fetch('/api/admin/exportRooms');
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    // Get filename from Content-Disposition header
    const disposition = res.headers.get('Content-Disposition');
    let filename = 'rooms_export.xlsx';
    if (disposition) {
      const match = disposition.match(/filename="(.+)"/);
      if (match && match[1]) {
        filename = match[1];
      }
    }

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={handleExport}
        className="flex flex-row items-center justify-center gap-2 rounded-md border-2 border-stone-900 bg-emerald-600 px-4 py-2 font-fira-sans text-xl font-bold text-slate-200 shadow-md hover:bg-emerald-500 active:bg-emerald-800"
      >
        <FontAwesomeIcon icon={faFileExport} />
        <h2>Exportovať</h2>
      </button>
    </>
  );
};
