import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import Order, { OrderDocument } from "../../../../models/Order";
import OrderStatus from "../../../../models/OrderStatus";
import SubProduct from "../../../../models/SubProduct";
import User from "../../../../models/User";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

// Creates an order in stripe
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (!req.body) {
    return res.status(400).json({ success: false, data: "Check body" });
  }

  if (method === "POST") {
    try {
      // If order no already exist don't continue
      const findOrder = await Order.findOne({
        orderNoStripe: req.body.sessionId,
      });
      if (findOrder) {
        res
          .status(400)
          .json({ success: false, data: "Ordern existerar redan" });
        return;
      }

      // Gets data in right format
      const todayDate = new Date().toISOString().slice(0, 16).replace("T", " ");

      // Gets existing user
      const user = await User.findOne({
        email: req.body.checkout.email,
      });

      // Gets status. Could be better. Had problem vid Id
      const orderStatus = await OrderStatus.findOne({
        status: "Behandlas",
      });

      // Creates order no in an ascending order
      let createOrderNumber;
      const findOrders = await Order.find({});

      if (findOrders.length == 0) {
        createOrderNumber = 1;
      } else {
        findOrders.sort((a, b) => (a.orderNo < b.orderNo ? 1 : -1));
        createOrderNumber = Number(findOrders[0].orderNo) + 1;
      }

      // Creates order
      const newOrder: OrderDocument = new Order();
      newOrder.orderNo = createOrderNumber;
      newOrder.orderNoStripe = req.body.sessionId;
      newOrder.status = orderStatus._id;
      newOrder.name = req.body.checkout.address.delivery
        ? req.body.checkout.name
        : user
        ? user.name
        : req.body.checkout.name;
      newOrder.phone = req.body.checkout.address.delivery
        ? req.body.checkout.phone
        : user
        ? user.phone
        : req.body.checkout.phone;
      newOrder.email = req.body.checkout.email;
      newOrder.invoiceAddress = user ? user.address : req.body.checkout.invoice;
      newOrder.deliveryAddress = req.body.checkout.address.delivery;
      newOrder.courrier = req.body.checkout.courrier;
      newOrder.existingCustomer = user ? user._id : null;
      newOrder.lineItems = req.body.checkout.cartItems;
      newOrder.registerDate = todayDate;

      const order = await Order.create(newOrder);

      res.status(200).json({ success: true, data: order });
    } catch (err) {
      res.status(500).json({ success: false, data: err });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

export const tjo = async (req: NextApiRequest, res: NextApiResponse) => {};
