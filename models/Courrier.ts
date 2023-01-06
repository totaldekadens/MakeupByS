import mongoose, { Types } from "mongoose";
import { boolean, number } from "yup";
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
      id: { type: String, required: true },
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
      cost: [
        {
          maxWeight: { type: Number, required: true },
          minWeight: { type: Number, required: true },
          cost: { type: Number, required: true },
        },
      ],
    },
  ],
  image: { type: String, required: true },
});

type Cost = {
  minWeight: number;
  maxWeight: number;
  cost: number;
  _id?: string;
};

type Option = {
  id: string;
  title: string;
  description: string;
  description2: string;
  deliveryTime: {
    from: number;
    to: number;
    _id?: string;
  };
  cost: Cost[];
  free: boolean;
  freeFrom: { enabled: boolean; amount: number };
  _id?: string;
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
