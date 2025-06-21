import { prisma } from '@/lib/prisma';
import { GENDER } from '@prisma/client';
import { NextApiResponse } from 'next';

export async function POST(res: NextApiResponse) {
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

    res.status(200).json({ message: 'Reservation status updated successfully.' });

    // Create new tables and populate the rooms table
  } catch (error) {
    console.error('Error resetting reservations:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
