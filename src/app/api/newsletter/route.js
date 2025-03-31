import { registerNewsletter } from "@/helpers/db_api";
import { NextResponse } from "next/server";

export async function POST(req, context) {
  const body = await req.json();
  const { email } = body;
  console.log(email);

  if (!email.includes("@")) {
    return NextResponse.json({ message: "Invalid input." }, { status: 422 });
  }
  try {
    const response = await registerNewsletter(email);
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json(
      { message: "Newsletter registration failed!" },
      { status: 500 }
    );
  }
}
