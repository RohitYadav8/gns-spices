import { NextResponse } from 'next/server';
import ConnectDB from '@/lib/db';
import Category from '@/models/Category';

// Public endpoint to fetch active categories for the storefront
export async function GET() {
  try {
    await ConnectDB();
    // Return all categories
    const categories = await Category.find({}).sort({ createdAt: 1 });
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch categories' }, { status: 500 });
  }
}
