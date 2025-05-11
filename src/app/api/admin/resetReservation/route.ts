import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust the import based on your project structure
import { GENDER } from '@prisma/client';

export async function POST(req: Request) {
  try {
    // Drop existing tables
    await prisma.student.deleteMany({});
    await prisma.room.deleteMany({});
    await prisma.whitelist.deleteMany({});
    await prisma.settings.deleteMany({});

    const blocks = ['A', 'B', 'C', 'D'];
    for (const block of blocks) {
      for (let floor = 1; floor <= 7; floor++) {
        for (let room = 1; room <= 13; room++) {
          const roomName = `${block}${floor}${room.toString().padStart(2, '0')}`;
          await prisma.room.create({
            data: {
              name: roomName,
              gender: GENDER.NONE,
            },
          });
        }
      }
    }

    return NextResponse.json(
      { message: 'Tables created and populated successfully' },
      { status: 200 },
    );

    // Create new tables and populate the rooms table
  } catch (error) {
    console.error('Error resetting reservations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
