import dbConnect from "../../../../../utils/dbConnect";
import SubProduct from "../../../../../models/SubProduct";
import { NextApiRequest, NextApiResponse } from "next";
import Category from "../../../../../models/Category";
import MainProduct from "../../../../../models/MainProduct";
import Color from "../../../../../models/Color";
import Season from "../../../../../models/Season";
import { PopulatedProduct } from "../../../../../utils/types";
import ColorTag from "../../../../../models/ColorTag";

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
            populate: [
              { path: "seasons", model: Season },
              { path: "colorTag", model: ColorTag },
            ],
          });

        if (!subProduct) {
          return res
            .status(400)
            .json({ success: false, data: "SubProduct not found" });
        }

        // Failed to filter with mongoose.. This is a remporary solution
        const searchValue: string = req.body.value;
        searchValue.toLowerCase();
        const filterList = subProduct.filter(
          (product) =>
            product.title.toLowerCase().includes(searchValue) ||
            product.mainProduct.brand.toLowerCase().includes(searchValue) ||
            product.mainProduct.category.title
              .toLowerCase()
              .includes(searchValue) ||
            product.colors[0].colorTag?.color
              .toLowerCase()
              .includes(searchValue)
        );

        // sorts the list that the most active parts gets on top
        filterList.sort((a, b) => (a.lastUpdated < b.lastUpdated ? 1 : -1));

        const slicedArray = filterList.slice(0, 10);
        res.status(200).json({ success: true, data: slicedArray });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
