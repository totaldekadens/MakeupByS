import dbConnect from "../../../../utils/dbConnect";
import MainProduct from "../../../../models/MainProduct";
import { NextApiRequest, NextApiResponse } from "next";
import { CategoryDocument } from "../../../../models/Category";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const mainProducts = await MainProduct.find({});

        res.status(200).json({ success: true, data: mainProducts });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
