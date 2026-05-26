import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Order from '@/models/Order';

// UNIVERSAL ROADMAP FOR DB CONNECTION
// Agar relative paths crash ho rahe hain, toh hum seedhe process environment 
// aur mongoose instance ko yahin par dynamically reuse kar lenge!
async function forceConnectDB() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }
  
  const URI = process.env.MONGODB_URI;
  if (!URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }
  
  return await mongoose.connect(URI);
}

export async function GET() {
  try {
    await forceConnectDB();
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error: any) {
    console.error("Admin Orders Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Database se orders fetch nahi ho paye." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await forceConnectDB();
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, message: "Order ID aur Status milna zaroori hai." },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Yeh order database mein nahi mila." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Status successfully update ho gaya!", order: updatedOrder },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Admin Orders Status Update Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error, status change fail hua." },
      { status: 500 }
    );
  }
}