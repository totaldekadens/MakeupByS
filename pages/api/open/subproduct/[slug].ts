import dbConnect from "../../../../utils/dbConnect";
import SubProduct from "../../../../models/SubProduct";
import { NextApiRequest, NextApiResponse } from "next";
import Category from "../../../../models/Category";
import MainProduct from "../../../../models/MainProduct";
import Color from "../../../../models/Color";
import Season from "../../../../models/Season";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { slug },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const subProduct = await SubProduct.findOne({ slug })
          .populate({
            path: "mainProduct",
            model: MainProduct,
            populate: {
              path: "category",
              model: Category,
            },
          })
          .populate({
            path: "colors",
            model: Color,
            populate: { path: "seasons", model: Season },
          });

        if (!subProduct) {
          return res
            .status(400)
            .json({ success: false, data: "SubProduct not found" });
        }
        res.status(200).json({ success: true, data: subProduct });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
