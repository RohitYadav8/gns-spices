import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
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

    await connectDB();
    
    // Aapke schema ke hisaab se update
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { 
      paymentStatus: 'Paid',
      status: 'Processing' // Payment hote hi hum order processing status mein daal sakte hain
    }, { new: true });

    if (updatedOrder) {
      // Send email upon successful payment
      sendOrderEmail({
        orderId: updatedOrder._id.toString(),
        customer: updatedOrder.shippingAddress,
        items: updatedOrder.items,
        total: updatedOrder.totalAmount
      }).catch(console.error);
    }
  }

  return NextResponse.json({ received: true });
}