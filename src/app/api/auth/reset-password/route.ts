import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/models/Users";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ success: false, message: "Token and password required." }, { status: 400 });
    }

    // Token se user dhundo
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid or expired reset link." }, { status: 400 });
    }

    // Naya password hash karo
    const hashedPassword = await bcrypt.hash(password, 10);

    // Password update karo aur token hatao
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    return NextResponse.json({ success: true, message: "Password reset successfully!" });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json({ success: false, message: error.message || "Server error." }, { status: 500 });
  }
}
