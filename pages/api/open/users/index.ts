import caseInsensitive from "../../../../utils/caseCheck";
import dbConnect from "../../../../utils/dbConnect";
import User, { UserDocument } from "../../../../models/User";
import { NextApiRequest, NextApiResponse } from "next";
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
        if (!req.body) {
          return res.status(400).json({ success: false, data: "Bad request" });
        }
        const emailTaken = await User.findOne({
          email: caseInsensitive(req.body.email),
        });
        if (emailTaken) {
          return res
            .status(403)
            .send({ success: false, data: "Email address already exist" });
        }

        const customer = await stripe.customers.create(
          req.body.createCustomerInStripe
        );

        let newUser: UserDocument = new User();
        newUser.stripeId = customer.id;
        newUser.name = req.body.createCustomerInStripe.name;
        newUser.email = req.body.email;
        newUser.setPassword(req.body.password);
        newUser.address = req.body.createCustomerInStripe.address;
        newUser.phone = req.body.createCustomerInStripe.phone;

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
