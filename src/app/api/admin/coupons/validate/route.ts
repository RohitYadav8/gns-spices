import { NextResponse } from 'next/server';
import connectDB from "@/lib/db"; // Aapka working database connection helper
import Coupon from '@/models/Coupon';

export async function POST(request: Request) {
  try {
    console.log("Validation API Hit Hui!"); // Terminal mein check karne ke liye
    await connectDB();
    
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ success: false, message: "Coupon code zaroori hai" }, { status: 400 });
    }

    // Database mein dhoondein (Case-insensitive check ke liye trim aur uppercase)
    const coupon = await Coupon.findOne({ code: code.toUpperCase().trim(), isActive: true });

    if (!coupon) {
      return NextResponse.json({ success: false, message: "Khel khatam! Yeh galat ya expired coupon hai." }, { status: 404 });
    }

    // Expiry Date Check karein
    const currentDate = new Date();
    if (new Date(coupon.expiryDate) < currentDate) {
      return NextResponse.json({ success: false, message: "Yeh coupon expire ho chuka hai!" }, { status: 400 });
    }

    // Sab sahi raha toh success response bhejein
    return NextResponse.json({
      success: true,
      discount: coupon.discount,
      message: "Coupon valid hai!"
    }, { status: 200 });

  } catch (error: any) {
    console.error("Validation API Crash Error:", error); // VS Code terminal mein error print hoga
    return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
  }
}