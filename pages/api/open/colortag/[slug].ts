import dbConnect from "../../../../utils/dbConnect";
import ColorTag from "../../../../models/ColorTag";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { slug },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const colorTag = await ColorTag.findOne({ slug });

        if (!colorTag) {
          return res
            .status(400)
            .json({ success: false, data: "Color tag not found" });
        }
        res.status(200).json({ success: true, data: colorTag });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
