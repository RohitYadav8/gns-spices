import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, desc, badge, image, price, origin, tiers } = body;

    if (!title || !category || !desc || !image || !price) {
      return NextResponse.json({ success: false, message: "All fields are required" });
    }

    const product = await prisma.product.create({
      data: {
        title,
        category,
        desc,
        badge: badge || "",
        image,
        price,
        origin: origin || "",
        tiers: tiers || [],
      },
    });

    // Saare subscribers ko email bhejo
    try {
      const subscribers = await prisma.newsletter.findMany();
      const emails = subscribers.map((s: { email: string }) => s.email);

      if (emails.length > 0) {
        await resend.emails.send({
          from: "GNS Spices <onboarding@resend.dev>",
          to: ["evilwork9975@gmail.com"],
          subject: `🌶️ New Product: ${title}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0503; color: #ffffff; padding: 40px; border-radius: 16px;">
              <h1 style="color: #f59e0b; font-size: 28px; margin-bottom: 8px;">GNS Spices</h1>
              <p style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 32px;">New Arrival</p>
              <img src="${image}" alt="${title}" style="width: 100%; border-radius: 12px; margin-bottom: 24px;" />
              <h2 style="font-size: 24px; font-weight: 900; margin-bottom: 8px;">${title}</h2>
              <p style="color: #f59e0b; font-size: 12px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 16px;">${category}</p>
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">${desc}</p>
              ${origin ? `<p style="color: #f59e0b; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 24px;">Origin: ${origin}</p>` : ""}
              <div style="border-top: 1px solid #27272a; padding-top: 24px; margin-bottom: 32px;">
                <p style="font-size: 28px; font-weight: 900; color: #ffffff; margin: 0;">£${price}</p>
                <p style="color: #f59e0b; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; margin: 4px 0 0 0;">100G Pack</p>
              </div>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'}/shop"
                style="display: inline-block; background: #f59e0b; color: #000000; font-weight: 900; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">
                Shop Now
              </a>
              <p style="color: #3f3f46; font-size: 12px; margin-top: 40px; border-top: 1px solid #27272a; padding-top: 24px;">
                You're receiving this because you subscribed to GNS Spices updates.
              </p>
            </div>
          `,
        });
      }
    } catch (emailErr) {
      console.error("Email send failed:", emailErr);
    }

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}