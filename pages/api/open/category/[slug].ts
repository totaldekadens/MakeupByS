import dbConnect from "../../../../utils/dbConnect";
import Category from "../../../../models/Category";
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

  switch (method) {
    case "GET":
      try {
        const category = await Category.findOne({ slug });

        if (!category) {
          return res
            .status(400)
            .json({ success: false, data: "Category not found" });
        }
        res.status(200).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
