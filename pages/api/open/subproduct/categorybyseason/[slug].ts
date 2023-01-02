import dbConnect from "../../../../../utils/dbConnect";
import SubProduct from "../../../../../models/SubProduct";
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
    query: { slug, seasonSlug },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const getCategorySlug = await Category.findOne({ slug });
        const getSeasonSlug = await Season.findOne({ slug: seasonSlug });

        if (!getCategorySlug || !getSeasonSlug) {
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
            },
          });

        // Todo if time: #67 Find a better way. Should be able to filter the query above. Check aggregation and virtuals with match
        let list: any = [];
        let list2: any = [];
        subProducts.forEach((product) => {
          product.colors.forEach((color: any) => {
            color.seasons.forEach((season: SeasonDocument) => {
              if (season.slug == seasonSlug) {
                list.push(product);
              }
            });
          });
        });

        subProducts.forEach((product) => {
          if (product.mainProduct.category.slug == slug) {
            list2.push(product);
          }
        });

        const newList = list.filter((el: any) => list2.includes(el));

        res.status(200).json({ success: true, data: newList });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
