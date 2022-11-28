import caseInsensitive from "../../../utils/caseCheck";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

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
            .send({ success: false, data: "Mailadressen existerar redan" });
        }

        let newUser = new User();
        newUser.email = req.body.email;
        newUser.setPassword(req.body.password);

        const user = await User.create(newUser);
        res.status(201).json({ success: true, data: user._id });
      } catch (error) {
        res.json({ message: "catch error" });
      }
      break;
    default:
      res.json({ message: "break error" });
      break;
  }
}
