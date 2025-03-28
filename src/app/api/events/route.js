import { connectDatabase, getAllEvents } from "@/helpers/db_api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDatabase();
    const events = await getAllEvents();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { message: "Fetching events failed!" },
      { status: 500 }
    );
  }
}
