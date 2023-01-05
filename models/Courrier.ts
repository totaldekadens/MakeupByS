import mongoose, { Types } from "mongoose";
import { number } from "yup";
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
      description: { type: String, required: true },
      description2: { type: String, required: true },
      deliveryTime: {
        from: { type: Number, required: true },
        to: { type: Number, required: true },
      },
      cost: [
        {
          maxWeight: { type: Number, required: true },
          cost: { type: Number, required: true },
        },
      ],
    },
  ],
  image: { type: String, required: true },
});

type Cost = {
  maxWeight: number;
  cost: number;
};

type Option = {
  title: string;
  description: string;
  description2: string;
  deliveryTime: {
    from: number;
    to: number;
  };
  cost: Cost[];
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
