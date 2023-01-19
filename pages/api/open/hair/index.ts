import dbConnect from "../../../../utils/dbConnect";
import Hair from "../../../../models/Hair";
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
        const hairs = await Hair.find({});
        res.status(200).json({ success: true, data: hairs });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
