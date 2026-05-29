import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import mongoose from 'mongoose';
import connectDB from '@/lib/db'; 
import Order from '@/models/Order';
import { sendOrderEmail } from '@/lib/sendEmail';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: undefined, 
});

export async function POST(req: Request) {
  try {
    await connectDB();
    const { items, customerDetails, paymentMethod } = await req.json();

    // 1. Calculations
    const subtotal = items.reduce((acc: any, item: any) => acc + (item.price * item.quantity), 0);

    // 2. Database mein Order Create karna
    const newOrder = await Order.create({
      user: null, 
      items: items.map((item: any) => ({
        product: new mongoose.Types.ObjectId(),
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image || ""
      })),
      merchandiseSubtotal: subtotal,
      totalAmount: subtotal,
      shippingAddress: {
        fullName: customerDetails.fullName,
        email: customerDetails.email, // <--- YE LINE ADD KARNI HAI
        phone: customerDetails.phone,
        addressLine: customerDetails.addressLine,
        city: customerDetails.city,
        postalCode: customerDetails.postalCode
      },
      paymentMethod: paymentMethod || 'Stripe',
      status: 'Pending',
      paymentStatus: 'Pending'
    });

    if (paymentMethod === 'COD' || paymentMethod === 'GPay') {
      sendOrderEmail({
        orderId: newOrder._id.toString(),
        customer: customerDetails,
        items: items,
        total: subtotal,
        paymentMethod: paymentMethod
      }).catch(console.error);

      return NextResponse.json({ url: `${process.env.NEXT_PUBLIC_URL}/success` });
    }

    // 3. Stripe Checkout Session (ONLY FOR CARD)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerDetails.email, // <--- Stripe par bhi email bhej rahe hain
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