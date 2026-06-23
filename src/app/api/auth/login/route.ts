import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/Users";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const cleanEmail = email?.trim().toLowerCase();
    const cleanPassword = password?.trim();

    const admin = await User.findOne({ email: cleanEmail, role: "admin" });
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(cleanPassword, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ success: true, message: "Login successful" });
    res.cookies.set("admin_token", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}