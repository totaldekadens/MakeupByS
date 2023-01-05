import dbConnect from "../../../../utils/dbConnect";
import Courrier, { CourrierDocument } from "../../../../models/Courrier";
import { NextApiRequest, NextApiResponse } from "next";
import useValidateHexcode from "../../../../utils/useValidateHexcode";

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
          color: req.body.color,
        });
        if (courrierExist) {
          return res
            .status(403)
            .send({ success: false, data: "Color tag already exists" });
        }
        const validateHexcode = useValidateHexcode(req.body.hexcolor);

        if (!validateHexcode) {
          return res
            .status(400)
            .send({ success: false, data: "Wrong format on hex color" });
        }

        const newCourrier: CourrierDocument = new Courrier();
        /* newCourrier.color = req.body.color;
        newCourrier.hexcolor = req.body.hexcolor;
        newCourrier.setSlug(req.body.color);
        
        Uppdatera med rätt uppgifter
 */
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
