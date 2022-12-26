import dbConnect from "../../../../utils/dbConnect";
import Season from "../../../../models/Season";
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
        const seasons = await Season.find({});
        res.status(200).json({ success: true, data: seasons });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
