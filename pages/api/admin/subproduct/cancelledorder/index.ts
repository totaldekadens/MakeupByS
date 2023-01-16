import dbConnect from "../../../../../utils/dbConnect";
import SubProduct from "../../../../../models/SubProduct";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  if (!req.body) {
    return res.status(400).json({ success: false, data: "Check body" });
  }

  // Adjusts reserved quantity and available quantity on product when order is cancelled
  switch (method) {
    case "PUT":
      try {
        const todayDate = new Date()
          .toISOString()
          .slice(0, 16)
          .replace("T", " ");

        // Gets product we want to change quantity on
        const getProduct = await SubProduct.findOne({
          _id: req.body.price_data.product_data.metadata.id,
        });

        if (!getProduct) {
          return res
            .status(404)
            .json({ success: false, data: "Product not found" });
        }

        if (getProduct.reservedQty < req.body.quantity) {
          return res
            .status(400)
            .json({ success: false, data: "Not enough quantity in DB" });
        }

        getProduct.reservedQty = getProduct.reservedQty - req.body.quantity;
        getProduct.availableQty = getProduct.availableQty + req.body.quantity;
        getProduct.lastUpdated = todayDate;

        const subProduct = await SubProduct.findOneAndUpdate(
          { _id: req.body.price_data.product_data.metadata.id },
          getProduct,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!subProduct) {
          return res
            .status(404)
            .json({ success: false, data: "Product not found" });
        }
        res.status(200).json({ success: true, data: subProduct });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
