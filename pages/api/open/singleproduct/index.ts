import dbConnect from "../../../../utils/dbConnect";
import SingleProduct from "../../../../models/SingleProduct";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const singleProducts = await SingleProduct.find({});

        res.status(200).json({ success: true, data: singleProducts });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
