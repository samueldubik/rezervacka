import { prisma } from '@/lib/prisma';
import { GENDER } from '@prisma/client';
import { NextResponse } from 'next/server';
import { RESERVATIONRESPONSE } from '../../../../../Types';

interface AdminRoomReservationRequest {
  roomName: string;
  gender: GENDER;
  students: Array<{ name: string; email: string }>;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AdminRoomReservationRequest;
    const { roomName, gender, students } = body;

    if (!roomName || !gender || !students) {
      throw new Error('NONE');
    }
    if (students.length > 4) {
      throw new Error('MORETHAN4');
    }

    await prisma.$transaction(async (tx) => {
      // Delete all students in the room
      await tx.student.deleteMany({ where: { roomName } });

      // Create new students (if any)
      if (students.length > 0) {
        await tx.student.createMany({
          data: students.map((student) => ({
            name: student.name,
            email: student.email,
            roomName,
          })),
        });
      }

      // Update room gender
      await tx.room.update({
        where: { name: roomName },
        data: { gender },
      });
    });

    return NextResponse.json({ message: 'Rezervácia izby bola upravená.' }, { status: 200 });
  } catch (error: any) {
    console.error('Admin reservation error:', error);
    const errorKey = error.message as keyof typeof RESERVATIONRESPONSE;
    const errorResponse = RESERVATIONRESPONSE[errorKey] || RESERVATIONRESPONSE.ERROR;
    return NextResponse.json({ error: errorResponse.message }, { status: errorResponse.status });
  }
}
