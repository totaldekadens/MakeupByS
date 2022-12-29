import dbConnect from "../../../../utils/dbConnect";
import MainProduct, {
  MainProductDocument,
} from "../../../../models/MainProduct";
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
        const mainProductExist = await MainProduct.findOne({
          partNo: req.body.partNo,
        });

        if (mainProductExist) {
          return res.status(403).send({
            success: false,
            data: "A main product with this part number already exists",
          });
        }

        const newMainProduct: MainProductDocument = new MainProduct();
        newMainProduct.description1 = req.body.description1;
        newMainProduct.description2 = req.body.description2;
        newMainProduct.partNo = req.body.partNo;
        newMainProduct.brand = req.body.brand;
        newMainProduct.price = req.body.price;
        newMainProduct.category = req.body.category;
        newMainProduct.ingredients = req.body.ingredients;
        newMainProduct.weight = req.body.weight;

        const mainProduct = await MainProduct.create(newMainProduct);
        res.status(201).json({ success: true, data: mainProduct });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
