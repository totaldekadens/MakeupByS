import dbConnect from "../../../../utils/dbConnect";
import SubProduct from "../../../../models/SubProduct";
import { NextApiRequest, NextApiResponse } from "next";
import MainProduct from "../../../../models/MainProduct";
import Category from "../../../../models/Category";
import Color from "../../../../models/Color";
import Season from "../../../../models/Season";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const subProducts = await SubProduct.find({})
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
        res.status(200).json({ success: true, data: subProducts });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
