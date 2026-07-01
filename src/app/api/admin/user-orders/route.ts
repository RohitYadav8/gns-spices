import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const order = await prisma.order.create({
      data: {
        merchandiseSubtotal: body.merchandiseSubtotal || null,
        totalAmount: body.totalAmount || null,
        shippingFullName: body.shippingFullName || null,
        shippingEmail: body.shippingEmail || null,
        shippingPhone: body.shippingPhone || null,
        shippingAddressLine: body.shippingAddressLine || null,
        shippingLandmark: body.shippingLandmark || null,
        shippingCity: body.shippingCity || null,
        shippingPostalCode: body.shippingPostalCode || null,
        paymentMethod: body.paymentMethod || "Stripe",
        paymentStatus: body.paymentStatus || "Pending",
        status: body.status || "Pending",
        items: {
          create: (body.items || []).map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image || null,
            productId: item.productId || null,
          })),
        },
      },
    });

    return NextResponse.json({ success: true, id: order.id });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });
    return NextResponse.json({ success: true, data: orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}