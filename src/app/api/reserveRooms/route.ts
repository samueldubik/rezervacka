import { prisma } from '@/lib/prisma';
import { GENDER } from '@prisma/client';
import { NextResponse } from 'next/server';
import { RESERVATIONRESPONSE } from '../../../../Types';

interface RequestData {
  gender: GENDER;
  roomName: string;
  students: Array<{ name: string; email: string }>;
}

function validateRequest(body: RequestData) {
  const { gender, roomName, students } = body;

  if (!gender || !roomName || !students || students.length === 0) {
    throw new Error('NONE'); // Use the key from DATABASERESPONSE
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as RequestData;
    validateRequest(body);
    const { gender, roomName, students } = body;

    const result = await prisma.$transaction(async (tx) => {
      const room = await tx.room.findUnique({
        where: { name: roomName },
        select: {
          gender: true,
          _count: {
            select: { students: true },
          },
        },
      });

      if (!room) {
        throw new Error('ROOMNOTFOUND');
      }

      const totalStudentsCount = room._count.students + students.length;
      if (totalStudentsCount > 4) {
        throw new Error('MORETHAN4');
      }

      if (room.gender !== GENDER.NONE && room.gender !== gender) {
        throw new Error('GENDERMISSMATCH');
      }

      await tx.student.createMany({
        data: students.map((student) => ({
          name: student.name,
          email: student.email,
          roomName,
        })),
      });

      if (room.gender === GENDER.NONE) {
        await tx.room.update({
          where: { name: roomName },
          data: { gender },
        });
      }

      return { key: 'SUCCESS' as keyof typeof RESERVATIONRESPONSE }; // Return the success key
    });

    // Use the success key to send the response
    const successResponse = RESERVATIONRESPONSE[result.key];
    return NextResponse.json({ message: successResponse.message }, { status: successResponse.status });

  } catch (error: any) {
    console.error('Error processing reservation:', error);

    const errorKey = error.message as keyof typeof RESERVATIONRESPONSE;
    const errorResponse = RESERVATIONRESPONSE[errorKey] || RESERVATIONRESPONSE.ERROR;

    return NextResponse.json({ error: errorResponse.message }, { status: errorResponse.status });
  }
}