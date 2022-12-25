import caseInsensitive from "../../../utils/caseCheck";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { SessionStrategy, unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    // Exempel. User skall inte vara här.
    switch (method) {
      case "GET":
        try {
          const users = await User.find({});
          res.json({ success: true, data: users });
        } catch (error) {
          res.json({ success: false, data: "Hittade ingen användare" });
        }
        break;
      case "POST":
        try {
          const emailTaken = await User.findOne({
            email: caseInsensitive(req.body.email),
          });
          if (emailTaken) {
            return res
              .status(403)
              .send({ success: false, data: "Email taken" });
          }

          let newUser = new User();
          newUser.email = req.body.email;
          newUser.setPassword(req.body.password);

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
  } else {
    res.json({ success: false, data: "You are not authorized" });
  }
}
