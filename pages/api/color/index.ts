import dbConnect from "../../../utils/dbConnect";
import Color from "../../../models/Color";
import { NextApiRequest, NextApiResponse } from "next";
import useValidateHexcode from "../../../utils/useValidateHexcode";

// Funkar ej. Pågående arbete :P

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const categories = await Color.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: categories });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
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

        const validateHexcode = useValidateHexcode(req.body.hexcode);

        if (!validateHexcode) {
          return res
            .status(400)
            .send({ success: false, data: "Fel format på hexkod" });
        }
        console.log(req.body);
        const newColor = new Color();
        newColor.hexcode = req.body.hexcode;
        newColor.colortag = req.body.colortag;
        newColor.seasons = req.body.seasons;

        const color = await Color.create(
          newColor
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: color });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
