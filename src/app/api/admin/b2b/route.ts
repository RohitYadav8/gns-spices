import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import B2BApplication from "@/models/B2BApplication";

export async function GET() {
  try {
    await connectDB();
    const applications = await B2BApplication.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { id, status } = await req.json();
    const application = await B2BApplication.findByIdAndUpdate(
      id, { status }, { new: true }
    );
    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}