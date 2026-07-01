import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const customers = await prisma.user.findMany({
      where: { role: 'customer' },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, customers });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json({ success: false, message: 'Failed to fetch customers' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json({ success: false, message: 'User already exists with this email' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = await prisma.user.create({
      data: {
        name,
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        role: 'customer',
      },
    });

    return NextResponse.json({ success: true, customer: newCustomer });
  } catch (error) {
    console.error('Error adding customer:', error);
    return NextResponse.json({ success: false, message: 'Failed to add customer' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Customer ID is required' }, { status: 400 });
    }

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete customer' }, { status: 500 });
  }
}