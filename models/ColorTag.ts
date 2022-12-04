import mongoose from "mongoose";
import useSlugify from "../utils/useSlugify";

const ColorTagSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
    unique: true,
  },
  hexcode: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

ColorTagSchema.methods.setSlug = function (color: string) {
  const slug = useSlugify(color);

  this.slug = slug;
};

export type ColorTagDocument = {
  color: string;
  slug: string;
  hexcode: string;
  setSlug: (title: string) => void;
  _id: string;
};

export default mongoose.models.ColorTag ||
  mongoose.model("ColorTag", ColorTagSchema);
