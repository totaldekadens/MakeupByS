import mongoose, { Types } from "mongoose";
import useSlugify from "../utils/useSlugify";

const SubProductSchema = new mongoose.Schema<SubProductDocument>({
  mainProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MainProduct",
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
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
    uppercase: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  colors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
      required: true,
    },
  ],
  availableQty: {
    type: Number,
  },
  reservedQty: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  createdDate: {
    type: String,
  },
  lastUpdated: {
    type: String,
  },
});

SubProductSchema.methods.setSlug = function (title: string) {
  const slug = useSlugify(title);

  this.slug = slug;
};

export type SubProductDocument = {
  mainProduct: Types.ObjectId;
  title: string;
  partNo: string;
  slug: string;
  images: string[];
  setSlug?: (title: String) => void;
  colors: Types.ObjectId[];
  createdDate?: string;
  lastUpdated?: string;
  availableQty?: number;
  reservedQty?: number;
  discount?: number;
  _id?: Types.ObjectId;
};

export default mongoose.models.SubProduct ||
  mongoose.model("SubProduct", SubProductSchema);
