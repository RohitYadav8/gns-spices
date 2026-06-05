import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { sendOrderEmail } from '@/lib/sendEmail';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: undefined });

export async function POST(req: Request) {
  try {
    const { session_id } = await req.json();
    if (!session_id) return NextResponse.json({ error: "Missing session_id" });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    if (session.payment_status === 'paid') {
      const orderId = session.metadata?.orderId;
      
      await connectDB();
      
      // Update the order ONLY if it is still Pending
      // This prevents sending duplicate emails if Webhook also runs
      const order = await Order.findOneAndUpdate(
         { _id: orderId, paymentStatus: 'Pending' },
         { paymentStatus: 'Paid', status: 'Processing' },
         { returnDocument: 'after' }
      );

      if (order) {
         await sendOrderEmail({
            orderId: order._id.toString(),
            customer: order.shippingAddress,
            items: order.items,
            total: order.totalAmount,
            paymentMethod: order.paymentMethod
         });
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Verify Session Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
