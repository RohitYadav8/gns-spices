import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendB2BStatusEmail } from "@/lib/b2bEmail";

export async function GET() {
  try {
    const applications = await prisma.b2BApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    const application = await prisma.b2BApplication.update({
      where: { id },
      data: { status },
    });

    if (application) {
      await sendB2BStatusEmail({
        fullName: application.fullName,
        businessName: application.businessName,
        email: application.email,
        status,
      });
    }

    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}