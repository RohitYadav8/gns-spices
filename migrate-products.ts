import mongoose from 'mongoose';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const adapter = new PrismaMariaDb({
  host: '127.0.0.1',
  user: 'root',
  password: 'Rohit@161996',
  database: 'gnsspices',
  connectionLimit: 5,
  port: 3306,
});

const prisma = new PrismaClient({ adapter });

const TierSchema = new mongoose.Schema({
  name: String,
  weight: String,
  desc: String,
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  title: String,
  category: String,
  desc: String,
  badge: String,
  image: String,
  price: Number,
  origin: String,
  tiers: [TierSchema],
  inStock: Boolean,
  createdAt: Date,
});

async function migrate() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI!);
  
  const Product = mongoose.model('Product', ProductSchema);
  const products = await Product.find({});
  console.log(`Found ${products.length} products in MongoDB`);

  // Test MySQL connection
  await prisma.$connect();
  console.log('MySQL connected!');

  console.log('Inserting into MySQL...');
  let success = 0;
  
  for (const p of products) {
    try {
      await prisma.product.create({
        data: {
          title: p.title || '',
          category: p.category || '',
          desc: p.desc || '',
          badge: p.badge || '',
          image: p.image || '',
          price: p.price || 0,
          origin: p.origin || '',
          inStock: p.inStock ?? true,
          tiers: p.tiers?.length ? p.tiers : [],
        },
      });
      success++;
      console.log(`✅ ${success}: ${p.title}`);
    } catch (err: any) {
      console.error(`❌ Failed: ${p.title} — ${err.message}`);
    }
  }

  console.log(`\nDone! ${success}/${products.length} products migrated.`);
  await mongoose.disconnect();
  await prisma.$disconnect();
}

migrate().catch(console.error);