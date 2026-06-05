import { NextResponse } from "next/server";
import ConnectDB from "@/lib/db";
import User from "@/models/Users";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await ConnectDB();

    const { email, password } = await req.json();

    const cleanEmail = email?.trim().toLowerCase();
    const cleanPassword = password?.trim();

    if (!cleanEmail || !cleanPassword) {
      return NextResponse.json({ success: false, message: "Missing fields" });
    }

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(cleanPassword, user.password);

    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid credentials" });
    }

    return NextResponse.json({ success: true, user });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}