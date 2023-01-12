import dbConnect from "../../../../utils/dbConnect";
import Order, { OrderDocument } from "../../../../models/Order";
import { NextApiRequest, NextApiResponse } from "next";
import OrderStatus from "../../../../models/OrderStatus";
import User from "../../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        if (!req.body) {
          return res.status(400).json({ success: false, data: "Check body" });
        }

        const orderExist = await Order.findOne({
          status: req.body.status,
        });

        if (orderExist) {
          return res
            .status(403)
            .send({ success: false, data: "Order already exists" });
        }

        const newOrder: OrderDocument = req.body;

        const order = await Order.create(newOrder);
        res.status(201).json({ success: true, data: order });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;

    case "PUT":
      try {
        // Shall be able to update status. And depending on status different updates need to be made.
        const todayDate = new Date()
          .toISOString()
          .slice(0, 16)
          .replace("T", " ");

        const updateOrder: OrderDocument = req.body;

        // Make this one dynammic. shall check if its status "Färdigbehandlad"
        if (req.body.status == "63b94ba666d02095eb80e865") {
          updateOrder.shippingDate = todayDate;

          // Remove quantity on products (reserved quantity)
        }

        const order = await Order.findOneAndUpdate(
          { _id: req.body._id },
          updateOrder,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!order) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: order });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    case "GET":
      try {
        const Orders = await Order.find({})
          .populate({
            path: "status",
            model: OrderStatus,
          })
          .populate({
            path: "existingCustomer",
            model: User,
          });
        res.status(200).json({ success: true, data: Orders });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
