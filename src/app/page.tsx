'use client';
import NavBar from '@/components/NavBar';
import { GlobalContextProvider } from '../../GlobalContext';
import { useState } from 'react';
import { RoomData } from '../../Types';
import { GENDER } from '@prisma/client';
import StudentForm from '@/components/StudentForm';
import FloorLayout from '@/components/FloorLayout';
import RoomDetails from '@/components/RoomDetails';

export default function Home() {
  const formsVisible = true; // This will be removed with the design refactor

  return (
    <main className="flex h-screen w-screen select-none flex-col justify-between bg-stone-200">
      <GlobalContextProvider>
        <NavBar />
        <article className="flex h-[80vh] w-full flex-row bg-stone-200">
          {formsVisible && <StudentForm />}

          <section className={`w-[60vw] ${!formsVisible && 'ml-[20vw]'} `}>
            <div className="flex h-[90%] w-full flex-row justify-start">
              <FloorLayout />
            </div>
          </section>

          <RoomDetails />
        </article>
        <footer className="flex h-[10%] flex-row items-center justify-between bg-[#272D2D] px-10">
          <h6 className="font-fira-sans font-medium text-stone-200">Samuel Dubík 2023</h6>
          <h6 className="font-fira-sans font-medium text-stone-200">
            V prípade problémov s rezerváciou nás kontaktujte na rada.jedlikova9@gmail.com
          </h6>
        </footer>
      </GlobalContextProvider>
    </main>
  );
}
