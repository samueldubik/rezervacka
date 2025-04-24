'use client';
import Main from '../components/Main';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();

    // Add a resize event listener to update the state
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isSmallScreen) return <Main />;
  else {
    return (
      <div className="flex h-screen w-screen flex-col justify-center px-10">
        <h1 className="text-center font-fira-sans">
          Na registráciu je nutné použiť počítač. Ďakujem za pochopenie
        </h1>
      </div>
    );
  }
}
