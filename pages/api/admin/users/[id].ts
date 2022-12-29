import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  if (!req.method) {
    return res.status(400).json({ success: false, data: "Check method" });
  }

  switch (method) {
    case "GET":
      try {
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
    case "DELETE":
      try {
        const deletedUser = await User.deleteOne({ _id: id });
        if (deletedUser.deletedCount < 1) {
          return res
            .status(400)
            .json({ success: false, data: "User not deleted" });
        }
        res
          .status(200)
          .json({ success: true, data: "User is successfully deleted" });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
