import dbConnect from "../../../../utils/dbConnect";
import Courrier, { CourrierDocument } from "../../../../models/Courrier";
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

  if (!req.body) {
    return res.status(400).json({ success: false, data: "Check body" });
  }

  // Lägg till GET by id här också

  switch (method) {
    case "PUT":
      try {
        // Fix validation for already existing courrier except the one you update

        const updateCourrier: CourrierDocument = req.body;

        const courrier = await Courrier.findOneAndUpdate(
          { slug },
          updateCourrier,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!courrier) {
          return res
            .status(400)
            .json({ success: false, data: "Courrier not updated" });
        }
        res.status(200).json({ success: true, data: courrier });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    case "DELETE":
      try {
        const deletedCourrier = await Courrier.deleteOne({ slug });
        if (deletedCourrier.deletedCount < 1) {
          return res
            .status(400)
            .json({ success: false, data: "Courrier not deleted" });
        }
        res
          .status(200)
          .json({ success: true, data: "Courrier successfully deleted" });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
