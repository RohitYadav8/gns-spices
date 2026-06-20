import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/products";

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { id, inStock } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "Product ID missing!" });
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: "Product not found!" });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}