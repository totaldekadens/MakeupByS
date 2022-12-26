import dbConnect from "../../../../utils/dbConnect";
import SingleProduct from "../../../../models/SingleProduct";
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
        const singleProduct = await SingleProduct.findOne({ slug });

        if (!singleProduct) {
          return res
            .status(400)
            .json({ success: false, data: "SingleProduct not found" });
        }
        res.status(200).json({ success: true, data: singleProduct });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
