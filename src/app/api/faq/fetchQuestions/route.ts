import { prisma } from '@/lib/prisma';
import { Faq } from '@prisma/client';

export async function GET() {
  try {
    const faq: Faq[] = await prisma.faq.findMany({
      orderBy: { id: 'asc' },
    });

    return new Response(JSON.stringify(faq), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error fetching FAQ questions:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
