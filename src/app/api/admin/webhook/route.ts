import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { sendOrderEmail } from '@/lib/sendEmail';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: undefined });

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const orderId = session.metadata.orderId;

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

  return NextResponse.json({ received: true });
}