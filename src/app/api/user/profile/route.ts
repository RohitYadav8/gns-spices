import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/Users";

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { userId, name, phone, addressLine, landmark, city, postalCode } = await req.json();

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phone, addressLine, landmark, city, postalCode },
      { returnDocument: 'after' }
    );

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        addressLine: updatedUser.addressLine,
        landmark: updatedUser.landmark,
        city: updatedUser.city,
        postalCode: updatedUser.postalCode
      },
    });
  } catch (error: any) {
    console.error("Profile update error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        addressLine: user.addressLine,
        landmark: user.landmark,
        city: user.city,
        postalCode: user.postalCode
      },
    });
  } catch (error: any) {
    console.error("Fetch profile error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
