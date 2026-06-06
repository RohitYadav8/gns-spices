import mongoose, { Schema, Document } from "mongoose";

export interface IB2BApplication extends Document {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: "Retailer" | "Wholesale" | "Distributor";
  city: string;
  message: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: Date;
}

const B2BApplicationSchema = new Schema<IB2BApplication>(
  {
    fullName: { type: String, required: true },
    businessName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    businessType: {
      type: String,
      enum: ["Retailer", "Wholesale", "Distributor"],
      required: true,
    },
    city: { type: String, required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.B2BApplication ||
  mongoose.model<IB2BApplication>("B2BApplication", B2BApplicationSchema);