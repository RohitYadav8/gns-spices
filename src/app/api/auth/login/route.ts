import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  console.log("Login Attempt:", email, password); // Terminal mein dekh kya aa raha hai

  if (email === "admin@gnsspices.com" && password === "Admin@123") {
    return NextResponse.json({ success: true, message: "Login successful" });
  }

  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
}