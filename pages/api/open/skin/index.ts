import dbConnect from "../../../../utils/dbConnect";
import Skin from "../../../../models/Skin";
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
        const skins = await Skin.find({});
        res.status(200).json({ success: true, data: skins });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
