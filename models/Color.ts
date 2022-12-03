import mongoose from "mongoose";
import { ColorTagDocument } from "./ColorTag";

const ColorSchema = new mongoose.Schema({
  hexcode: {
    type: String,
    required: true,
    unique: true,
  },
  colortag: {
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

export type SeasonDocument = {
  hexColor: string;
  colorTag: ColorTagDocument[];
  season: SeasonDocument[];
  _id: string;
};

export default mongoose.models.Color || mongoose.model("Color", ColorSchema);
