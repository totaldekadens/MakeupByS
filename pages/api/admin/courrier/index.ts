import dbConnect from "../../../../utils/dbConnect";
import Courrier, { CourrierDocument } from "../../../../models/Courrier";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  if (!req.body) {
    return res.status(400).json({ success: false, data: "Check body" });
  }

  switch (method) {
    case "POST":
      try {
        const courrierExist = await Courrier.findOne({
          name: req.body.name,
        });

        if (courrierExist) {
          return res
            .status(403)
            .send({ success: false, data: "Courrier already exists" });
        }

        const newCourrier: CourrierDocument = req.body;

        const courrier = await Courrier.create(newCourrier);
        res.status(201).json({ success: true, data: courrier });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
