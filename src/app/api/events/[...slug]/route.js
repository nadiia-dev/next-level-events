import { connectDatabase, getFilteredEvents } from "@/helpers/db_api";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const slug = (await context.params).slug;
  const year = +slug[0];
  const month = +slug[1];

  try {
    await connectDatabase();
    const events = await getFilteredEvents(year, month);
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { message: "Fetching events failed!" },
      { status: 500 }
    );
  }
}
