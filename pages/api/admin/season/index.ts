import dbConnect from "../../../../utils/dbConnect";
import Season from "../../../../models/Season";
import { NextApiRequest, NextApiResponse } from "next";

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
        const seasonExist = await Season.findOne({
          title: req.body.title,
        });
        if (seasonExist) {
          return res
            .status(403)
            .send({ success: false, data: "Season already exist" });
        }

        const newSeason = new Season();
        newSeason.title = req.body.title;
        newSeason.description = req.body.description;
        newSeason.setSlug(req.body.title);

        const season = await Season.create(newSeason);
        res.status(201).json({ success: true, data: season });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
