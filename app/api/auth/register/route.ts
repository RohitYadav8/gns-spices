import { NextResponse } from "next/server";

import  ConnectDB  from "@/lib/db";

import User from "@/models/Users";

export async function POST(req: Request) {
  try {
    await ConnectDB();

    const body = await req.json();

    const { name, email, password } = body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
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