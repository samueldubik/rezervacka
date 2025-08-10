import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { id, question, answer } = await req.json();

    if (!id || !question || !answer) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updatedFaq = await prisma.faq.update({
      where: { id },
      data: { question, answer },
    });

    return new Response(JSON.stringify(updatedFaq), { status: 200 });
  } catch (error: unknown) {
    console.error('Error editing FAQ question:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
