'use client';
import NavBar from '@/components/NavBar';
import FloorLayout from '@/components/FloorLayout';
import { ReservationPanel } from '@/components/ReservationPanel';
import { GlobalContextProvider } from './contexts/GlobalContext';
import { FloorDataProvider } from './contexts/FloorDataContext';

export default function Home() {
  return (
    <main>
      <GlobalContextProvider>
        <FloorDataProvider>
          <NavBar />
          <FloorLayout />
          <ReservationPanel />
        </FloorDataProvider>
      </GlobalContextProvider>
    </main>
  );
}
