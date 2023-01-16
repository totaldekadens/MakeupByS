import mongoose, { Schema, Types } from "mongoose";

const MainProductSchema = new mongoose.Schema<MainProductDocument>({
  description1: {
    type: String,
    required: true,
  },
  description2: {
    type: String,
  },
  partNo: {
    type: String,
    required: true,
    unique: true,
  },
  ingredients: {
    type: String,
    required: true,
    lowercase: true,
  },
  brand: {
    type: String,
    required: true,
    uppercase: true,
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  weight: {
    type: Number,
  },
  discount: {
    type: Number, // Percent?
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export type MainProductDocument = {
  description1: string;
  partNo: string;
  ingredients: string;
  brand: string;
  price: Schema.Types.Decimal128;
  category: Types.ObjectId;
  description2?: string;
  weight?: number;
  discount?: number;
  _id: Types.ObjectId;
};

export default mongoose.models.MainProduct ||
  mongoose.model("MainProduct", MainProductSchema);
