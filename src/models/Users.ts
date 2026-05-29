import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
    },

    role: {
      type: String,
      default: "customer",
    },
    phone: { type: String, default: "" },
    addressLine: { type: String, default: "" },
    landmark: { type: String, default: "" },
    city: { type: String, default: "" },
    postalCode: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);