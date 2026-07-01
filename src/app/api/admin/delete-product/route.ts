import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "Product ID missing hai!" });
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Product delete ho gaya!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}