import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { LineItem } from "../../../../components/AddToCartIcon";
import ProductCard from "../../../../components/ProductCard";
import Order from "../../../../models/Order";
import SubProduct, { SubProductDocument } from "../../../../models/SubProduct";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

// Creates an order in stripe
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { slug },
    method,
  } = req;

  if (req.method === "POST") {
    try {
      if (!req.body) {
        return res.status(400).json({ success: false, data: "Check body" });
      }

      const findOrder = await Order.findOne({
        orderNoStripe: req.body.sessionId,
      });
      if (findOrder) {
        res
          .status(400)
          .json({ success: false, data: "Ordern existerar redan" });
        return;
      }

      const findSession = await stripe.checkout.sessions.retrieve(
        req.body.sessionId
      );

      if (findSession.payment_status == "paid") {
        res.status(200).json({ success: true, data: findSession });
      }

      res.status(400).json({ success: false, data: "Ordern är inte betald" });
    } catch (err) {
      res.status(500).json({ success: false, data: err });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

export const tjo = async (req: NextApiRequest, res: NextApiResponse) => {};
