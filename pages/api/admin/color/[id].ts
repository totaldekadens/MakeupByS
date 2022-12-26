import dbConnect from "../../../../utils/dbConnect";
import Color from "../../../../models/Color";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        // Fix validation for already existing category except the one you update

        const updateColor = new Color();
        updateColor._id = req.body._id;
        updateColor.color = req.body.color;
        updateColor.hexcolor = req.body.hexcolor;
        updateColor.setSlug(req.body.color);

        const color = await Color.findOneAndUpdate({ id }, updateColor, {
          new: true,
          runValidators: true,
        });
        if (!color) {
          return res
            .status(400)
            .json({ success: false, data: "Color not found" });
        }
        res.status(200).json({ success: true, data: color });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    case "DELETE":
      try {
        const deletedColor = await Color.deleteOne({ _id: id });
        if (!deletedColor) {
          return res
            .status(400)
            .json({ success: false, data: "Color not deleted" });
        }
        res
          .status(200)
          .json({ success: true, data: "Color is successfully deleted" });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
