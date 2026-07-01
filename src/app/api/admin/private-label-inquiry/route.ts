import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNewPLInquiryEmail, sendPLStatusEmail } from "@/lib/b2bEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, brandName, country, productType, quantity } = body;

    if (!name || !email || !brandName || !country || !productType || !quantity) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled." },
        { status: 400 }
      );
    }

    const inquiry = await prisma.privateLabelInquiry.create({
      data: {
        name,
        email,
        phone: body.phone || null,
        brandName,
        country,
        productType,
        quantity,
        message: body.message || null,
      },
    });

    await sendNewPLInquiryEmail({
      name,
      email,
      phone: body.phone,
      brandName,
      country,
      productType,
      quantity,
      message: body.message,
    });

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error: any) {
    console.error("Private label inquiry error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const inquiries = await prisma.privateLabelInquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, inquiries });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "ID and status required." },
        { status: 400 }
      );
    }

    const updated = await prisma.privateLabelInquiry.update({
      where: { id },
      data: { status },
    });

    await sendPLStatusEmail({
      name: updated.name,
      email: updated.email,
      brandName: updated.brandName,
      status,
    });

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}