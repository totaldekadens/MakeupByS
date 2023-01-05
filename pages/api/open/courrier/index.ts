import dbConnect from "../../../../utils/dbConnect";
import Courrier from "../../../../models/Courrier";
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
        const courriers = await Courrier.find({});
        res.status(200).json({ success: true, data: courriers });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
