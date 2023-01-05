import mongoose, { TrigonometryExpressionOperator, Types } from "mongoose";
import { Address } from "./User";

const CourrierSchema = new mongoose.Schema<CourrierDocument>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    line1: { type: String, required: true },
    line2: { type: String },
    postal_code: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  contact: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
  },
  options: [
    {
      title: { type: String, required: true },
      deliveryTime: { type: String, required: true },
      cost: { type: Number, required: true },
    },
  ],
  image: { type: String, required: true },
});

type Option = {
  title: string;
  deliveryTime: string;
  cost: number;
};

export type CourrierDocument = {
  name: string;
  address: Address;
  email: string;
  image: string;
  contact: {
    name: string;
    email: string;
    phone?: string;
  };
  options: Option[];
  phone?: string;
  _id?: Types.ObjectId;
};

export default mongoose.models.Courrier ||
  mongoose.model("Courrier", CourrierSchema);
