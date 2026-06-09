import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const notifications = await prisma.notification.findMany();
    return Response.json({ notifications });
  } catch (error) {
    console.log(error);
  }
}
