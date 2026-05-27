// Is code ko app/api/admin/delete-product/route.ts me paste karein
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/products";

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { id } = await request.json(); 

    if (!id) {
      return NextResponse.json({ success: false, message: "Product ID missing hai!" });
    }

    await Product.findByIdAndDelete(id); 
    return NextResponse.json({ success: true, message: "Product delete ho gaya!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}