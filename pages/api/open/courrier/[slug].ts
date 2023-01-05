import dbConnect from "../../../../utils/dbConnect";
import Courrier from "../../../../models/Courrier";
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
        const courrier = await Courrier.findOne({ slug });

        if (!courrier) {
          return res
            .status(400)
            .json({ success: false, data: "Courrier tag not found" });
        }
        res.status(200).json({ success: true, data: courrier });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
