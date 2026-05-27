import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const client = new MongoClient(process.env.MONGODB_URI!);
  try {
    const body = await req.json();
    await client.connect();
    const db = client.db(); // Default database
    
    const result = await db.collection('orders').insertOne({
      ...body,
      createdAt: new Date()
    });
    
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function GET() {
  const client = new MongoClient(process.env.MONGODB_URI!);
  try {
    await client.connect();
    const db = client.db();
    const orders = await db.collection('orders').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, data: orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}