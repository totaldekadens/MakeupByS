import dbConnect from "../../../../utils/dbConnect";
import Order, { OrderDocument } from "../../../../models/Order";
import { NextApiRequest, NextApiResponse } from "next";
import OrderStatus from "../../../../models/OrderStatus";
import User from "../../../../models/User";

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
        const order = await Order.find({ email: slug })
          .populate({
            path: "status",
            model: OrderStatus,
          })
          .populate({
            path: "existingCustomer",
            model: User,
          });
        if (!order) {
          return res
            .status(400)
            .json({ success: false, data: "Orders not found" });
        }
        res.status(200).json({ success: true, data: order });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
