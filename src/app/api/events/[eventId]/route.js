import { connectDatabase, getEventById } from "@/helpers/db_api";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const eventId = (await context.params).eventId;

  try {
    await connectDatabase();
    const events = await getEventById(eventId);
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { message: "Fetching event failed!" },
      { status: 500 }
    );
  }
}
