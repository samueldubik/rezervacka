import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { enabled } = await request.json();

    // Find the first settings row
    const settings = await prisma.settings.findFirst();

    if (!settings) {
      return new Response(JSON.stringify({ message: 'Settings row not found.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await prisma.settings.update({
      where: { id: settings.id },
      data: { reservationsEnabled: enabled },
    });

    return new Response(
      JSON.stringify({
        message: 'Reservation status updated successfully.',
        newStatus: enabled,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Error toggling reservation status:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
