import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import mongoose from 'mongoose';
import connectDB from '@/lib/db'; 
import Order from '@/models/Order';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: undefined, 
});

export async function POST(req: Request) {
  try {
    await connectDB();
    const { items, customerDetails } = await req.json();

    // 1. Calculations
    const subtotal = items.reduce((acc: any, item: any) => acc + (item.price * item.quantity), 0);

    // 2. Database mein Order Create karna
    // Schema ke hisaab se saari zaroori fields yahan daalni hongi
    const newOrder = await Order.create({
      user: null, // Guest checkout ke liye null
      items: items.map((item: any) => ({
        product: new mongoose.Types.ObjectId(), // Agar ID nahi hai toh naya ID
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image || ""
      })),
      merchandiseSubtotal: subtotal,
      totalAmount: subtotal,
      shippingAddress: {
        fullName: customerDetails.fullName,
        phone: customerDetails.phone,
        addressLine: customerDetails.addressLine,
        city: customerDetails.city,
        postalCode: customerDetails.postalCode
      },
      paymentMethod: 'Stripe',
      status: 'Pending',
      paymentStatus: 'Pending'
    });

    // 3. Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'gbp',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
      metadata: {
        orderId: newOrder._id.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}