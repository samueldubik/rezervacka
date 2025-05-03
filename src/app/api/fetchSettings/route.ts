import { prisma } from "@/lib/prisma";
import { Settings } from "@prisma/client";



export async function GET(req: Request) {
  try {
   const settings : Settings[] = await prisma.settings.findMany()
   return new Response(JSON.stringify(settings), { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching settings:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}