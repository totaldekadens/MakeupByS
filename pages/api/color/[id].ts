import dbConnect from "../../../utils/dbConnect";
import Color from "../../../models/Color";
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

  switch (method) {
    case "GET":
      try {
        const color = await Color.findOne({ id });

        if (!color) {
          return res
            .status(400)
            .json({ success: false, data: "Color not found" });
        }
        res.status(200).json({ success: true, data: color });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
