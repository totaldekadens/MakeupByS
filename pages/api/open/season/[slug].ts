import dbConnect from "../../../../utils/dbConnect";
import Season from "../../../../models/Season";
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
        const season = await Season.findOne({ slug });

        if (!season) {
          return res
            .status(400)
            .json({ success: false, data: "Season not found" });
        }
        res.status(200).json({ success: true, data: season });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
