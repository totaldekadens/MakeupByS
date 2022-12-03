import dbConnect from "../../../utils/dbConnect";
import Category from "../../../models/Category";
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

  //console.log(req.body);
  switch (method) {
    case "GET" /* Get a category by its slug */:
      try {
        const category = await Category.findOne({ slug });

        if (!category) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a category by its slug */:
      try {
        //console.log(req.body);
        /* const categoryExist = await Category.findOne({
          title: req.body.title,
        });
        if (categoryExist._id != req.body._id) {
          return res.status(403).send({
            success: false,
            data: "Kategorin existerar redan på ett annat id",
          });
        }
        console.log(categoryExist); */

        const updateCategory = new Category();
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
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a category by its slug */:
      try {
        const deletedCategory = await Category.deleteOne({ slug });
        if (!deletedCategory) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
