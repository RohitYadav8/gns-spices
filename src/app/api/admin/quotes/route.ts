import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendB2BStatusEmail } from "@/lib/b2bEmail";

export async function GET() {
  try {
    const quotes = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: quotes });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    const quote = await prisma.quoteRequest.update({
      where: { id },
      data: { status },
    });

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