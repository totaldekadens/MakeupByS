import dbConnect from "../../../../utils/dbConnect";
import Category, { CategoryDocument } from "../../../../models/Category";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const categoryExist = await Category.findOne({
          title: req.body.title,
        });

        if (categoryExist) {
          return res
            .status(403)
            .send({ success: false, data: "Category already exists" });
        }

        const newCategory: CategoryDocument = new Category();
        newCategory.title = req.body.title;
        newCategory.description = req.body.description;
        newCategory.setSlug(req.body.title);

        const category = await Category.create(newCategory);
        res.status(201).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
