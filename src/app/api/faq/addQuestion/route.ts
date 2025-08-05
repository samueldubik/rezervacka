import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { question, answer } = await req.json();

    if (!question || !answer) {
      return new Response(JSON.stringify({ error: 'Question and answer are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newFaq = await prisma.faq.create({
      data: {
        question,
        answer,
      },
    });

    return new Response(JSON.stringify(newFaq), { status: 201 });
  } catch (error: unknown) {
    console.error('Error adding FAQ question:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
