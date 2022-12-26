import dbConnect from "../../../../utils/dbConnect";
import ColorTag from "../../../../models/ColorTag";
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
        const colorTags = await ColorTag.find({});
        res.status(200).json({ success: true, data: colorTags });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
