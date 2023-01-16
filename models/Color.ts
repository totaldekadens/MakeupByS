import mongoose, { Types } from "mongoose";

const ColorSchema = new mongoose.Schema<ColorDocument>({
  hexcolor: {
    type: String,
    required: true,
    unique: true,
  },
  colorTag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ColorTag",
    required: true,
  },
  seasons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Season",
      required: true,
    },
  ],
});

export type ColorDocument = {
  hexcolor: string;
  colorTag: Types.ObjectId;
  seasons: Types.ObjectId[];
  _id: Types.ObjectId;
};

export default mongoose.models.Color || mongoose.model("Color", ColorSchema);
