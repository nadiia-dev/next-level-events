import {
  connectDatabase,
  getEventComments,
  postEventComment,
} from "@/helpers/db_api";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const eventId = (await context.params).eventId;

  try {
    await connectDatabase();
    const events = await getEventComments(eventId);
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { message: "Fetching comment for event failed!" },
      { status: 500 }
    );
  }
}

export async function POST(req, context) {
  const body = await req.json();
  const { name, email, message } = body;
  const eventId = (await context.params).eventId;

  if (
    !email.includes("@") ||
    !name ||
    name.trim() === "" ||
    !message ||
    message.trim() === ""
  ) {
    return NextResponse.json({ message: "Invalid input." }, { status: 422 });
  }
  try {
    const newComment = await postEventComment({
      eventId,
      name,
      email,
      message,
    });
    return NextResponse.json(newComment);
  } catch (e) {
    return NextResponse.json(
      { message: "Adding comment for event failed!" },
      { status: 500 }
    );
  }
}
