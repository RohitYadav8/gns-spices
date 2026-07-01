import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        items: true,
      },
    });

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error: any) {
    console.error("Admin Orders Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Database se orders fetch nahi ho paye." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, message: "Order ID aur Status milna zaroori hai." },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Yeh order database mein nahi mila." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Status successfully update ho gaya!", order: updatedOrder },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Admin Orders Status Update Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error, status change fail hua." },
      { status: 500 }
    );
  }
}