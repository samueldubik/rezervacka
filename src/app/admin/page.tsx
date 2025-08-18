'use client';
import NavBar from '@/components/NavBar';
import FloorLayout from '@/components/FloorLayout';
import { ReservationPanel } from '@/components/ReservationPanel';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { GlobalContextProvider } from '../contexts/GlobalContext';
import { FloorDataProvider } from '../contexts/FloorDataContext';

export default function Admin() {
  return (
    <main>
      <GlobalContextProvider isAdmin>
        <FloorDataProvider>
          <NavBar />
          <AdminPanel />
          <FloorLayout />
          <ReservationPanel />
        </FloorDataProvider>
      </GlobalContextProvider>
    </main>
  );
}
