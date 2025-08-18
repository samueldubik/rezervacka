import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { RoomData } from '../../../../../Types';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const floorNumber = url.searchParams.get('floorNumber') as string;
    const blockName = url.searchParams.get('blockName') as string;

    if (!floorNumber || !blockName) {
      return NextResponse.json(
        { error: 'Missing required parameters: floorNumber and blockName' },
        { status: 400 },
      );
    }

    const rooms = await prisma.room.findMany({
      where: {
        name: {
          startsWith: `${blockName}${floorNumber}`,
        },
      },
      select: {
        name: true,
        gender: true,
        _count: {
          select: {
            students: true,
          },
        },
        isBlocked: true,
        students: true, // Include students for admin view
      },
      orderBy: {
        name: 'asc',
      },
    });

    if (rooms.length === 0) {
      return NextResponse.json({ error: 'Reservation is not available yet.' }, { status: 404 });
    }

    const transformedRooms: RoomData[] = rooms.map((room) => ({
      name: room.name,
      studentsCount: room._count.students,
      gender: room.gender,
      isBlocked: room.isBlocked,
      students: room.students || [], // Include students if available (for admin view only)
    }));

    return NextResponse.json(transformedRooms, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching floor data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
