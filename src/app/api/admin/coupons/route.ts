import { NextResponse } from 'next/server';
import connectDB from "@/lib/db"; // Aapka sahi database import
import Coupon from '@/models/Coupon';

// 1. GET: Saare coupons fetch karne ke liye
export async function GET() {
  try {
    // Sahi function call
    await connectDB();
    
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, coupons: coupons || [] }, { status: 200 });
  } catch (error: any) {
    console.error("Backend GET Coupons Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

// 2. POST: Naya coupon create karne ke liye
export async function POST(request: Request) {
  try {
    // Sahi function call
    await connectDB();
    const body = await request.json();
    const { code, discount, expiryDate } = body;

    if (!code || !discount || !expiryDate) {
      return NextResponse.json({ success: false, message: "Saari fields zaroori hain" }, { status: 400 });
    }

    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase().trim() });
    if (existingCoupon) {
      return NextResponse.json({ success: false, message: "Yeh Coupon Code pehle se maujood hai!" }, { status: 400 });
    }

    const newCoupon = await Coupon.create({
      code: code.toUpperCase().trim(),
      discount: Number(discount),
      expiryDate: new Date(expiryDate),
    });

    return NextResponse.json({ success: true, coupon: newCoupon }, { status: 201 });
  } catch (error: any) {
    console.error("Backend POST Coupon Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to create coupon" }, { status: 500 });
  }
}

// 3. DELETE: Coupon remove karne ke liye
export async function DELETE(request: Request) {
  try {
    // Sahi function call
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: "Coupon ID zaroori hai" }, { status: 400 });
    }

    await Coupon.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Coupon delete ho gaya" }, { status: 200 });
  } catch (error: any) {
    console.error("Backend DELETE Coupon Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to delete coupon" }, { status: 500 });
  }
}