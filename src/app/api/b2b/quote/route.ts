import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import QuoteRequest from "@/models/QuoteRequest";

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

    const quote = await QuoteRequest.create({
      fullName, businessName, email, phone, businessType, city, message,
    });

    return NextResponse.json({ success: true, data: quote });
  } catch (error) {
    console.error("Quote Request Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}