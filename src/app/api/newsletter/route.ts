import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Newsletter =
  mongoose.models.Newsletter ||
  mongoose.model("Newsletter", newsletterSchema);

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email required." },
        { status: 400 }
      );
    }

    // Already subscribed check
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "You are already subscribed!" },
        { status: 409 }
      );
    }

    await Newsletter.create({ email });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}