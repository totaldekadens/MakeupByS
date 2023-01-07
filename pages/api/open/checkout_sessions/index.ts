import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import User from "../../../../models/User";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

// Creates an order in stripe
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      if (!req.body) {
        return res.status(400).json({ success: false, data: "Check body" });
      }

      // Needed to do the amount times 100 to be correct with the amount in stripe
      req.body.cartItems.forEach((item: any) => {
        item.price_data.unit_amount = item.price_data.unit_amount * 100;
      });

      // #100  Byt ut domän sedan.
      // Added liveURL to images so they can be displayed in stripe
      req.body.cartItems.forEach((item: any) => {
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

      // Check if user exists
      const user = await User.findOne({ email: req.body.email });

      // Create Checkout Session
      if (user) {
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          currency: "sek",
          payment_method_types: ["card"],
          customer: user ? user.stripeId : null,
          line_items: req.body.cartItems,
          success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/kassa`,
        });

        res.status(200).json({ success: true, data: session.id });
      } else {
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          currency: "sek",
          payment_method_types: ["card"],
          line_items: req.body.cartItems,
          customer_email: req.body.email,
          success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/kassa`,
        });

        res.status(200).json({ success: true, data: session.id });
      }
    } catch (err) {
      res.status(500).json({ success: false, data: err });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
