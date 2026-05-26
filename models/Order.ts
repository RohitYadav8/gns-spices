import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Guest ke liye false
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, required: false }, // false
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String }
    }
  ],
  merchandiseSubtotal: { type: Number, required: false }, // false kiya
  totalAmount: { type: Number, required: false },         // false kiya
  status: { type: String, default: 'Pending' },
  paymentMethod: { type: String, default: 'Stripe' },
  paymentStatus: { type: String, default: 'Pending' },
  shippingAddress: {
    fullName: { type: String, required: false }, // false
    phone: { type: String, required: false },    // false
    addressLine: { type: String, required: false },// false
    city: { type: String, required: false },      // false
    postalCode: { type: String, required: false } // false
  }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);