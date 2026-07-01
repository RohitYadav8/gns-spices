import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, coupons: coupons || [] }, { status: 200 });
  } catch (error: any) {
    console.error("Backend GET Coupons Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, discount, expiryDate } = body;

    if (!code || !discount || !expiryDate) {
      return NextResponse.json({ success: false, message: "Saari fields zaroori hain" }, { status: 400 });
    }

    const existingCoupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase().trim() },
    });

    if (existingCoupon) {
      return NextResponse.json({ success: false, message: "Yeh Coupon Code pehle se maujood hai!" }, { status: 400 });
    }

    const newCoupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase().trim(),
        discount: Number(discount),
        expiryDate: new Date(expiryDate),
      },
    });

    return NextResponse.json({ success: true, coupon: newCoupon }, { status: 201 });
  } catch (error: any) {
    console.error("Backend POST Coupon Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to create coupon" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: "Coupon ID zaroori hai" }, { status: 400 });
    }

    await prisma.coupon.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Coupon delete ho gaya" }, { status: 200 });
  } catch (error: any) {
    console.error("Backend DELETE Coupon Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to delete coupon" }, { status: 500 });
  }
}