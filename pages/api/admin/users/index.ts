import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
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
        res.json({ success: false, data: "Users not found" });
      }
      break;
    default:
      res.json({ success: false, data: "Break error" });
      break;
  }
}
