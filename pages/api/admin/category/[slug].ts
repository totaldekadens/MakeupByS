import dbConnect from "../../../../utils/dbConnect";
import Category, { CategoryDocument } from "../../../../models/Category";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { slug },
    method,
  } = req;

  await dbConnect();

  if (!req.body) {
    return res.status(400).json({ success: false, data: "Check body" });
  }

  switch (method) {
    case "PUT":
      try {
        // Fix validation for already existing category except the one you update

        const updateCategory: CategoryDocument = new Category();
        updateCategory._id = req.body._id;
        updateCategory.title = req.body.title;
        updateCategory.description = req.body.description;
        updateCategory.setSlug(req.body.title);

        const category = await Category.findOneAndUpdate(
          { slug },
          updateCategory,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!category) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    case "DELETE":
      try {
        const deletedCategory = await Category.deleteOne({ slug });
        console.log(deletedCategory);
        if (deletedCategory.deletedCount < 1) {
          return res
            .status(400)
            .json({ success: false, data: "Category not deleted" });
        }
        res
          .status(200)
          .json({ success: true, data: "Category is successfully deleted" });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
