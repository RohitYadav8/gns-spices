import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ success: false, message: "Coupon code zaroori hai" }, { status: 400 });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase().trim() },
    });

    if (!coupon || !coupon.isActive) {
      return NextResponse.json({ success: false, message: "Khel khatam! Yeh galat ya expired coupon hai." }, { status: 404 });
    }

    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      return NextResponse.json({ success: false, message: "Yeh coupon expire ho chuka hai!" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      discount: coupon.discount,
      message: "Coupon valid hai!"
    }, { status: 200 });

  } catch (error: any) {
    console.error("Validation API Crash Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
  }
}