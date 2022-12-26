import mongoose, { Types } from "mongoose";
import useSlugify from "../utils/useSlugify";

const SingleProductSchema = new mongoose.Schema<SingleProductDocument>({
  title: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  description1: {
    type: String,
    required: true,
  },
  description2: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  partNo: {
    type: String,
    required: true,
    unique: true,
  },
  ingredients: {
    type: String,
    required: true,
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
  images: [
    {
      type: String,
      required: true,
    },
  ],
  availableQty: {
    type: Number,
  },
  reservedQty: {
    type: Number,
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
  colors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
      required: true,
    },
  ],
});

SingleProductSchema.methods.setSlug = function (title: string) {
  const slug = useSlugify(title);

  this.slug = slug;
};

export type SingleProductDocument = {
  title: string;
  description1: string;
  description2?: string;
  partNo: string;
  ingredients: string;
  slug: string;
  brand: string;
  price: Types.Decimal128;
  images: string[];
  setSlug: (title: String) => void;
  colors: Types.ObjectId[];
  category: Types.ObjectId;
  availableQty?: number;
  weight?: number;
  reservedQty?: number;
  discount?: number;
  _id?: Types.ObjectId;
};

export default mongoose.models.SingleProduct ||
  mongoose.model("SingleProduct", SingleProductSchema);
