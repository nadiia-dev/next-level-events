import { connectDatabase, getFeaturedEvents } from "@/helpers/db_api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDatabase();
    const events = await getFeaturedEvents();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { message: "Fetching events failed!" },
      { status: 500 }
    );
  }
}
