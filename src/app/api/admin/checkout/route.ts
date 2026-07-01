import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { sendOrderEmail } from '@/lib/sendEmail';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: undefined,
});

export async function POST(req: Request) {
  try {
    const { items, customerDetails, paymentMethod } = await req.json();

    const subtotal = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

    const newOrder = await prisma.order.create({
      data: {
        merchandiseSubtotal: subtotal,
        totalAmount: subtotal,
        shippingFullName: customerDetails.fullName,
        shippingEmail: customerDetails.email,
        shippingPhone: customerDetails.phone,
        shippingAddressLine: customerDetails.addressLine,
        shippingCity: customerDetails.city,
        shippingPostalCode: customerDetails.postalCode,
        paymentMethod: paymentMethod || 'Stripe',
        status: 'Pending',
        paymentStatus: 'Pending',
        items: {
          create: items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image || "",
          })),
        },
      },
    });

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerDetails.email,
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'gbp',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        orderId: newOrder.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}