import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

export type RestrictedUser = {
  name: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    postal_code: string;
    city: string;
    country: string;
  };
  phone?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { slug },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const user = await User.findOne({ email: slug });
        if (!user) {
          return res
            .status(400)
            .json({ success: false, data: "User not found" });
        }

        var censoredPhone =
          user.phone.slice(0, 3) +
          "*".repeat(user.phone.length - 1) +
          user.phone.slice(-2);

        const restrictedUser: RestrictedUser = {
          name: user.name,
          email: user.email,
          address: user.address,
          phone: censoredPhone,
        };

        res.status(200).json({ success: true, data: restrictedUser });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
