import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNewB2BApplicationEmail } from "@/lib/b2bEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, businessName, email, phone, businessType, city, message } = body;

    if (!fullName || !businessName || !email || !phone || !businessType || !city) {
      return NextResponse.json(
        { success: false, message: "Sab fields required hain" },
        { status: 400 }
      );
    }

    const quote = await prisma.quoteRequest.create({
      data: { fullName, businessName, email, phone, businessType, city, message },
    });

    await sendNewB2BApplicationEmail({
      fullName, businessName, email, phone, businessType, city, message,
    });

    return NextResponse.json({ success: true, data: quote });
  } catch (error) {
    console.error("Quote Request Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}