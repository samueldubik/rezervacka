import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const deletedFaq = await prisma.faq.delete({
      where: { id },
    });

    return new Response(JSON.stringify(deletedFaq), { status: 200 });
  } catch (error: unknown) {
    console.error('Error removing FAQ question:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
