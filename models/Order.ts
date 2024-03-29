import mongoose, { Types } from "mongoose";
import { LineItem } from "../components/cart/AddToCartIcon";

import { ChosenOption } from "../components/checkout/Courrier";
import { Cost, Option } from "./Courrier";
import { Address } from "./User";

const OrderSchema = new mongoose.Schema<OrderDocument>({
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderStatus",
    required: true,
  },
  orderNo: {
    type: Number,
    required: true,
    unique: true,
  },
  orderNoStripe: {
    type: String,
    required: true,
    unique: true,
  },
  existingCustomer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  courrier: {
    name: { type: String, required: true },
    info: {
      id: { type: String, required: true },
      _id: { type: Types.ObjectId },
      title: { type: String, required: true },
      description: { type: String, required: true },
      description2: { type: String, required: true },
      free: { type: Boolean, default: false },
      freeFrom: {
        enabled: { type: Boolean, default: false },
        amount: { type: Number },
      },
      deliveryTime: {
        from: { type: Number, required: true },
        to: { type: Number, required: true },
      },
      cost: { type: Number, required: true },
    },
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
          images: [{ type: String, required: true }],
          metadata: {
            id: { type: String, required: true },
            weight: { type: Number, required: true },
          },
        },
      },
    },
  ],
  invoiceAddress: {
    line1: { type: String, required: true },
    line2: { type: String },
    postal_code: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  deliveryAddress: {
    line1: { type: String },
    line2: { type: String },
    postal_code: { type: String },
    city: { type: String },
    country: { type: String },
  },
  registerDate: { type: String },
  shippingDate: { type: String },
});

export type OrderDocument = {
  status: Types.ObjectId;
  orderNo: Number;
  orderNoStripe: string;
  existingCustomer: Types.ObjectId;
  lineItems: LineItem[];
  courrier: {
    name: string;
    info: ChosenOption;
  };
  name: string;
  email: string;
  phone: string;
  invoiceAddress: Address;
  deliveryAddress?: Address;
  registerDate: string;
  shippingDate: string;
  _id?: Types.ObjectId;
};

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
