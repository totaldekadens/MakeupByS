import dbConnect from "../../../../utils/dbConnect";
import ColorTag, { ColorTagDocument } from "../../../../models/ColorTag";
import { NextApiRequest, NextApiResponse } from "next";
import useValidateHexcode from "../../../../utils/useValidateHexcode";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const colorTagExist = await ColorTag.findOne({
          color: req.body.color,
        });
        if (colorTagExist) {
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

        const newColorTag: ColorTagDocument = new ColorTag();
        newColorTag.color = req.body.color;
        newColorTag.hexcolor = req.body.hexcolor;
        newColorTag.setSlug(req.body.color);

        const colorTag = await ColorTag.create(newColorTag);
        res.status(201).json({ success: true, data: colorTag });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
