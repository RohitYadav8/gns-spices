import { NextResponse } from 'next/server';
import ConnectDB from '@/lib/db';
import Category from '@/models/Category';

// Fetch all categories
export async function GET() {
  try {
    await ConnectDB();
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch categories' }, { status: 500 });
  }
}

// Create a new category
export async function POST(req: Request) {
  try {
    await ConnectDB();
    const body = await req.json();
    const { name, description, bg, text } = body;

    if (!name) {
      return NextResponse.json({ success: false, message: 'Category name is required' }, { status: 400 });
    }

    const newCategory = await Category.create({ name, description, bg, text });
    return NextResponse.json({ success: true, category: newCategory });
  } catch (error: any) {
    console.error('Error creating category:', error);
    if (error.code === 11000) {
      return NextResponse.json({ success: false, message: 'Category already exists' }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Failed to create category' }, { status: 500 });
  }
}

// Delete a category
export async function DELETE(req: Request) {
  try {
    await ConnectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Category ID is required' }, { status: 400 });
    }

    await Category.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete category' }, { status: 500 });
  }
}
