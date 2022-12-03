import dbConnect from "../../../utils/dbConnect";
import Category from "../../../models/Category";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  console.log(req.body);

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const categories = await Category.find({});
        res.status(200).json({ success: true, data: categories });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const categoryExist = await Category.findOne({
          title: req.body.title,
        });
        //console.log(categoryExist);
        if (categoryExist) {
          return res
            .status(403)
            .send({ success: false, data: "Kategorin existerar redan" });
        }

        const newCategory = new Category();
        newCategory.title = req.body.title;
        newCategory.description = req.body.description;
        newCategory.setSlug(req.body.title);

        const category = await Category.create(newCategory);
        res.status(201).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
