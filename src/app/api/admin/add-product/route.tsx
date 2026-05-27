import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/products";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      title,
      category,
      desc,
      badge,
      image,
      price,
    } = body;

    // Validation
    if (
      !title ||
      !category ||
      !desc ||
      !badge ||
      !image ||
      !price
    ) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create Product
    const product = await Product.create({
      title,
      category,
      desc,
      badge,
      image,
      price,
    });

    return NextResponse.json({
      success: true,
      product,
    });

  } catch (error: any) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}