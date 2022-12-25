import dbConnect from "../../../utils/dbConnect";
import Color from "../../../models/Color";
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
        const colors = await Color.find({})
          .populate("colorTag")
          .populate("seasons");
        console.log(colors);
        res.status(200).json({ success: true, data: colors });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
