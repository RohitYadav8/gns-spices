import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    await connectDB();

    // Fetch all orders that belong to this email, sort by newest first
    const orders = await Order.find({ "shippingAddress.email": email }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error("Fetch orders error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
