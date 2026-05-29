import { NextResponse } from 'next/server';
import ConnectDB from '@/lib/db';
import User from '@/models/Users';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await ConnectDB();
    
    // Fetch all users or just customers
    const customers = await User.find({ role: 'customer' }).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      customers
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch customers'
    }, { status: 500 });
  }
}

// Add a new customer
export async function POST(req: Request) {
  try {
    await ConnectDB();
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'User already exists with this email' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = await User.create({
      name,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: 'customer'
    });

    return NextResponse.json({ success: true, customer: newCustomer });
  } catch (error) {
    console.error('Error adding customer:', error);
    return NextResponse.json({ success: false, message: 'Failed to add customer' }, { status: 500 });
  }
}

// Delete a customer
export async function DELETE(req: Request) {
  try {
    await ConnectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Customer ID is required' }, { status: 400 });
    }

    await User.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete customer' }, { status: 500 });
  }
}
