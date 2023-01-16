import mongoose, { Types } from "mongoose";
import useSlugify from "../utils/useSlugify";

const CategorySchema = new mongoose.Schema<CategoryDocument>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

CategorySchema.methods.setSlug = function (title: string) {
  const slug = useSlugify(title);

  this.slug = slug;
};

export type CategoryDocument = {
  title: string;
  description: string;
  slug: string;
  setSlug: (title: String) => void;
  _id: Types.ObjectId;
};

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
