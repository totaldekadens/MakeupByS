import mongoose from "mongoose";
import useSlugify from "../utils/useSlugify";

// Skall vi ha någon bild eller icon till säsongerna?

const SeasonSchema = new mongoose.Schema({
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

SeasonSchema.methods.setSlug = function (title: string) {
  const slug = useSlugify(title);

  this.slug = slug;
};

export type SeasonDocument = {
  title: string;
  description: string;
  slug: string;
};

export default mongoose.models.Season || mongoose.model("Season", SeasonSchema);
