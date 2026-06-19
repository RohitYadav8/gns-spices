import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    brandName: { type: String, required: true },
    country: { type: String, required: true },
    productType: { type: String, required: true },
    quantity: { type: String, required: true },
    message: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Inquiry =
  mongoose.models.PrivateLabelInquiry ||
  mongoose.model("PrivateLabelInquiry", inquirySchema);

// POST — nayi inquiry save karo
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, brandName, country, productType, quantity } = body;

    if (!name || !email || !brandName || !country || !productType || !quantity) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled." },
        { status: 400 }
      );
    }

    const inquiry = await Inquiry.create(body);
    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error: any) {
    console.error("Private label inquiry error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// GET — saari inquiries fetch karo
export async function GET() {
  try {
    await connectDB();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, inquiries });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// ✅ PATCH — status update karo
export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "ID and status required." },
        { status: 400 }
      );
    }

    const updated = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Inquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}