import dbConnect from "../../../../../utils/dbConnect";
import SubProduct, {
  SubProductDocument,
} from "../../../../../models/SubProduct";
import { NextApiRequest, NextApiResponse } from "next";
import MainProduct from "../../../../../models/MainProduct";
import Category from "../../../../../models/Category";
import Color, { ColorDocument } from "../../../../../models/Color";
import Season, { SeasonDocument } from "../../../../../models/Season";

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
    case "GET":
      try {
        const getSeasonSlug = await Season.findOne({ slug });

        if (!getSeasonSlug) {
          return res
            .status(400)
            .json({ success: false, data: "URL existerar inte" });
        }

        const subProducts = await SubProduct.find({})
          .populate({
            path: "mainProduct",
            model: MainProduct,
            populate: {
              path: "category",
              model: Category,
            },
          })
          .populate({
            path: "colors",
            model: Color,
            populate: {
              path: "seasons",
              model: Season,
              //match: { slug: { $in: slug } },  // Check why this doesnt work!
            },
          });

        /* 

arrayOfElements.map((element) => {
  return {
    ...element,
    subElements: element.subElements.filter(
      (subElement) => subElement.surname === 1
    ),
  };
}); 

*/

        // Find a better way. Should be able to filter the query above
        let list: any = [];
        subProducts.forEach((product) => {
          product.colors.forEach((color: ColorDocument) => {
            color.seasons.forEach((season: any) => {
              if (season.slug == slug) {
                list.push(product);
              }
            });
          });
        });

        res.status(200).json({ success: true, data: list });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
