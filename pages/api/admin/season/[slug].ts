import dbConnect from "../../../../utils/dbConnect";
import Season from "../../../../models/Season";
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

  //console.log(req.body);
  switch (method) {
    case "PUT" /* Edit a season by its slug */:
      try {
        // Fix validation for already existing season except the one you update

        const updateSeason = new Season();
        updateSeason._id = req.body._id;
        updateSeason.title = req.body.title;
        updateSeason.description = req.body.description;
        updateSeason.setSlug(req.body.title);

        const season = await Season.findOneAndUpdate({ slug }, updateSeason, {
          new: true,
          runValidators: true,
        });
        if (!season) {
          return res
            .status(400)
            .json({ success: false, data: "Season not updated" });
        }
        res.status(200).json({ success: true, data: season });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    case "DELETE" /* Delete a season by its slug */:
      try {
        const deletedSeason = await Season.deleteOne({ slug });
        if (!deletedSeason) {
          return res
            .status(400)
            .json({ success: false, data: "Season not deleted" });
        }
        res
          .status(200)
          .json({ success: true, data: "Season successfully deleted" });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
