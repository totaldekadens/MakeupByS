import dbConnect from "../../../../utils/dbConnect";
import OrderStatus, {
  OrderStatusDocument,
} from "../../../../models/OrderStatus";
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

  switch (method) {
    case "POST":
      try {
        const orderStatusExist = await OrderStatus.findOne({
          status: req.body.status,
        });

        if (orderStatusExist) {
          return res
            .status(403)
            .send({ success: false, data: "OrderStatus already exists" });
        }

        const newOrderStatus: OrderStatusDocument = req.body;

        const orderStatus = await OrderStatus.create(newOrderStatus);
        res.status(201).json({ success: true, data: orderStatus });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
