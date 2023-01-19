import dbConnect from "../../../../utils/dbConnect";
import Eye from "../../../../models/Eyes";
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
        const eyes = await Eye.find({});
        res.status(200).json({ success: true, data: eyes });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
