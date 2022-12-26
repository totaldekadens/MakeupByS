import dbConnect from "../../../../utils/dbConnect";
import MainProduct from "../../../../models/MainProduct";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const mainProduct = await MainProduct.findOne({ _id: id });

        if (!mainProduct) {
          return res
            .status(400)
            .json({ success: false, data: "MainProduct not found" });
        }
        res.status(200).json({ success: true, data: mainProduct });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
