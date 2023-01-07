import dbConnect from "../../../../../utils/dbConnect";
import Order, { OrderDocument } from "../../../../../models/Order";
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
        // Get orders by status later. Not fixed yet

        const Orders = await Order.find({});
        /*  .populate({
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
            populate: { path: "seasons", model: Season },
          }); */
        res.status(200).json({ success: true, data: Orders });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
