import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  discount: number;
  expiryDate: Date;
  isActive: boolean;
  createdAt: Date;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: [true, 'Coupon code zaroori hai'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    discount: {
      type: Number,
      required: [true, 'Discount percentage zaroori hai'],
      min: [1, 'Discount kam se kam 1% hona chahiye'],
      max: [100, 'Discount cannot be more than 100%'],
    },
    expiryDate: {
      type: Date,
      required: [true, 'Expiry date zaroori hai'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = models.Coupon || model<ICoupon>('Coupon', CouponSchema);
export default Coupon;