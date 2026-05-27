import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: true,
  },

  badge: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product =
  models.Product ||
  model("Product", ProductSchema);

export default Product;