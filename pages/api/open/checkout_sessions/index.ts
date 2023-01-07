import { LineItem } from "@stripe/stripe-js";
import { NextApiRequest, NextApiResponse } from "next";
import { IMAGES_MANIFEST } from "next/dist/shared/lib/constants";

import Stripe from "stripe";
import User from "../../../../models/User";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

// Creates an order
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      req.body.checkout.cartItems.forEach((item: any) => {
        item.price_data.unit_amount = item.price_data.unit_amount * 100;
      });

      // #100  Byt ut domän sedan.
      req.body.checkout.cartItems.forEach((item: any) => {
        let newImageUrl: string[] = [];
        item.price_data.product_data.images.forEach(
          (image: string, index: number) => {
            newImageUrl.push(
              `https://coral-app-4hlnm.ondigitalocean.app/uploads/${image}`
            );
            item.price_data.product_data.images = newImageUrl;
          }
        );
      });

      // Verkar funka om den blir undefined?
      const user = await User.findOne({ email: req.body.checkout.email });

      // Create Checkout Session
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer: user.stripeId,
        line_items: req.body.checkout.cartItems,
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/kassa`,
      });
      console.log(session);
      res.status(200).json(session.id);
    } catch (err) {
      res.status(500).json({ success: false, data: err });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
