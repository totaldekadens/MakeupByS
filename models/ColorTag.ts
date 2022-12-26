import mongoose, { Types } from "mongoose";
import useSlugify from "../utils/useSlugify";

const ColorTagSchema = new mongoose.Schema<ColorTagDocument>({
  color: {
    type: String,
    required: true,
    unique: true,
  },
  hexcolor: {
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
  hexcolor: string;
  setSlug: (title: String) => void;
  _id?: Types.ObjectId;
};

export default mongoose.models.ColorTag ||
  mongoose.model("ColorTag", ColorTagSchema);
