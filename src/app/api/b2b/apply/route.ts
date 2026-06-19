import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import B2BApplication from "@/models/B2BApplication";
import { sendNewB2BApplicationEmail } from "@/lib/b2bEmail";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { fullName, businessName, email, phone, businessType, city, message } = body;

    if (!fullName || !businessName || !email || !phone || !businessType || !city) {
      return NextResponse.json(
        { success: false, message: "Sab fields required hain" },
        { status: 400 }
      );
    }

    // DB mein save karo
    const application = await B2BApplication.create({
      fullName, businessName, email, phone, businessType, city, message,
    });

    // ✅ Admin + User dono ko mail bhejo
    await sendNewB2BApplicationEmail({
      fullName, businessName, email, phone, businessType, city, message,
    });

    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    console.error("B2B Apply Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}