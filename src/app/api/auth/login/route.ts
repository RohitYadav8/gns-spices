import { NextResponse } from "next/server";

import ConnectDB from "@/lib/db";

import User from "@/models/Users";

import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await ConnectDB();

    const body = await req.json();

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Email and password are required",
      });
    }

    // FIND USER
    // We use a regex for case-insensitive search in case the user was saved with uppercase letters
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    // USER NOT FOUND
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    // CHECK PASSWORD
    let isPasswordCorrect = false;
    try {
      isPasswordCorrect = await bcrypt.compare(password, user.password);
    } catch (err) {
      console.error("Bcrypt compare error:", err);
    }

    // INVALID PASSWORD
    if (!isPasswordCorrect) {
      console.log(`Failed login attempt for ${email}: Invalid password`);
      return NextResponse.json({
        success: false,
        message: "Invalid password",
      });
    }

    // LOGIN SUCCESS
    return NextResponse.json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Server error",
    });
  }
}