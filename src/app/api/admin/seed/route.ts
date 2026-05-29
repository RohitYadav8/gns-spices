import { NextResponse } from 'next/server';
import ConnectDB from '@/lib/db';
import Category from '@/models/Category';

export async function GET() {
  try {
    await ConnectDB();

    const categories = [
      {
        name: "Pure Powders",
        description: "Turmeric, chilli, coriander & more",
        bg: "bg-[#FFE394]",
        text: "text-[#332D20]",
      },
      {
        name: "Signature Masalas",
        description: "Garam, biryani, tandoori, kitchen king",
        bg: "bg-[#F48F68]",
        text: "text-white",
      },
      {
        name: "Whole Seeds",
        description: "Mustard & cumin for tempering",
        bg: "bg-[#8BDFDD]",
        text: "text-[#332D20]",
      },
      {
        name: "Whole Spices",
        description: "Tellicherry pepper, bay leaves",
        bg: "bg-[#332D20]",
        text: "text-[#FFF6DE]",
      },
    ];

    for (const cat of categories) {
      await Category.findOneAndUpdate({ name: cat.name }, cat, { upsert: true, new: true });
    }

    return NextResponse.json({ success: true, message: "Categories seeded!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to seed" }, { status: 500 });
  }
}
