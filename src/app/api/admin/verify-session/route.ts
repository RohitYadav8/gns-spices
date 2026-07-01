import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { sendOrderEmail } from '@/lib/sendEmail';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: undefined });

export async function POST(req: Request) {
  try {
    const { session_id } = await req.json();
    if (!session_id) return NextResponse.json({ error: "Missing session_id" });

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === 'paid') {
      const orderId = session.metadata?.orderId;

      const order = await prisma.order.findFirst({
        where: { id: orderId, paymentStatus: 'Pending' },
        include: { items: true },
      });

      if (order) {
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: 'Paid', status: 'Processing' },
        });

        await sendOrderEmail({
          orderId: order.id,
          customer: {
            fullName: order.shippingFullName,
            email: order.shippingEmail,
            phone: order.shippingPhone,
            addressLine: order.shippingAddressLine,
            city: order.shippingCity,
            postalCode: order.shippingPostalCode,
          },
          items: order.items,
          total: order.totalAmount,
          paymentMethod: order.paymentMethod,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Verify Session Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}