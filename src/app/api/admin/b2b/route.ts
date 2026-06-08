import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import B2BApplication from "@/models/B2BApplication";
import { sendB2BStatusEmail } from "@/lib/b2bEmail";

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

    // Email bhejo user ko
    if (application) {
      await sendB2BStatusEmail({
        fullName: application.fullName,
        businessName: application.businessName,
        email: application.email,
        status,
      });
    }

    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}