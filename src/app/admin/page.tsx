'use client';
import NavBar from '@/components/NavBar';
import FloorLayout from '@/components/FloorLayout';
import { ReservationPanel } from '@/components/ReservationPanel';
import { GlobalContextProvider } from '../../../GlobalContext';
import { AdminPanel } from '@/components/admin/AdminPanel';

export default function Admin() {
  return (
    <main>
      <GlobalContextProvider>
        <NavBar />
        <AdminPanel />
        <FloorLayout />
        <ReservationPanel isAdmin />
      </GlobalContextProvider>
    </main>
  );
}
