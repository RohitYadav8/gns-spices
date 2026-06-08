import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import QuoteRequest from "@/models/QuoteRequest";
import { sendB2BStatusEmail } from "@/lib/b2bEmail";

export async function GET() {
  try {
    await connectDB();
    const quotes = await QuoteRequest.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: quotes });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { id, status } = await req.json();

    const quote = await QuoteRequest.findByIdAndUpdate(
      id, { status }, { new: true }
    );

    // Email bhejo user ko
    if (quote) {
      await sendB2BStatusEmail({
        fullName: quote.fullName,
        businessName: quote.businessName,
        email: quote.email,
        status,
      });
    }

    return NextResponse.json({ success: true, data: quote });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}