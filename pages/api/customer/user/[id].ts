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
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  if (!req.body) {
    return res.status(400).json({ success: false, data: "Check body" });
  }

  switch (method) {
    case "GET":
      try {
        // Inlogged user needs to match the required user
        //Todo:  Fix middleware that compare user id with the required id. If not match you should be redirected instead. permission denied.

        const user = await User.findOne({ _id: id });
        if (!user) {
          return res
            .status(400)
            .json({ success: false, data: "User not found" });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    case "PUT":
      try {
        // Check for a better solution
        const updateUser: UserDocument = new User();
        updateUser._id = req.body._id;
        updateUser.name = req.body.updateCustomerInStripe.name;
        updateUser.address = req.body.updateCustomerInStripe.address;
        updateUser.phone = req.body.updateCustomerInStripe.phone;
        updateUser.password = req.body.password;

        const user = await User.findOneAndUpdate({ id }, updateUser, {
          new: true,
          runValidators: true,
        });

        if (!user) {
          return res
            .status(400)
            .json({ success: false, data: "User not found" });
        }

        const customer = await stripe.customers.update(
          req.body.stripeId,
          req.body.updateCustomerInStripe
        );

        if (!customer) {
          return res.status(400).json({
            success: false,
            data: "User updated in DB but not found in stripe",
          });
        }

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
