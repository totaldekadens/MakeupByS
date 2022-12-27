import caseInsensitive from "../../../../utils/caseCheck";
import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { loadStripe } from "@stripe/stripe-js";
import initStripe from "stripe";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const emailTaken = await User.findOne({
          email: caseInsensitive(req.body.email),
        });
        if (emailTaken) {
          return res
            .status(403)
            .send({ success: false, data: "Email address already exist" });
        }

        let newUser = new User();
        newUser.email = req.body.email;
        newUser.setPassword(req.body.password);

        const customer = await stripe.customers.create({
          email: req.body.email,
          name: "Angelica Moberg Skoglund",
          address: {
            line1: "Öresten Ryd 4",
            line2: "",
            postal_code: "51191",
            city: "Skene",
            country: "Sverige",
          },
          phone: "0767106199",
        });

        console.log(customer);

        const user = await User.create(newUser);
        res.status(201).json({ success: true, data: user._id });
      } catch (error) {
        res.json({ success: false, data: error });
      }
      break;
    default:
      res.json({ success: false, data: "break error" });
      break;
  }
}
