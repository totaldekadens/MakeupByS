import dbConnect from "../../../../utils/dbConnect";
import SingleProduct, {
  SingleProductDocument,
} from "../../../../models/SingleProduct";
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
        const singleProductExist = await SingleProduct.findOne({
          title: req.body.title,
        });

        if (singleProductExist) {
          return res.status(403).send({
            success: false,
            data: "A singleProduct with this title already exists",
          });
        }

        const newSingleProduct: SingleProductDocument = new SingleProduct();
        newSingleProduct.title = req.body.title;
        newSingleProduct.description1 = req.body.description1;
        newSingleProduct.description2 = req.body.description2;
        newSingleProduct.setSlug(req.body.title);
        newSingleProduct.partNo = req.body.partNo;
        newSingleProduct.brand = req.body.brand;
        newSingleProduct.price = req.body.price;
        newSingleProduct.images = req.body.images;
        newSingleProduct.colors = req.body.colors;
        newSingleProduct.category = req.body.category;
        newSingleProduct.ingredients = req.body.ingredients;
        newSingleProduct.availableQty = req.body.availableQty;
        newSingleProduct.weight = req.body.weight;

        const singleProduct = await SingleProduct.create(newSingleProduct);
        res.status(201).json({ success: true, data: singleProduct });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
