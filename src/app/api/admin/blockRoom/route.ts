import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { roomName } = await request.json();

    // Fetch current value
    const room = await prisma.room.findUnique({
      where: { name: roomName },
      select: { isBlocked: true },
    });

    if (!room) {
      return new Response('Room not found', { status: 404 });
    }

    // Flip the value
    const updatedRoom = await prisma.room.update({
      where: { name: roomName },
      data: { isBlocked: !room.isBlocked },
    });

    return new Response(JSON.stringify(updatedRoom), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error blocking room:', error);
    return new Response('Error blocking room', { status: 500 });
  }
}
