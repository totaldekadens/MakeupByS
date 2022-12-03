import dbConnect from "../../../utils/dbConnect";
import ColorTag from "../../../models/ColorTag";
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

  switch (method) {
    case "GET" /* Get a colorTag by its slug */:
      try {
        const colorTag = await ColorTag.findOne({ slug });

        if (!colorTag) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: colorTag });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a colorTag by its slug */:
      try {
        const updateColorTag = new ColorTag();
        updateColorTag._id = req.body._id;
        updateColorTag.color = req.body.color;
        updateColorTag.hexcode = req.body.hexcode;
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
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: colorTag });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a colorTag by its slug */:
      try {
        const deletedColorTag = await ColorTag.deleteOne({ slug });
        if (!deletedColorTag) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
