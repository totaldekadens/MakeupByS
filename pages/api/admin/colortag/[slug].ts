import dbConnect from "../../../../utils/dbConnect";
import ColorTag, { ColorTagDocument } from "../../../../models/ColorTag";
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

  switch (method) {
    case "PUT":
      try {
        // Fix validation for already existing category except the one you update

        const updateColorTag: ColorTagDocument = new ColorTag();
        updateColorTag._id = req.body._id;
        updateColorTag.color = req.body.color;
        updateColorTag.hexcolor = req.body.hexcolor;
        updateColorTag.setSlug(req.body.color);

        const colorTag = await ColorTag.findOneAndUpdate(
          { slug },
          updateColorTag,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!colorTag) {
          return res
            .status(400)
            .json({ success: false, data: "Color tag not updated" });
        }
        res.status(200).json({ success: true, data: colorTag });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    case "DELETE":
      try {
        const deletedColorTag = await ColorTag.deleteOne({ slug });
        if (deletedColorTag.deletedCount < 1) {
          return res
            .status(400)
            .json({ success: false, data: "Color tag not deleted" });
        }
        res
          .status(200)
          .json({ success: true, data: "Color tag successfully deleted" });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
