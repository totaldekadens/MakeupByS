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

  // Adjusts reserved quantity and available quantity on product when order is created
  switch (method) {
    case "PUT":
      try {
        // Gets data in right format
        const todayDate = new Date()
          .toISOString()
          .slice(0, 16)
          .replace("T", " ");

        // Gets product we want to change quantity on
        const subProduct = await SubProduct.findOne({
          _id: req.body.cartItem.price_data.product_data.metadata.id,
        });

        if (subProduct) {
          if (subProduct.availableQty >= req.body.cartItem.quantity) {
            const newAvailableQuantity =
              subProduct.availableQty - req.body.cartItem.quantity;

            const newreservedQuantity = subProduct.reservedQty
              ? subProduct.reservedQty + req.body.cartItem.quantity
              : 0 + req.body.cartItem.quantity;

            const product = await SubProduct.findOneAndUpdate(
              { _id: req.body.cartItem.price_data.product_data.metadata.id },
              {
                $set: {
                  availableQty: newAvailableQuantity,
                  reservedQty: newreservedQuantity,
                  lastUpdated: todayDate,
                },
              },
              {
                new: true,
                runValidators: true,
                multi: true,
              }
            );

            if (!product) {
              return res
                .status(400)
                .json({ success: false, data: "Product not updated" });
            }
            return res.status(200).json({ success: true, data: product });
          }
          return res.status(400).json({
            success: false,
            data: "Quantity didnt match DB, product not reserved",
          });
        }
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
