import dbConnect from "../../../../utils/dbConnect";
import Color from "../../../../models/Color";
import { NextApiRequest, NextApiResponse } from "next";
import useValidateHexcode from "../../../../utils/useValidateHexcode";

// Funkar ej. Pågående arbete :P

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const colorExist = await Color.findOne({
          hexcolor: req.body.hexcolor,
        });

        if (colorExist) {
          return res
            .status(403)
            .send({ success: false, data: "Färgen existerar redan" });
        }

        const validateHexcode = useValidateHexcode(req.body.hexcolor);

        if (!validateHexcode) {
          return res
            .status(400)
            .send({ success: false, data: "Fel format på hexkod" });
        }
        const newColor = new Color();
        newColor.hexcolor = req.body.hexcolor;
        newColor.colorTag = req.body.colorTag;
        newColor.seasons = req.body.seasons;

        console.log(newColor);
        const color = await Color.create(newColor);
        res.status(201).json({ success: true, data: color });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
