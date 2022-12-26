import dbConnect from "../../../../utils/dbConnect";
import SubProduct from "../../../../models/SubProduct";
import { NextApiRequest, NextApiResponse } from "next";
import Category from "../../../../models/Category";

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
            populate: { path: "category" },
          })
          .populate({ path: "colors", populate: { path: "seasons" } });

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
