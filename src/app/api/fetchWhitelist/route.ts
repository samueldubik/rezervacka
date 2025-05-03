import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const response = await prisma.whitelist.findMany({
      select: {
        email: true,
      },
    });

    const emails = response.map((item) => item.email);
    return new Response(JSON.stringify(emails), { status: 200 });

  } catch (error: unknown) {
    console.error('Error fetching whitelist:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

