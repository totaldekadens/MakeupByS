import dbConnect from "../../../../utils/dbConnect";
import Order, { OrderDocument } from "../../../../models/Order";
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

  if (!req.body) {
    return res.status(400).json({ success: false, data: "Check body" });
  }

  switch (method) {
    case "PUT":
      try {
        // Shall be able to update status. And depending on status different updates need to be made.
        const updateOrder: OrderDocument = req.body;

        const order = await Order.findOneAndUpdate({ _id: slug }, updateOrder, {
          new: true,
          runValidators: true,
        });
        if (!order) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: order });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    case "DELETE":
      try {
        // Shall we be able to delete or shall the order just be "Avbruten ? "
        const deletedOrder = await Order.deleteOne({ _id: slug });
        if (deletedOrder.deletedCount < 1) {
          return res
            .status(400)
            .json({ success: false, data: "Order not deleted" });
        }
        res
          .status(200)
          .json({ success: true, data: "Order is successfully deleted" });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
