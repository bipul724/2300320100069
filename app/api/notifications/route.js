import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all notifications
export async function GET() {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ notifications });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching notifications" },
      { status: 500 }
    );
  }
}

// POST - create a new notification
export async function POST(request) {
  try {
    const { title, message, studentID, notificationType } =
      await request.json();

    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        studentID,
        notificationType,
      },
    });

    return NextResponse.json(
      { message: "Notification created", notification },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating notification" },
      { status: 500 }
    );
  }
}


