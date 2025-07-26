import { prisma } from '@/lib/prisma';
import { GENDER } from '@prisma/client';

export async function POST(request: Request) {
  try {
    await prisma.student.deleteMany({});
    await prisma.room.deleteMany({});

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

    return new Response(JSON.stringify({ message: 'Reservation status updated successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error resetting reservations:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
