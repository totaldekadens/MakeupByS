import mongoose, { Types } from "mongoose";
import { LineItem } from "../components/AddToCartIcon";

const OrderSchema = new mongoose.Schema<OrderDocument>({
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderStatus",
    required: true,
  },
  orderNo: {
    type: String,
    required: true,
  },
  orderNoStripe: {
    type: String,
    required: true,
  },
  existingCustomer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  lineItems: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      price_data: {
        currency: { type: String, required: true },
        unit_amount: {
          type: Number,
          required: true,
        },
        product_data: {
          name: { type: String, required: true },
          description: { type: String, required: true },
          images: [{ type: String, required: true }],
          metadata: {
            id: { type: String, required: true },
            weight: { type: Number, required: true },
          },
        },
      },
    },
  ],
  registerDate: { type: String },
  shippingDate: { type: String },
});

export type OrderDocument = {
  status: Types.ObjectId;
  orderNo: string;
  orderNoStripe: string;
  existingCustomer: Types.ObjectId;
  lineItems: LineItem[];
  registerDate: string;
  shippingDate: string;
  _id?: Types.ObjectId;
};

export default mongoose.models.OrderStatus ||
  mongoose.model("OrderStatus", OrderSchema);
