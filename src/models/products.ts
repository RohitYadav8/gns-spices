import mongoose, { Schema, model, models } from "mongoose";

const TierSchema = new Schema({
  name: { type: String, default: "" },
  weight: { type: String, default: "" },
  desc: { type: String, default: "" },
}, { _id: false });

const ProductSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  desc: { type: String, required: true },
  badge: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  origin: { type: String, default: "" },
  tiers: { type: [TierSchema], default: [] },
  inStock: { type: Boolean, default: true }, // ✅ Ye add karo
  createdAt: { type: Date, default: Date.now },
});

// ✅ Cache clear
delete (mongoose.models as any).Product;
const Product = model("Product", ProductSchema);

export default Product;