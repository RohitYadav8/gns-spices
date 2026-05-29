import mongoose, { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: '',
    },
    bg: {
      type: String,
      default: 'bg-[#FFE394]',
    },
    text: {
      type: String,
      default: 'text-[#332D20]',
    },
  },
  {
    timestamps: true,
  }
);

delete models.Category;
const Category = model('Category', CategorySchema);

export default Category;
