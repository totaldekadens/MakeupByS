import dbConnect from "../../../../utils/dbConnect";
import OrderStatus, {
  OrderStatusDocument,
} from "../../../../models/OrderStatus";
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
        // Fix validation for already existing orderStatus except the one you update

        const updateOrderStatus: OrderStatusDocument = req.body;

        const orderStatus = await OrderStatus.findOneAndUpdate(
          { _id: slug },
          updateOrderStatus,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!orderStatus) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: orderStatus });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    case "DELETE":
      try {
        const deletedOrderStatus = await OrderStatus.deleteOne({ _id: slug });
        if (deletedOrderStatus.deletedCount < 1) {
          return res
            .status(400)
            .json({ success: false, data: "OrderStatus not deleted" });
        }
        res
          .status(200)
          .json({ success: true, data: "OrderStatus is successfully deleted" });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
