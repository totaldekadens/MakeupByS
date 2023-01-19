import mongoose, { Types } from "mongoose";

const SkinSchema = new mongoose.Schema<SkinDocument>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  seasons: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      best: { type: String, required: true },
      worst: { type: String, required: true },
      bool: { type: Boolean, required: true },
    },
  ],
});

export type BoolType = {
  name: string;
  bool: boolean;
  worst: string;
  best: string;
  description: string;
};
export type SkinDocument = {
  _id: Types.ObjectId;
  name: string;
  type: string;
  image: string;
  seasons: BoolType[];
};

export default mongoose.models.Skin || mongoose.model("Skin", SkinSchema);
