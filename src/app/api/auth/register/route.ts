import { NextResponse } from "next/server";

import  ConnectDB  from "@/lib/db";

import User from "@/models/Users";

import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await ConnectDB();

    const body = await req.json();

    const email = body.email?.trim().toLowerCase();
    const name = body.name?.trim();
    const password = body.password;

    if (!email || !password || !name) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields",
      });
    }

    const existingUser = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
    });
  }
}