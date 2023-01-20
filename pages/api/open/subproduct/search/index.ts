import dbConnect from "../../../../../utils/dbConnect";
import SubProduct from "../../../../../models/SubProduct";
import { NextApiRequest, NextApiResponse } from "next";
import Category from "../../../../../models/Category";
import MainProduct from "../../../../../models/MainProduct";
import Color from "../../../../../models/Color";
import Season from "../../../../../models/Season";
import { PopulatedProduct } from "../../../../../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const subProduct: PopulatedProduct[] = await SubProduct.find({})
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

        // Failed to filter with mongoose.. This is a remporary solution
        const searchValue: string = req.body.value;
        const firstCapital =
          searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
        const filterList = subProduct.filter(
          (product) =>
            product.title.includes(searchValue.toUpperCase()) ||
            product.mainProduct.brand.includes(searchValue.toUpperCase()) ||
            product.mainProduct.category.title.includes(firstCapital)
        );

        const slicedArray = filterList.slice(0, 8);
        res.status(200).json({ success: true, data: slicedArray });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
