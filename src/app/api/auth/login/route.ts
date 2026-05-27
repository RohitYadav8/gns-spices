import { NextResponse } from "next/server";

import ConnectDB from "@/lib/db";

import User from "@/models/Users";

import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await ConnectDB();

    const body = await req.json();

    const { email, password } = body;

    // FIND USER
    const user = await User.findOne({
      email,
    });

    // USER NOT FOUND
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    // CHECK PASSWORD
    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    // INVALID PASSWORD
    if (!isPasswordCorrect) {
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