import dbConnect from "../../../../utils/dbConnect";
import SubProduct from "../../../../models/SubProduct";
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
        const subProducts = await SubProduct.find({})
          .populate({
            path: "mainProduct",
            populate: { path: "category" },
          })
          .populate({ path: "colors", populate: { path: "seasons" } });
        console.log(subProducts);
        res.status(200).json({ success: true, data: subProducts });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
