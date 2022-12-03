import dbConnect from "../../../utils/dbConnect";
import ColorTag from "../../../models/ColorTag";
import { NextApiRequest, NextApiResponse } from "next";
import useValidateHexcode from "../../../utils/useValidateHexcode";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const categories = await ColorTag.find({});
        res.status(200).json({ success: true, data: categories });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const colorTagExist = await ColorTag.findOne({
          color: req.body.color,
        });
        if (colorTagExist) {
          return res
            .status(403)
            .send({ success: false, data: "Färgtagen existerar redan" });
        }
        const validateHexcode = useValidateHexcode(req.body.hexcode);

        if (!validateHexcode) {
          return res
            .status(400)
            .send({ success: false, data: "Fel format på hexkod" });
        }

        const newColorTag = new ColorTag();
        newColorTag.color = req.body.color;
        newColorTag.hexcode = req.body.hexcode;
        newColorTag.setSlug(req.body.color);

        const colorTag = await ColorTag.create(newColorTag);
        res.status(201).json({ success: true, data: colorTag });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
