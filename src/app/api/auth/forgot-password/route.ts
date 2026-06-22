import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "@/models/Users";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email required." }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: true, message: "If this email exists, a reset link has been sent." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    await User.findByIdAndUpdate(user._id, { resetToken, resetTokenExpiry });

    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: `"GNS Spices" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your GNS Spices password",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px;">
          <h2 style="color: #d97f5f;">Reset Your Password</h2>
          <p>Hi <strong>${user.name || "there"}</strong>,</p>
          <p>We received a request to reset your password. Click the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background: #f4ae1c; color: #000; padding: 14px 32px; border-radius: 10px; font-weight: bold; text-decoration: none; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #888; font-size: 13px;">This link expires in <strong>1 hour</strong>. If you didn't request this, ignore this email.</p>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">GNS Spices Team</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "If this email exists, a reset link has been sent." });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ success: false, message: error.message || "Server error." }, { status: 500 });
  }
}
