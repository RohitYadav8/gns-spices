import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/Users";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { currentPassword, newPassword } = await req.json();

    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found." },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(currentPassword.trim(), admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Current password is incorrect." },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword.trim(), 10);
    admin.password = hashedPassword;
    await admin.save();

    return NextResponse.json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    console.error("Change Password Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}