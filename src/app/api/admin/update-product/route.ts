import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const { id, inStock } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "Product ID missing!" });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: { inStock },
    });

    if (!updated) {
      return NextResponse.json({ success: false, message: "Product not found!" });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}